(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdToast','$mdBottomSheet', '$log', '$q','$rootScope','$scope','$firebaseArray','$firebaseObject','$http',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav,$mdToast, $mdBottomSheet, $log, $q,$rootScope,$scope,$firebaseArray,$firebaseObject,$http) {
    var self = this;
    self.mapLoading = true;
    self.ref = new Firebase("https://phl.firebaseio.com");
    self.bikeFire = new GeoFire(self.ref.child("indego").child('_geofire'));
    self.cycleref = new Firebase("https://cyclephilly.firebaseio.com");
    self.loggedOut = true;
    self.user={};
    self.IsActive = true;
    self.sortedIndego = [];
    self.bikeShares = [];
    self.radius = 1000;
    self.trackingStart = false;
    self.lng = -75.1695314;
    self.lat = 39.9620048;
    self.locations = {
      "philly": [39.9620048,-75.1695314]
    };
    $scope.sortedIndego = [
  {
    "key": "0",
    "distance": 0.0,
    "location": [
      -75.13983,
      39.96062
    ],
    "properties": {
      "addressCity": "Philadelphia",
      "addressState": "PA",
      "addressStreet": "117 Spring Garden St.",
      "addressZipCode": "19123",
      "bikesAvailable": "--",
      "closeTime": "23:58:00",
      "docksAvailable": "--",
      "isEventBased": false,
      "isVirtual": false,
      "kioskId": false,
      "kioskPublicStatus": "Active",
      "name": "Loading nearest stations...",
      "openTime": "00:02:00",
      "publicText": "",
      "timeZone": "Eastern Standard Time",
      "totalDocks": 19,
      "trikesAvailable": 0
    },
    "$$hashKey": "object:37"
  }
];

    self.dialer = {
      topDirections: ['left', 'up'],
      bottomDirections: ['down', 'right'],
      isOpen: false,
      availableModes: ['md-fling', 'md-scale'],
      selectedMode: 'md-fling',
      availableDirections: ['up', 'down', 'left', 'right'],
      selectedDirection: 'up'
    };

    self.people = [
    { name: 'Janet Perkins', img: 'img/100-0.jpeg', newMessage: true },
    { name: 'Mary Johnson', img: 'img/100-1.jpeg', newMessage: false },
    { name: 'Peter Carlsson', img: 'img/100-2.jpeg', newMessage: false }
  ];

    self.test=function($event){
      $mdToast.show(
        $mdToast.simple()
        .content("Report your issue")
        .position('top right')
        .hideDelay(4000)
      );
    }

    var weatherRef = new Firebase('https://publicdata-weather.firebaseio.com/washington/currently');
    var hourlyWeatherRef = new Firebase('https://publicdata-weather.firebaseio.com/washington/hourly');
    hourlyWeatherRef.child('summary').on('value', function(snapshot) {
        //console.log('Temperature is currently ' + snapshot.val());
        self.weather ={};
        self.weather.icon = 'icon-cloudy';
        self.weather.temperatureicon = {name: 'icon-Fahrenheit'   , color: "rgb(0,0,0)" }
        self.weather.message = snapshot.val();
        self.weather.style = "weather-style";
        console.log(self.weather)
    });
    weatherRef.child('temperature').on('value', function(snapshot) {
      // console.log('Temperature is currently ' + snapshot.val());
      self.weather.temperature = snapshot.val();
  });

    self.showDetails = function(e){
      // console.log(key)
      $mdToast.show(
        $mdToast.simple()
        .content("This action is under construction.")
        .position('top right')
        .hideDelay(4000)
      );
      self.stationName = "yo"
    }
    self.center = self.locations["philly"];

    self.mapCenter = new google.maps.LatLng(self.center[0],self.center[1]);
      var mapOptions = {
        zoom: 15,
        center: self.mapCenter,
        mapTypeId: google.maps.MapTypeId.MAP
      };
      if(self.map === undefined){
        self.map = new google.maps.Map(document.getElementById("map-canvas"),
          mapOptions);
      }
    self.crumbs = $firebaseArray(self.cycleref.child('anon').child('noid').child('crumbs'));
    function authDataCallback(authData) {
      if (authData) {
        self.loggedOut = false;
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        console.log(authData);
        self.crumbs = $firebaseArray(self.cycleref.child('anon').child(authData.uid).child('crumbs'));
        self.crumbs.$loaded().then(function() {
          console.log(self.user);
          self.trackingStart = true;
          // self.user.$bindTo($rootScope,'crumbs');
        });

        self.bikshareKiosks = $firebaseArray(self.ref.child('indego').child("kiosks"));
        self.bikeshareUnwatch = self.bikshareKiosks.$watch(function(){
          var placesInQuery = [];
          self.geoQuery = self.bikeFire.query({
            center: [self.lng,self.lat],
            radius: 0.5
          });

          var onKeyEnteredRegistration = self.geoQuery.on("key_entered", function(key, location, distance) {
          // Specify that the vehicle has entered this query
          // console.log(key+" "+distance+" "+location);
          var dd=_.findIndex(self.bikshareKiosks, function(chr) {
            return chr.$id == key;
          });
          placesInQuery.push({key:key,distance:distance,location:location,properties:self.bikshareKiosks[dd].properties});
          $scope.$apply(function(){
            $scope.sortedIndego = _.sortBy(placesInQuery, 'distance');
          })
          // console.log($scope.sortedIndego);
        });

        /* Removes vehicle markers from the map when they exit the query */
        self.geoQuery.on("key_exited", function(placeId, vehicleLocation) {
          // Get the vehicle from the list of vehicles in the query
          placeId = placeId.split(":")[1];
          vm.bikeShares[placeId].setMap(null);
        });
        })
      self.bikshareKiosks.$loaded().then(function(){
        
      self.GeoMarker = new GeolocationMarker();
      self.GeoMarker.setCircleOptions({fillColor: '#808080'});

        google.maps.event.addListenerOnce(self.GeoMarker, 'position_changed', function() {
          self.map.setCenter(this.getPosition());
          self.lng = this.getPosition().lng();
          self.lat = this.getPosition().lat();
            self.crumbs.$add({timestamp:Firebase.ServerValue.TIMESTAMP,lat:this.getPosition().lat(),lng:this.getPosition().lng()})
          /*************/
          /*  GEOQUERY */
          /*************/
          // Keep track of all of the vehicles currently within the query
          var placesInQuery = [];

          // Create a new GeoQuery instance
          self.geoQuery = self.bikeFire.query({
            center: [this.getPosition().lng(),this.getPosition().lat()],
            radius: 0.5
          });

          var onKeyEnteredRegistration = self.geoQuery.on("key_entered", function(key, location, distance) {
          // Specify that the vehicle has entered this query
          // console.log(key+" "+distance+" "+location);
          var dd=_.findIndex(self.bikshareKiosks, function(chr) {
            return chr.$id == key;
          });
          placesInQuery.push({key:key,distance:distance,location:location,properties:self.bikshareKiosks[dd].properties});
          
          // var loc = new google.maps.LatLng(location[0],location[1])
          // self.bikeShares[placeId] = new google.maps.Marker({
          //   position: loc,
          //   icon: {
          //     path: google.maps.SymbolPath.CIRCLE,
          //     scale: 6,
          //     fillColor: 'green',
          //     fillOpacity: 0.1,
          //     strokeColor: 'yellow',
          //   strokeOpacity: 0.8,
          //   strokeWeight:2
          //   },
          //   draggable: false,
          //   map: self.map
          // });
          // google.maps.event.addListener(self.bikeShares[placeId], 'click', self.showDetails);
          
          $scope.$apply(function(){
            $scope.sortedIndego = _.sortBy(placesInQuery, 'distance');
          })
          console.log($scope.sortedIndego);
        });

        /* Removes vehicle markers from the map when they exit the query */
        self.geoQuery.on("key_exited", function(placeId, vehicleLocation) {
          // Get the vehicle from the list of vehicles in the query
          placeId = placeId.split(":")[1];
          vm.bikeShares[placeId].setMap(null);
        });
          
          // self.map.fitBounds(this.getBounds());
        });

        google.maps.event.addListener(self.GeoMarker, 'geolocation_error', function(e) {
          alert('There was an error obtaining your position. Message: ' + e.message);
        });

        self.GeoMarker.setMap(self.map);
        
        self.mapLoading = false;

        angular.forEach(self.bikshareKiosks, function(value, key) {
          console.log(value);
          var fillcolor
          var fillopacity;
          if(value.properties.bikesAvailable == 0){
            fillcolor = "#FFFFFF";
            fillopacity= 0.7;
          }else{
            if (value.properties.bikesAvailable <= 4) {
              fillcolor = "#a2d40a";
              fillopacity= 0.4;
            }else{
              fillcolor = "#002369"
              fillopacity= value.properties.bikesAvailable/value.properties.totalDocks;
            }
            
          }
          var loc = new google.maps.LatLng(value.geometry.coordinates[1],value.geometry.coordinates[0])
          self.bikeShares[value.$id] = new google.maps.Marker({
            position: loc,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: fillcolor,
              fillOpacity: fillopacity,
              strokeColor: '#002369',
            strokeOpacity: 0.8,
            strokeWeight:2
            },
            draggable: false,
            map: self.map
          });
          google.maps.event.addListener(self.bikeShares[value.$id], 'click', function(){
            $mdToast.show(
              $mdToast.simple()
              .content(value.properties.name+": "+value.properties.bikesAvailable+" bikes available! "+value.properties.docksAvailable+" docks available!")
              .position('top right')
              .hideDelay(4000)
            );
            self.stationName = value.properties.name;
            self.bikesAvailable = value.properties.bikesAvailable;
            self.docksAvailable = value.properties.docksAvailable;

          });
          
          
        });
      });
        
        
        // $mdDialog.hide();
      } else {
        console.log("User is logged out");
        self.cycleref.authAnonymously(function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            
          }
        });
        //Login as anon
        //self.cycleref.
        // showLoginDialog();
      }
    }
    self.cycleref.onAuth(authDataCallback);
    
    // $http.get('https://api.phila.gov/bike-share-stations/v1')
    // .success(function(response){
    //   self.searching = false;
      
    //   angular.forEach(response.features,function(v, key){
    //     console.log(v);
    //     self.bikeFire.set(v.properties.kioskId.toString(), [v.geometry.coordinates[0],v.geometry.coordinates[1]]).then(function() {
    //       console.log("Provided key has been added to GeoFire");
    //       self.ref.child("bikeshare").child("kiosks").child(v.properties.kioskId).set(v);
    //     }, function(error) {
    //       console.log("Error: " + error);
    //     });
    //   })
    // })
    // .error(function(data, status, headers, config){
    //   self.searching = false;
    //   $mdToast.show(
    //     $mdToast.simple()
    //     .content("An error Occured.")
    //     .position('top right')
    //     .hideDelay(3000)
    //   );
    //   console.log(data);
    // });


    

    // self.datasets = $firebaseArray(self.ref.child('datasets').orderByChild("featured").equalTo(true));
    // self.datasets.$loaded().then(function() {
    //   console.log(self.datasets);
    // });

    // self.orgs = $firebaseArray(self.ref.child('orgs').orderByKey());
    // self.orgs.$loaded().then(function() {
    //   console.log(self.orgs);
    // });


    self.selected     = null;
    
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.showContactOptions  = showContactOptions;

    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.vegetables = loadVegetables();
    self.selectedVegetables = [];
    self.newSet = {};
    self.newSet.types = [];
    self.numberChips = [];
    self.numberChips2 = [];
    self.numberBuffer = '';
    

    self.layers={
    indego:{name:"Ride Indego",enabled:true,color:"md-primary"},
    racks:{name:"Bike Racks",enabled:false,color:"md-accent"},
    routes:{name:"Bike Routes",enabled:true,color:"md-primary md-hue-2"},
    }


    self.toggleMode = function(item){
      self.bikeColor = "rgb(70, 239, 245)";
    }

    self.githubLogin=function($event){
      self.ref.authWithOAuthPopup("github", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      },{
        scope: "gist,email"
      });
    }
    self.logOut=function($event){
      self.ref.unauth();
      self.loggedOut=true;
      $mdToast.show(
        $mdToast.simple()
        .content("Good bye.")
        .position('top right')
        .hideDelay(500)
      );
    }

    self.saveDataSet = function($event){
      self.datasets.$add(self.newSet).then(function(ref){
        self.newSet = {};
      $mdToast.show(
        $mdToast.simple()
        .content("Saved new Data Set.")
        .position('top right')
        .hideDelay(1500)
      );
      })
    }

    self.saveOrg = function($event){
      self.orgs.$add(self.newOrg).then(function(ref){
        self.newOrg = {};
      $mdToast.show(
        $mdToast.simple()
        .content("Saved new Org.")
        .position('top right')
        .hideDelay(1500)
      );
      })
      //clear data
      
    }
    /**
     * Search for vegetables.
     */
    function querySearch (query) {
      var results = query ? self.vegetables.filter(createFilterFor(query)) : [];
      return results;
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(vegetable) {
        return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
            (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
      };
    }
    function loadVegetables() {
      var veggies = [
        {
          'name': 'bicycle',
          'type': 'bicycle'
        },
        {
          'name': 'bus',
          'type': 'transit'
        },
        {
          'name': 'rail/subway',
          'type': 'transit'
        },
        {
          'name': 'automobile',
          'type': 'automobile'
        },
        {
          'name': 'airplane/airport',
          'type': 'airplane'
        },
        {
          'name': 'ferry',
          'type': 'ferry'
        },
        {
          'name': 'pedestrian',
          'type': 'pedestrian'
        }
      ];
      return veggies.map(function (veg) {
        veg._lowername = veg.name.toLowerCase();
        veg._lowertype = veg.type.toLowerCase();
        return veg;
      });
    }

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    function showContactOptions($event) {
        var user = self.selected;

        return $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: './src/users/view/contactSheet.html',
          controller: [ '$mdBottomSheet', ContactPanelController],
          controllerAs: "cp",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function ContactPanelController( $mdBottomSheet ) {
          this.user = user;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.submitContact = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
