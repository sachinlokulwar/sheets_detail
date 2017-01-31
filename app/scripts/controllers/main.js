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
    function dictToList(dict){
    	//console.log(dict)
        var list = [];
        var key;
        angular.forEach(dict, function(value) {
            for(key in value){
                if(list.indexOf(key) == -1){
                    list.push(key)
                }
                if(list.indexOf(value[key]) == -1){
                    list.push(value[key])
                } 
            }
        });
        //list = validateList(list)
        return list
        
    }
    $scope.uploadFiles = function(element){

        var files = element.files;
        
        var i,j;
        for (i=0; i<files.length; i++){
        	var file={fileDetail : {}};
            file.fileDetail.name = files[i].name;
            file.fileDetail.size = files[i].size;
            file.fileDetail.sheets = []
            //console.log(files[i]);
            var reader = new FileReader();
		    
		    reader.onload = function(e) {
		    	//fileDetail.name = e.name;
            	console.log(e,files[i]);
		      	var data = e.target.result;
		      	//console.log(data)
		      	var workbook = XLSX.read(data, {type: 'binary'});
		      	//console.log(fileDetail)
		      	var result = null;
		      	var totalSheets = [];
		      	
	            workbook.SheetNames.forEach(function(sheetName){
	                // Here is your object
	                var sheetDetails ={};
	                var XL_row_object = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
	                //console.log(sheetName,XL_row_object.length);
	                sheetDetails.sheetName = sheetName;
	                sheetDetails.rowCount = XL_row_object.length;
	                totalSheets.push(sheetDetails)
	            });
	            console.log(totalSheets)
	            file.fileDetail.sheets = totalSheets;
	            console.log(file.fileDetail);
	            $scope.sheet.filenames.push(file.fileDetail)
	            $scope.$apply();
		    };
		    reader.readAsBinaryString(files[i]);
		    //console.log(filenames);
        }
        $scope.files = files;
    };


    $scope.test = function(){
        console.log($scope.sheet.filenames);
    }
  }]);
