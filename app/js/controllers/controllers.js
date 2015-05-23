'use strict';

kevinApp.controller('InfoCtrl', ['ResumeService','$scope', function(ResumeService,$scope){
	      ResumeService.getInfo()
			.then(function(response){
				$scope.data = response.data;
			})
}]);

kevinApp.controller('resumeCtrl', function(){
  		return {};
  	
})
