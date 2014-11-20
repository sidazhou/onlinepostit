//Adds new note to page when add tab is clicked
function addNote(){
  var $newNote = $('<div class="resize draggable" style="width: 200px; height: 200px;"></div>');
  $newNote.appendTo('.resize-container');
};

  /* Post It Moveability */

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

      target.textContent = newWidth + '×' + newHeight;
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
        $('.subMenu').slideToggle();
        $('.sub-menu-content').hide();
        // $(this).toggleClass('.subMenu');
      });

      $('#submenu li').click(function(){
        var target = $(this).attr('data-target');
        console.log('showing menu content: '+target);
        $('.subMenu').toggle();
        $('#'+target).show();
      });

  });


});

      // $('#option-stickers').click(function(){
      //   $('.subMenu').remove();
      //   $('.menuSticker').slideToggle();
      // });

  // $(function() {
  //     $('.option-stickers').click(function(){
  //       $('.subMenu').remove();
  //       $(this).toggleClass('.menuSticker');
  //     });
  // });



