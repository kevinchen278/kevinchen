'use strict';

var myApp = angular.module('kevinApp',[
	    'ngRoute',
	    'ui.bootstrap'
	   ])
	  .constant('myConfig', {
	  		"faceImageUrl": './images/licong.jpg',
	  		"bgImageUrl": './images/bg-hero.png',
	  		"headerLogoUrl": './images/logo.svg',  // "headerLogoUrl": './images/kevinchen.png',
	  		"footerLogoUrl": './images/logo.svg',
		  	main: [{a: '/main', b: '/view/aboutmeView.html',c:'footerCtrl'},
		  		   {a: '/blog', b: '/view/blog.html',c:'blogCtrl'}

		  	]
	  })

	  .value('myValue', {
	  })

	.config(function($routeProvider,$locationProvider,myConfig) {

		for (var i=0; i<2; i++)
		{			
			$routeProvider.when(myConfig.main[i].a,{
				templateUrl: myConfig.main[i].b,
		    	controller: myConfig.main[i].c
				});
		}

		$routeProvider.otherwise({
			redirectTo: '/main'
		});


		// $routeProvider.when(myConfig.main[0].a,{
		// 	templateUrl: myConfig.main[0].b,
		//     controller: myConfig.main[0].c
		// 	})
		// .when('/blog',{
		// 	templateUrl: './view/blog.html',
		// 	controller: 'blogCtrl'

		// })
		// .when('/resume', {
		// 	templateUrl: './view/resume.html',
		// 	controller:'resumeCtrl'
		// })
		// .otherwise({
		// 	redirectTo: '/main'

		// });

		// $locationProvider.html5Mode(true).hashPrefix('!');	

	})

  .run(function($rootScope, $location, $anchorScroll, $routeParams, myConfig){
  	$rootScope.myConfig = myConfig;

  	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute){
  		$location.hash($routeParams.scrollTo);
  		$anchorScroll();
  	});
  })







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
angular.module('DocsController', [])

.controller('DocsController', [
          '$scope', '$rootScope', '$location', '$window', '$cookies', 'openPlunkr',
              'NG_PAGES', 'NG_NAVIGATION', 'NG_VERSION',
  function($scope, $rootScope, $location, $window, $cookies, openPlunkr,
              NG_PAGES, NG_NAVIGATION, NG_VERSION) {

  $scope.openPlunkr = openPlunkr;

  $scope.docsVersion = NG_VERSION.isSnapshot ? 'snapshot' : NG_VERSION.version;

  $scope.navClass = function(navItem) {
    return {
      active: navItem.href && this.currentPage && this.currentPage.path,
      current: this.currentPage && this.currentPage.path === navItem.href,
      'nav-index-section': navItem.type === 'section'
    };
  };



  $scope.$on('$includeContentLoaded', function() {
    var pagePath = $scope.currentPage ? $scope.currentPage.path : $location.path();
    $window._gaq.push(['_trackPageview', pagePath]);
  });

  $scope.$watch(function docsPathWatch() {return $location.path(); }, function docsPathWatchAction(path) {

    path = path.replace(/^\/?(.+?)(\/index)?\/?$/, '$1');

    currentPage = $scope.currentPage = NG_PAGES[path];

    if ( currentPage ) {
      $scope.partialPath = 'partials/' + path + '.html';
      $scope.currentArea = NG_NAVIGATION[currentPage.area];
      var pathParts = currentPage.path.split('/');
      var breadcrumb = $scope.breadcrumb = [];
      var breadcrumbPath = '';
      angular.forEach(pathParts, function(part) {
        breadcrumbPath += part;
        breadcrumb.push({ name: (NG_PAGES[breadcrumbPath]&&NG_PAGES[breadcrumbPath].name) || part, url: breadcrumbPath });
        breadcrumbPath += '/';
      });
    } else {
      $scope.currentArea = NG_NAVIGATION['api'];
      $scope.breadcrumb = [];
      $scope.partialPath = 'Error404.html';
    }
  });

  /**********************************
   Initialize
   ***********************************/

  $scope.versionNumber = angular.version.full;
  $scope.version = angular.version.full + "  " + angular.version.codeName;
  $scope.loading = 0;


  var INDEX_PATH = /^(\/|\/index[^\.]*.html)$/;
  if (!$location.path() || INDEX_PATH.test($location.path())) {
    $location.path('/api').replace();
  }

}]);
