// Setting some defaults for posts
var postX;
var postY;
var postHeight;
var postWidth;

//Adds new note to page when add tab is clicked
function addNote(){
  // var $newNote = $('<div class="resize draggable post" style="width: 200px; height: 200px;"></div>');
  // var $newNote = $('<div class="resize draggable drag-drop" style="width: 300px; height: 300px; margin-left: 310px;"><textarea rows="8" cols="50"></textarea></div>');
  // $newNote.appendTo('.resize-container');

  var $newNote = $('<textarea style="background-image: linear-gradient( #FDF98C, #fdee72); padding: 20px": width: 220px; height: 120px; id="resize" class="draggable resize post"></textarea>');
  $newNote.appendTo('.resize-container');
};

/* BLIND STICKER RE-GENERATION *

function addSticker(){
  var $newSticker = $('<img src="../../images/all-the-things.png">');
  $newSticker.appendTo($(this).parent());
}

  /* Post It Moveability */

$(document).ready(function() {
    interact('.resize')
    // interact('.resize')
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
      postWidth = target.style.width  = newWidth + 'px';
      postHight = target.style.height = newHeight + 'px';

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
            postX = target.setAttribute('data-x', x);
            postY = target.setAttribute('data-y', y);
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
    // .restrict({
    //     drag: "parent",
    //     endOnly: true,
    //     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    // });

    // allow more than one interaction at a time
    interact.maxInteractions(Infinity);

    

  /*  Navigation  */

  $(function() {

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

  });


/*     PASS POST IT OBJECT VIA AJAX IN JASON      */


  $(".post").on('blur', function() {
      var post = {
        content: $(this).text(),
        x: postX,
        y: postY,
        width: postHeight,
        height: postWidth
      }

      $.post('/post/'+id+'/update', {body: post}, function(data) {
        if (data.result) {
          post.css('z-index', 10);
        }
      }, 'json');

    });

    $.ajax({
      url: '/user/create',
      type: 'post',
      dataType: 'json',
      success: function (data) {
        $('#target').html(data.msg);
      },
      data: {
        content: "",
        x: postX,
        y: postY,
        width: postHeight,
        height: postWidth
      }

    });

});


