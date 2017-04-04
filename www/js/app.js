// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers','jcs-autoValidate'])



.run(function($ionicPlatform, $rootScope,$ionicHistory,$ionicConfig) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  /*   navigator.splashscreen.hide();*/

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
   /*$rootScope.$on("$ionicView.enter", function () {
   $ionicHistory.clearCache();
   
   console.log("clearCache calling");
   $ionicConfig.views.swipeBackEnabled(true);
});*/
//$ionicHistory.clearHistory();
})

.constant('APIURL','http://localhost/ecommerce/api/ws/controller/?access=true&')
.constant('imageUrl','http://localhost/ecommerce/')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('auth', {
    url: '/auth',
    abstract: true,
    templateUrl: 'templates/auth.html',
    controller: 'AuthCtrl'
  })

  .state('auth.login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'

   })

   
  .state('auth.signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignUpCtrl'

   })

  /* .state('auth.otp', {
      url: '/otp',
      templateUrl: 'templates/otp.html',
      controller: 'otpCtrl'

   })*/


  .state('auth.forgot-password', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html',
      controller: 'forgotCtrl'

   })
   
  
   
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/app.html",
    controller: 'AppCtrl'
  })

    .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller:'HomeCtrl'
      }
    }
  })
    
    
    .state('app.products', {
    url: "/products/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "templates/products.html",
        controller:'productCtrl'
      }
    }
  })
    .state('app.productdetails', {
    url: "/productdetails/:itemsId",
    views: {
      'menuContent': {
        templateUrl: "templates/productdetails.html",
        controller: 'productdetailsCtrl'
      }
    }
  })

    .state('app.aboutus', {
    url: "/aboutus",
    views: {
      'menuContent': {
        templateUrl: "templates/aboutus.html"
      }
    }
  })

    .state('app.policies', {
    url: "/policies",
    views: {
      'menuContent': {
        templateUrl: "templates/policies.html"
      }
    }
  })

    .state('app.help and support', {
    url: "/help and support",
    views: {
      'menuContent': {
        templateUrl: "templates/help and support.html"
      }
    }
  })

    .state('app.contactdetails', {
    url: "/contactdetails",
    views: {
      'menuContent': {
        templateUrl: "templates/contactdetails.html",
        controller:'contactdet'
      }
    }

  })

      .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html",
        controller:'profileCtrl'
      }
    }
  })

     .state('app.category', {
    url: "/category",
    views: {
      'menuContent': {
        templateUrl: "templates/category.html",
        controller :'catCtrl'
      }
    }
  })

   
 
 .state('app.changepassword', {
    url: "/changepassword",
    views: {
      'menuContent': {
        templateUrl: "templates/changepassword.html",
        controller :'changepassCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/login');
});