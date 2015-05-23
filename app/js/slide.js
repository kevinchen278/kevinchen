(function(){
    
    'use strick';
    
    var Slide = {
        myLoop: {},
        settings: {
                duration: 2000,
                aniTime : 1000,
                curSlideIndex  : 0, 
                slideCount : 0
            },  

        init: function(selector,customSettings) {
            self = this;
            for (var i=0; i<customSettings.imgUrls.length; i++){
                selector.append('<img src='+ customSettings.imgUrls[i]+ ">");
            }

            this.settings.slideCount = customSettings.imgUrls.length;
            $.extend(this.settings,customSettings);
            
            
            selector.on('mouseenter',function(){
                self.pause(self.myLoop);
            });
            
            selector.on('mouseleave',function(){
                self.myLoop = self.loop(this);
            });
            
            selector.css({
                'position' : 'relative',
                'border'   : '1px solid silver',
                'width'    : this.settings.width,
                'height'   : this.settings.height,
                'overflow' : 'hidden'
            }).children('img').each(function(imgNo) {
                var $curImg = $(this);
                $curImg.css({
                    'position': 'absolute',
                    'top'     : '0px',
                    'left'    : '0px',
                    'width'   : '100%',
                    'height'  : '100%',
                    'z-index' :  '98'
                });

                if (imgNo === 0) {
                    $curImg.css('z-index','99');
                } else if (imgNo > 1) {
                    $curImg.hide();
                }
            });
        },
            
        loop: function(selector){
            var self = this;
            self.myLoop = setInterval(function(){
                var $curImg = $(selector).children('img').eq(self.settings.curSlideIndex),
                    nextSlideIndex = (self.settings.curSlideIndex + 1) % self.settings.slideCount;
                                    
                $curImg.fadeOut(self.settings.aniTime, function(){
                    $curImg.css('z-index', '98');
                    $(selector).children('img').eq(nextSlideIndex).css('z-index', '99');
                    $(selector).children('img').eq((nextSlideIndex = nextSlideIndex + 1) % self.settings.slideCount).show();
                    self.settings.curSlideIndex = (self.settings.curSlideIndex + 1) % self.settings.slideCount;
                });
            }, self.settings.duration);
        },
        
        pause: function(){
            clearInterval(this.myLoop);
        }      
        
    };  //end of Slide object
    
    $.fn.slide = function(customSettings){         // extend a jQuery method, slide.
        Slide.init(this,customSettings);
        Slide.loop(this);        
    }        
    
}(jQuery));