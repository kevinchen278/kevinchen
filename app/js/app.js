'use strict';

var myApp = angular.module('kevinApp',['ngRoute'])
	  .constant('myConfig', {
	  		"faceImageUrl": './images/licong.jpg',
	  		"bgImageUrl": './images/bg-hero.png',
	  		"headerLogoUrl": './images/kevinchen.png',
	  		"footerLogoUrl": './images/logo.svg'
	  })

	.config(function($routeProvider,$locationProvider) {
		$routeProvider
		.when('/main',{
			templateUrl: './view/aboutmeView.html'
			// controller: 'aboutCtrl'
			})
		.when('/tech',{
			templateUrl: './view/tech.html'

		})
		.when('/resume', {
			templateUrl: './view/resume.html',
			controller:'resumeCtrl'
		})
		.otherwise({
			redirectTo: '/main'

		})
	})

  .run(function($rootScope,myConfig){
  	$rootScope.myConfig = myConfig;
  })




