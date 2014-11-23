// Setting some defaults for posts
// var postX;
// var postY;
// var postHeight;
// var postWidth;


//Adds new note to page when add tab is clicked
function addNote(content,x,y,width,height){
  // setting default values
  if(typeof(content)==='undefined') content = "lorem ipsum";
  if(typeof(x)==='undefined') x = "50px";  //not used 
  if(typeof(y)==='undefined') y = "50px";  //not used

  if(typeof(width)==='undefined') width = "220px";  
  if(typeof(height)==='undefined') height = "120px";


  // var $newNote = $('<div class="resize draggable post" style="width: 200px; height: 200px;"></div>');
  // var $newNote = $('<div class="resize draggable drag-drop" style="width: 300px; height: 300px; margin-left: 310px;"><textarea rows="8" cols="50"></textarea></div>');
  // $newNote.appendTo('.resize-container');


// var $newNote = $('<div contenteditable class="draggable resize post fa fa-times" >' + content + '</div>');
  var $newNote = $('<textarea class="draggable resize post" >' + content + '</textarea>');
  $newNote.css({
    // 'background-image': 'linear-gradient( #FDF98C, #fdee72)',
    // 'background-image': 'url("../../images/add.png")',
    'background': 'linear-gradient( #FDF98C, #fdee72)',
    'width': width,
    'overflow': 'auto',
    'height': height,
    'margin-left': '310px',
    'padding': '20px',
    'left': x,
    'top': y
  });
  $newNote.appendTo('.resize-container');
  $('.post').elastic();
};

 /* BLIND STICKER RE-GENERATION */
/*
function addSticker(){
  var $newSticker = $('<img src="../../images/all-the-things.png">');
  $newSticker.appendTo($(this).parent());
}
*/


function bindPostListeners() {
  $(".post").on('blur', function(e) {
    var postData = {
      content: $(this).text(),
      x: $(this).attr("left") + "px",
      y: $(this).attr("top") + "px",
      width: $(this).css("width"),
      height: $(this).css("height")
    };


      console.log("UPDATE not implemented");
      // console.log(this);
      // console.log(data);

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
        addNote(obj[i]["content"],obj[i]["x"],obj[i]["y"],obj[i]["width"],obj[i]["height"]);
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
    $('.subMenu').toggle();
    $('.sub-menu-content').hide();
    // $(this).toggleClass('.subMenu');
  });

  $('#submenu li').click(function(){
    var target = $(this).attr('data-target');
    $('.subMenu').toggle();
    $('#'+target).show();
  });

  $('.back').click(function(){
    $('.subMenu').show();
    $(this).closest('.sub-menu').hide();
  });


<<<<<<< HEAD
  // $(".post").on('blur', function() {
  //     var post = {
  //       content: $(this).text(),
  //       x: postX,
  //       y: postY,
  //       width: postHeight,
  //       height: postWidth
  //     }

  //     $.post('/post/'+id+'/update', {body: post}, function(data) {
  //       if (data.result) {
  //         post.css('z-index', 10);
  //       }
  //     }, 'json');

  //   });

  //   $.ajax({
  //     url: '/user/create',
  //     type: 'post',
  //     dataType: 'json',
  //     success: function (data) {
  //       $('#target').html(data.msg);
  //     },
  //     data: {
  //       content: "",
  //       x: postX,
  //       y: postY,
  //       width: postHeight,
  //       height: postWidth
  //     }

  //   });
=======

  // Load all posts from db, stickers not supported
  postLoadAll();


>>>>>>> 4eda72977368b76daef5bac0b8b5820835bc92b4


}); // end document.ready


