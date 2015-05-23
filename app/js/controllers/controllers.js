'use strict';

kevinApp.controller('InfoCtrl', ['ResumeService','$scope', function(ResumeService,$scope){
	var q = ResumeService.getInfo()
			.success(function(data,status){
				$scope.data = data;
				console.log('success');
				console.log(data);
			})
			.error(function(data,status){
				console.log('error req.');
			})
}]);

kevinApp.controller('resumeCtrl', function(){
  		return {};
  	
  })
