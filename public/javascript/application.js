var newNote //global, i need this in addNoteToDB()

//Adds new note to page when add tab is clicked
function addNote(id,content,x,y,width,height) {  //addNote to the view
  // setting default values

  if(typeof(content)==='undefined') content = "lorem ipsum";
  if(typeof(x)==='undefined') x = "150px"; 
  if(typeof(y)==='undefined') y = "50px";
  if(typeof(width)==='undefined') width = "220px";  
  if(typeof(height)==='undefined') height = "120px";


  // var newNote = $('<div class="resize draggable post" style="width: 200px; height: 200px;"></div>');
  // var newNote = $('<div class="resize draggable drag-drop" style="width: 300px; height: 300px; margin-left: 310px;"><textarea rows="8" cols="50"></textarea></div>');
  // newNote.appendTo('.resize-container');

  // var $newNote = $('<div contenteditable class="draggable resize post fa fa-times" >' + content + '</div>');
  newNote = $('<textarea class="draggable resize post" >' + content + '</textarea>');
  newNote[0].setAttribute('postId', id);

  newNote.css({
    // 'background-image': 'linear-gradient( #FDF98C, #fdee72)',
    // 'background-image': 'url("../../images/add.png")',
    'background': 'linear-gradient( #FDF98C, #fdee72)',
    'width': width,
    'overflow': 'auto',
    'height': height,
    'left': x,
    'top': y
  });

  newNote.appendTo('.resize-container');
  $('.post').elastic();
}

function addNoteToDB(content,x,y,width,height) {  //addNote to the view
    var postData = {
      content: newNote.text(),
      x: newNote.offset()["left"] + "px",
      y: newNote.offset()["top"] + "px",
      width: newNote.css("width"),
      height: newNote.css("height")
    };

    $.ajax({
      url: window.location.pathname + "/post/create",
      type: 'POST',
      data: postData,
      success: function(id) {
        newNote[0].setAttribute('postId', id);

      }
    }); 
}

 /* BLIND STICKER RE-GENERATION */

function addSticker(){
  $(this).clone().prependTo($(this));
  // var $newSticker = $('<img src="../../images/all-the-things.png">');
  // $newSticker.appendTo($(this));
};

// function addSticker(){
//   var $newSticker = $('<img src="../../images/all-the-things.png">');
//   $newSticker.appendTo($(this).parent());
// };



function bindPostListeners() {
  $(".post").on('blur', function(e) {
    var postData = {
      id: $(this).attr("postid"),
      content: $(this).val(), //assuming $(this) refers to a textarea
      x: $(this).offset()["left"] + "px", //$(this).css("left") doesnt work, css is too raw, not updated
      y: $(this).offset()["top"] + "px",
      width: $(this).css("width"),
      height: $(this).css("height")
    };
// debugger;
    $.ajax({
      url: window.location.pathname + "/post/update",
      type: 'POST',
      data: postData
    });
  });
} //end function



  /* Post It Moveability */
function postLoadAll(){
$.ajax({
  type: "GET",
    url: window.location.pathname + "/post/get-all"  
  })
    .done(function( msg ) {
      obj = JSON.parse(msg);
      console.log('done loading posts');

      for (var i = 0; i < obj.length; i++) {
        // console.log(obj[i]);
        addNote(obj[i]["id"],obj[i]["content"],obj[i]["x"],obj[i]["y"],obj[i]["width"],obj[i]["height"]);
      }

      bindPostListeners();
    });
}


$(document).ready(function() {

    interact('.resize')

    .resizable(true)
    .on('resizemove', function (event) {
      var target = event.target;

      // add the change in coords to the previous width of the target element
      var
        newWidth  = parseFloat(target.style.width ) + event.dx,
        newHeight = parseFloat(target.style.height) + event.dy;

      // update the element's style
      target.style.width  = newWidth + 'px';
      target.style.height = newHeight + 'px';

      //getting new width/height to sent in Ajax post
      postWidth = newWidth + 'px';
      postHight = newHeight + 'px';

      // target.textContent = newWidth + '×' + newHeight;
    });

    // target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // allow dragging of multple elements at the same time
        max: Infinity,

        // call this function on every dragmove event
        onmove: function (event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

            //getting new x, y position to sent in Ajax post
        },
        // call this function on every dragend event
        onend: function (event) {
            var textEl = event.target.querySelector('p');
            
            textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(event.dx * event.dx +
                             event.dy * event.dy)|0) + 'px');
        }
    })
    // enable inertial throwing
    .inertia(true)
    // keep the element within the area of it's parent
    .restrict({
        drag: ".dropzone",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 0, right: 1 }
    });

    // allow more than one interaction at a time
    interact.maxInteractions(Infinity);

    

  /*  Navigation  */
  $('#settings').click(function(){
    $('#subMenu').toggle();
    $('.sub-menu-content').hide();
    // $(this).toggleClass('.subMenu');
  });

  $('#submenu li').click(function(){
    var target = $(this).attr('data-target');
    $('#subMenu').toggle();
    $('#'+target).show();
  });

  $('.back').click(function(){
    $('#subMenu').show();
    $(this).closest('.sub-menu').hide();
  });



  // Load all posts from db, stickers not supported
  postLoadAll();




}); // end document.ready


