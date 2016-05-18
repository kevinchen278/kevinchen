'use strict';

var myApp = angular.module("myApp",['ngGrid']);

myApp.service('WorkRecordService', ['$http', function($http){

	var getDays = function(qDate){
		year = qDate.getFullYear();
		month = qDate.getMonth();
		var days = 0;
		switch (month) {
			case 1: case 3: case 5: case 7: case 8: case 10: case 12:
				days = 31;
				break;
			case 4: case 6: case 9: case 11:
				days = 30;
				break
			case 2:
			    if ((year % 400)===0||((year % 100 != 0) && (year % 4 ===0))) 
			    	days = 29;
			    else
			    	days =28;

			    break;
			default:
			    days=0;
		}

		return days;
	};

	var diffTwoDate=function(bgDate,endDate){
		var months, days, preMonth;
		if (bgDate > endDate){
			var tmp = bgDate; bgDate=endDate; endDate=tmp;
		}

		months = (endDate.getFullYear()-bgDate.getFullYear())*12 + endDate.getMonth() - bgDate.getMonth();
		days = endDate.getDate() - bgDate.getDate();

		preMonth = endDate;
		preMonth = preMonth.setMonth(preMonth.getMonth()-1);

		if (days < 0) {
			days = endDate.getDate() + getDays(preMonth) - bgDate.getDate();
			months--;
		}

		months = months + days/getDays(endDate);

		return months;
	};

	var calculateTechMonths=function(){
		var i,j,k;
		for (i=0; i<WorkRecordService.WorkRecords.count; i++){
			var tmpTechs = WorkRecordService.WorkRecords[i].Techs,
				months = diffTwoDate(WorkRecordService.WorkRecords[i].bgDate,WorkRecordService.WorkRecords[i].endDate);

			tmpTechs = tmpTechs.split(',');
			for (j=0; j<tmpTechs.count; j++){
				var tmpTech=tmpTechs[i], found=false;
				for (k=0; k<WorkRecordService.Techs.count; k++){
					if (tmpTech === WorkRecordService.Techs[k].name) {
						WorkRecordService.Techs[k].months = WorkRecordService.Techs[k].months + months; 
						found = true;
					}
				}

				if (!found){
					WorkRecordService.Techs[WorkRecordService.Techs.count].name = tmpTech;
					WorkRecordService.Techs[WorkRecordService.Techs.count].months = months;
				}

			}
		}

	};


	var WorkRecordService = {WorkRecords: [], Techs :[]};

	WorkRecordService.addWorkRecord = function(rec){
		WorkRecordService.workRecord.push(rec);
	};

	WorkRecordService.deleteWorkRecord = function(key){
			var i;
			for (i=0; i< WorkRecordService.workRecord.count; i++) {
				if (WorkRecordService.workRecord[i].key === key) {
					delete WorkRecordService.workRecord[i];
				}
			}
	};

	WorkRecordService.getWorkRecords = function(){
			return WorkRecordService.workRecord;
	};

	WorkRecordService.getTechs = function(){
		calculateTechMonths();
		return (WorkRecordService.Techs);
	};

	WorkRecordService.loadWorkRecords = function(){
		return $http({
			method: 'get',
			url:'workRecord.json'
		})
		.success(function(data,status,headers, config){
			var i;
			for (i=0; i<data.length; i++){
				data[i].beginDate = new Date(data[i].beginDate);
				data[i].endDate = new Date(data[i].endDate);
			}
			return data;


		})
		.error(function(data,status,headers,config){

		});
	};


	return WorkRecordService;
	
}]);

myApp.controller('myCtrl', ['$scope','WorkRecordService', function($scope,WorkRecordService){
	$scope.count = 0;

	var curDate = new Date();

	console.log(curDate);

	$scope.info = [{id: 1, beginDate: curDate, endDate: curDate, techs:'javascript,angularJS,css,html'},
	               {id: 2, beginDate: curDate, endDate: curDate, techs:'javascript,html'},
	               {id: 3, beginDate: curDate, endDate: curDate, techs:'html,css'}];


	$scope.loadRecords = function(){
		WorkRecordService.loadWorkRecords()
		.then(function(response){
			$scope.info = response.data;
		});
	}
	
}])

myApp.controller('MyCtrl', function($scope) {
  $scope.gridOptions = {
        data: 'myData',
        enablePinning: true,
        enableCellEdit: true,
        enableRowSelection: false,
        enablePaging: true,
        columnDefs: [{ field: "name", width: 120, pinned: true },
                    { field: "age", width: 120 },
                    { field: "birthday", width: 120 },
                    { field: "salary", width: 120 }]
    };
    $scope.myData = [{ name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000" },
                    { name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000" },
                    { name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "50,000" },
                    { name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "40,000" },
                    { name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000" },
                    { name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000" },
                    { name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000" },
                    { name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "40,000" },
                    { name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "50,000" },
                    { name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000" },
                    { name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000" },
                    { name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000" },
                    { name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "40,000" },
                    { name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "50,000" },
                    { name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000" }];
});


myApp.directive('addRec',['$compile',function($compile){
	return function(scope,element,attrs){
		element.bind('click',function(){
			var count = scope.count++, curDate = new Date();
			scope.info[count] = {id: count+1, beginDate: curDate, endDate: curDate, techs:'javascript,angularJS,css,html'};

			angular.element(document.getElementById('space-for-work-rec')).append($compile('<p id="p'+count+'"><span>{{info['+count+'].id}}: </span><label>From <input type="date" ng-model="info['+count+'].beginDate" min="1/1/1930" max="Date()" ng-required="true">'+ 
	 	       'To <input type="date" ng-model="info['+count+'].endDate" min="1/1/1930" max="Date()" ng-required="true">'+
	 			'Techs:<input type="text" ng-model="info['+count+'].techs" ng-required="true"></label>'+'<button delete-rec tag='+count+'>delete</button></p>')(scope));
		});

	}

}]);


myApp.directive('deleteRec',function(){
	return function(scope,element,attrs){
		element.bind('click',function(){
			angular.element(document.getElementById('p'+attrs.tag)).remove();
			window.alert(attrs.tag);
		});
	}
})



myApp.directive('workRec', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		template: '{{rec.id}}: <label>From <input type="date" ng-model="rec.beginDate" min="1/1/1930" max="Date()" ng-required="true">'+ 
	 	       'To <input type="date" ng-model="rec.endDate" min="1/1/1930" max="Date()" ng-required="true">'+
	 			'Techs:<input type="text" ng-model="rec.techs" ng-required="true"></label>'+
	 			'<button>delete</button>',
	 	scope: {
	 		rec: '='
	 	}
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		// link: function($scope) {
		// 	var curDate= new Date();
		// 	$scope.rec ={id:3, beginDate: curDate, endDate: curDate, techs: 'html,css'};
		// 	console.log($scope.rec);
			
		// }
	};
}]);


