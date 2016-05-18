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
		  	main: [{a: '/main', b: 'view/aboutmeView.html',c:'footerCtrl'},
		  		   {a: '/blog', b: 'view/blog.html',c:'blogCtrl'}

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






