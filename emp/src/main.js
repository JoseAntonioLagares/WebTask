//public/main.js

//Variable Global para usarla en HTML
var angularEmpleado = angular.module('angularEmpleado', []);

//Definicion del controlador
function mainController($scope, $http) {
	//Objeto scope: para usarlos en la vista html
	$scope.formData = {};	
	$http.get('/api/empleados')
		.success(function(data) {
			$scope.empleados = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// Codigo para add un nuevo nuevo Empleado
	$scope.createEmpleado = function(){
		$http.post('/api/empleados', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.empleados = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};

	//Borra un Empleado a través de scope
	$scope.deleteEmpleado = function(id) {
		$http.delete('/api/empleados/' + id)
			.success(function(data) {
				$scope.empleados = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
}