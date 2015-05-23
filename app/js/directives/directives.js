'use strict';

kevinApp.directive('scrollTo', function ($location, $anchorScroll) {
    return function(scope, element, attrs) {
    element.bind('click', function(event) {
            event.stopPropagation();
            scope.$on('$locationChangeStart', function(ev) {
              ev.preventDefault();
            });
            var location = attrs.scrollTo;
            $location.hash(location);

            console.log(location);
            console.log(scrollTo);
            $anchorScroll();
        });
    };
  });

kevinApp.directive('resizer', function($document) {

    return function($scope, $element, $attrs) {

        $element.on('mousedown', function(event) {
            event.preventDefault();

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {

            if ($attrs.resizer == 'vertical') {
                // Handle vertical resizer
                var x = event.pageX;

                if ($attrs.resizerMax && x > $attrs.resizerMax) {
                    x = parseInt($attrs.resizerMax);
                }

                $element.css({
                    left: x + 'px'
                });

                $($attrs.resizerLeft).css({
                    width: x + 'px'
                });

                $($attrs.resizerRight).css({
                    left: (x + parseInt($attrs.resizerWidth)) + 'px'
                });

                $element.css({
                    left: x + 'px'
                });
            } else {
                // Handle horizontal resizer
                var y = window.innerHeight - event.pageY;

                $element.css({
                    bottom: y + 'px'
                });

                $($attrs.resizerTop).css({
                    bottom: (y+parseInt($attrs.resizerHeight)) + 'px'
                });
                $($attrs.resizerBottom).css({
                    height: y+'px'
                });

            }
        }

        function mouseup(){
            $document.unbind('mousemove',mousemove);
            $document.unbind('mouveup',mouseup);
        }

    };

});  
    
