
angular.module('CDrive', []);


(function () { 

    angular.module('CDrive').controller('PickerController', PickerController);






    PickerController.$inject = ['$scope', '$http'];
    function PickerController(scope, $http) {

      var availableHouses = [{name: 'Jail', number: 8}, {name: 'Psych', number : 8}];
      var houses = [];

      _.each(availableHouses, function(house) {
        while(--house.number >= 0) {
          houses.push(house.name);
        }
      });

      scope.houses = houses;

    	

    	var pupils, currentPupilIndex;

        $http.get('api/Class').
          success(function (data, status, headers, config) {
              scope.class = data[0];
              pupils = shuffle(scope.class.Pupils.split(','));
              currentPupilIndex = 0;
              scope.pupil = null;
              scope.mode = 'start';
              scope.picking = true;
              scope.showing = false;
          }).
          error(function (data, status, headers, config) {

          });

          


          scope.buttonClick = function() {
            action[scope.mode]();
          };

          var results = {};

          var action = {
            start: function() {
              scope.pupil = pupils[currentPupilIndex];
              scope.mode = 'sort';
            },

            sort: function() {
              var selectionMatrix = [scope.houses.length];

              for(var i = 0; i < 1000; i++) {
                var selection = getRandomIntInclusive(0,scope.houses.length - 1);
                selectionMatrix[selection] = selectionMatrix[selection] || 1;
                selectionMatrix[selection] += 1;
              }

              var maxHouse = -1, maxSelection = -1;

              for(var i = 0; i < scope.houses.length; i++) {
                if(selectionMatrix[i] > maxSelection) {
                  maxSelection = selectionMatrix[i];
                  maxHouse = i;
                }
              }

              var house = scope.selection = scope.houses[maxHouse];
          
              results[house] = results[house] || [];
              results[house].push(scope.pupil);

              if(scope.houses.length > 1) {
                scope.houses.splice(maxHouse, 1);
                scope.mode = 'next';
              }
              else {
                scope.showing = true;
                scope.picking = false;
                this.show(results);
              }

            },

            next: function() {
              scope.pupil = pupils[++currentPupilIndex];
              scope.mode = 'sort';
              scope.selection = '';
            },

            show: function(results) {
                scope.theSelection = [];

                _.each(results, function(result, name){
                  var selection = {
                    name: name,
                    pupils: result
                  };

                  scope.theSelection.push(selection);
                });
            }

          };



    }



    function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex ;
	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	}

	function getRandomIntInclusive(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}



})();