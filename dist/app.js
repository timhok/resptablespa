var spaApp = angular.module('spa', ['ngStorage']);
// Define the `PhoneListController` controller on the `phonecatApp` module
spaApp.controller('TableController', function TableController($scope, $window, $localStorage, $filter) {
	$scope.rawsLimit = 0;
	$scope.width = 0;
	$scope.counter = 0;
	$scope.columns=['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
	$scope.data = [];
	$scope.daySelector = 'Понедельник';
	$scope.newSubject ='';
//тестовые данные
	$scope.preData = [{
		'time': 32400000, 'Понедельник': 'Какой-то предмет', 'Вторник': 'Обществознание', 'Среда': 'Мемоведенье', 'Четверг': 'Уроки ангуляра', 'Пятница': 'Мде хз чо'
	}, {
		'time': 36000000, 'Понедельник': 'Какой-то предмет', 'Вторник': 'Обществознание', 'Среда': 'Мемоведенье', 'Четверг': 'Уроки ангуляра', 'Пятница': 'Мде хз чо'
	}, {
		'time': 39600000, 'Понедельник': 'Какой-то предмет', 'Вторник': 'Обществознание', 'Среда': 'Мемоведенье', 'Четверг': 'Уроки ангуляра', 'Пятница': 'Мде хз чо'
	}, {
		'time': 43200000, 'Понедельник': 'Какой-то предмет', 'Вторник': 'Обществознание', 'Среда': 'Мемоведенье', 'Четверг': 'Уроки ангуляра', 'Пятница': 'Мде хз чо'
	}, {
		'time': 46800000, 'Понедельник': 'Какой-то предмет', 'Вторник': 'Обществознание', 'Среда': 'Мемоведенье', 'Четверг': 'Уроки ангуляра', 'Пятница': 'Мде хз чо'
	}, {
		'time': 15600000, 'Понедельник': 'Какой-то предмет', 'Вторник': 'Обществознание', 'Среда': 'Мемоведенье', 'Четверг': 'Уроки ангуляра', 'Пятница': 'Мде хз чо'
	}, {
		'time': 23400000, 'Понедельник': 'Какой-то предмет', 'Вторник': 'Обществознание', 'Среда': 'Мемоведенье', 'Четверг': 'Уроки ангуляра', 'Пятница': 'Мде хз чо'
	}];
//Перевсти время в милисекунды
	function timeToMilli(n){
		var t = n.split(':');
		var seconds = 0;
		seconds = (parseInt(t[0]) * 60 * 60 + parseInt(t[1]) * 60);
		return seconds * 1000;
	}
//Заполнить localStorage данными из preData
	$scope.addPreData = function(){
		$localStorage.tableData = [];
		$localStorage.tableData = $scope.preData;
	};
//Добавить в localStorage данные из таблицы
	$scope.addToLocalStorage = function(){
		$localStorage.tableData = []; // хз зачем я тут это делаю
		$localStorage.tableData = $scope.data;
	};
//Загрузить данные из localStorage
	$scope.loadFromLocalStorage = function(){
		$scope.data = $localStorage.tableData;
	};
	/* дебаг */
	$scope.resetLocalStorage = function(){
		$localStorage.tableData = [];
	};
//Показать следующий столбец(столбцы)
	this.goBack = function(){
		if ($scope.counter > 0){
			$scope.counter--;
		}
	};
//Показать предыдущие
	this.goForward = function(){
		if ($scope.rowsLimit == 3) {
			if ($scope.counter < $scope.columns.length - 3) {
				$scope.counter++;
			}
		} else if ($scope.rowsLimit == 4){
			if ($scope.counter < $scope.columns.length - 4) {
				$scope.counter++;
			}
		} else if ($scope.rowsLimit == 1){
			if ($scope.counter < $scope.columns.length - 1) {
				$scope.counter++;
			}
		};
	};

//Добавление новой строки в таблицу
	$scope.addItem = function(){
		if (($scope.time != null) & ($scope.newSubject !='')){ //в input time и input text не пусто
			var filteredTime = $filter('date')($scope.time, 'HH:mm');
			var a = {};
			a[$scope.daySelector] = $scope.newSubject;//данные в выбранный день недели пустого массива
			a['time'] = timeToMilli(filteredTime); //время в секундах в новый пустой массив
			var found = $filter('filter')($scope.data, {time: a['time']}, true);
			if (found.length) { //если элемент уже существует
				$filter('filter')($scope.data, {time: a['time']}, true)[0][$scope.daySelector] = $scope.newSubject; //поиск и запись/перезапись
				$scope.time ='';
				$scope.newSubject ='';
			} else { //если не существует, просто push
				$scope.data.push(a);
				$scope.time ='';
				$scope.newSubject ='';
			};
		} else { //если какая-то из форм не заполнена
				console.log('fuck');
		};
	};
//Получение ширины окна и запись в $scope.width
	$scope.updateWidth = function(){
		$scope.width = $window.innerWidth;
	};
//Условия выбора количества столбцов
	$scope.tableRowLimiter = function(){
		if ($scope.width > 1200) {
			$scope.rowsLimit = 5;
		} else if ($scope.width > 992) {
			$scope.rowsLimit = 4;
		} else if ($scope.width >= 768){
			$scope.rowsLimit = 3;
		} else if ($scope.width < 768) {
			$scope.rowsLimit = 1;
		}
	};
//Если количество столбцов 5, то прокрутка не нужна
	$scope.hideScrollers = function(){
		if ($scope.rowsLimit >= 5){
			$scope.hideIfTrue = true;
		} else {
			$scope.hideIfTrue = false;
		}
	};
//Чтобы получить количество столбцов и разрешение, когда окно загрузилось
	$scope.updateWidth();
	$scope.tableRowLimiter();
	$scope.hideScrollers();
	//$scope.resetLocalStorage();
	//$scope.addPreData();
	$scope.loadFromLocalStorage();
//Запускается при ресайзе
	$window.onresize = function (){
		$scope.counter = 0; //обнулять все время, чтобы при обратном ресайзе показывались все столбцы
		$scope.updateWidth();
		$scope.tableRowLimiter();
		$scope.hideScrollers();
		$scope.$apply(); //чет хз даже что это
	};

});