'use strict';
var kevinApp = angular.module('kevinApp');

kevinApp.service('ResumeService', ['$http', function($http){
	var ResumeService = {};
	ResumeService.getInfo = function(){
		return $http({
				method: 'get',
				url:'./json/kevin.json'
			});
	}

	return ResumeService;

}]);

