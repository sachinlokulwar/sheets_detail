'use strict';

/**
 * @ngdoc function
 * @name csvRowsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the csvRowsApp
 */
angular.module('csvRowsApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.sheet = {
    	filenames:[]
    };

    var getCount = function(file){
    	var file1={fileDetail : {}};
        file1.fileDetail.name = file.name;
        
    	var reader = new FileReader();
	    reader.onload = function(e) {
	      	var data = e.target.result;
	      	var workbook = XLSX.read(data, {type: 'binary'});
	      	var result = null;
	      	var totalSheets = [];
	      	var XL_row_object = XLS.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
            file1.fileDetail.rowCount = XL_row_object.length;
            $scope.sheet.filenames.push(file1.fileDetail)
            $scope.$apply();
        	//console.log($scope.sheet.filenames);
	    };
	    reader.readAsBinaryString(file);
    };

    $scope.uploadFiles = function(element){

        var files = element.files;
        
        var i,j;
        for (i=0; i<files.length; i++){
        	getCount(files[i]);
        }
    };

    $scope.clearData = function(){
    	$scope.sheet.filenames = [];
    	document.getElementById("uploadFiles").value = "";

    }
    $scope.test = function(){
        console.log($scope.sheet.filenames);
    };

  }]);
