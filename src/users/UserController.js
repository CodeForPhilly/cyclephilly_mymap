(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdToast','$mdBottomSheet', '$log', '$q','$rootScope','$firebaseArray','$firebaseObject',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav,$mdToast, $mdBottomSheet, $log, $q,$rootScope,$firebaseArray,$firebaseObject) {
    var self = this;
    self.ref = new Firebase("https://phl-data.firebaseio.com");
    self.loggedOut = true;
    self.user={};
    function authDataCallback(authData) {
      if (authData) {
        self.loggedOut = false;
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        console.log(authData);
        $rootScope.userEmail = authData.github.email;
        $rootScope.userName = authData.github.username;
        $rootScope.uid = authData.uid;
        $rootScope.token = authData.token;
        
        self.user = $firebaseObject(self.ref.child('users').child(authData.uid));
        self.user.$loaded().then(function() {
          console.log(self.user);
          self.user.$bindTo($rootScope,'user');
          self.user.username = authData.github.username;
          self.user.image = authData.github.cachedUserProfile.avatar_url;
        });

        self.favorites = $firebaseArray(self.ref.child('users').child(authData.uid).child('favorites').orderByKey());
        self.favorites.$loaded().then(function() {
          console.log(self.favorites);
        });

        self.datasets = $firebaseArray(self.ref.child('datasets').orderByChild("featured").equalTo(true));
        self.datasets.$loaded().then(function() {
          console.log(self.datasets);
        });

        self.orgs = $firebaseArray(self.ref.child('orgs').orderByKey());
        self.orgs.$loaded().then(function() {
          console.log(self.orgs);
        });
        $mdToast.show(
        $mdToast.simple()
        .content("Hello "+$rootScope.userName+"!")
        .position('top right')
        .hideDelay(500)
      );

        
        // $mdDialog.hide();
      } else {
        console.log("User is logged out");
        // showLoginDialog();
      }
    }
    self.ref.onAuth(authDataCallback);


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
