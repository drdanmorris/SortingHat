
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
        rumble: new Audio("assets/rumble.mp3"),
        coin: new Audio("assets/coin2.wav"),
        clap: new Audio("assets/applause.wav"),
        boo: new Audio("assets/boo.wav")
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

      var houses;
      

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
          bandit.spin();

          $timeout(this.ping, 2600);
          $timeout(this.ping, 3300);
          $timeout(this.ping, 3800);

          $timeout(this.doSort, 4500);
        },

        ping: function() {
          sound.coin.play();
        },

        doSort: function() {

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
        
          if(houses[0].indexOf(house) === 0) sound.boo.play();
          else sound.clap.play();

          results[house] = results[house] || [];
          results[house].push(scope.pupil);

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