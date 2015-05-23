'use strict';
var kevinApp = angular.module('kevinApp');

kevinApp.service('ResumeService', ['$http', function($http){
	 var ResumeService = {};
	 ResumeService.getInfo = function(){
		return $http({
				method: 'get',
				url:'./json/kevin.json'
			})
		    .success(function(data,status,headers,config){
		    	return data;
		      })
		    .error(function(data, status, headers, config){
		    	console.log('error on req.');
		    })

	 };

	 return ResumeService;

}]);

