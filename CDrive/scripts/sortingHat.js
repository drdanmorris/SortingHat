
angular.module('CDrive', []);


(function () { 

    angular.module('CDrive').controller('PickerController', PickerController);


    function getLinesFrom(id) {
      return $('#' + id).text().split('\n');
    }




    PickerController.$inject = ['$scope', '$http', '$timeout'];
    function PickerController(scope, $http, $timeout) {

      var allHouses = [];
      var results = {};
      var pupils, currentPupilIndex;

      $('#houses').text('Jail - 7\nPysch Ward - 7');
      $('#pupils').text('Ben\nDaniel\nGurpreet\nHarshila\nLuke\nNatalia\nPatrick\nPaul\nRagha\nRhys\nShyarmal\nSonya\nVanita\nYini');


    	var sound = {
        rumble: new Audio("assets/rumble2.mp3"),
        boo: new Audio("assets/ching-boo.mp3"),
        clap: new Audio("assets/ching-clap.mp3")
      };

    	
      pupils = getLinesFrom('pupils');
      pupils = shuffle(pupils);
      currentPupilIndex = 0;
      scope.pupil = null;
      scope.mode = 'start';
      scope.picking = false;
      scope.showing = false;
      scope.enrolling = true;

      scope.buttonClick = function() {
        action[scope.mode]();
      };

      var houses, maxHouse;
      

      var action = {
        start: function() {
          sound.rumble.play();
          scope.working = true;
          allHouses = [];

          houses = getLinesFrom('houses');
          _.each(houses, function(house){
            var parts = house.split('-');
            var name = parts[0].trim();
            var number = parseInt(parts[1].trim());
            while(--number >= 0) {
              allHouses.push(name);
            }
          });
          scope.houses = allHouses;


          $timeout(function(){
            scope.pupil = pupils[currentPupilIndex];
            scope.mode = 'sort';
            scope.working = false;
            scope.enrolling = false;
            scope.picking = true;
          }, 1000);
        },


        sort: function() {
          scope.working = true;
          scope.spinning = true;

          var house = this.doSort();
          if(houses[0].indexOf(house) === 0) sound.boo.play();
          else sound.clap.play();

          bandit.spin();
          $timeout(this.doSortComplete, 4500);
        },

        doSort: function() {

          var selectionMatrix = [];

          for(var i = 0; i < 100; i++) {
            var selection = getRandomIntInclusive(0,scope.houses.length - 1);
            selectionMatrix[selection] = selectionMatrix[selection] || 1;
            selectionMatrix[selection] += 1;
          }

          maxHouse = -1, maxSelection = -1;

          for(var i = 0; i < scope.houses.length; i++) {
            if(selectionMatrix[i] > maxSelection) {
              maxSelection = selectionMatrix[i];
              maxHouse = i;
            }
          }

          var house = scope.selection = scope.houses[maxHouse];
          results[house] = results[house] || [];
          results[house].push(scope.pupil);
          return house;
        },

        doSortComplete: function() {
          if(scope.houses.length > 1 && currentPupilIndex < pupils.length-1) {
            scope.houses.splice(maxHouse, 1);
            scope.mode = 'next';
          }
          else {
            scope.showing = true;
            scope.picking = false;
            action.show(results);
          }

          scope.working = false;
          scope.spinning = false;

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