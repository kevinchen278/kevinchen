'use strict';

kevinApp.controller('InfoCtrl', ['ResumeService','$scope', function(ResumeService,$scope){
	      ResumeService.getInfo()
			.then(function(response){
				$scope.data = response.data;
			})
}]);

kevinApp.controller('resumeCtrl', function(){
  		
  	
});

kevinApp.controller('footerCtrl', ['$scope', '$rootScope', '$routeParams', function($scope,$rootScope, $routeParams){
	// var slug = $routeParams.id;
	// $scope.$emit('routeLoaded',{slug:slug});

}]);

kevinApp.controller('blogCtrl', function ($scope) {
  $scope.oneAtATime = false;
  $scope.isCollapsed = false;

});


