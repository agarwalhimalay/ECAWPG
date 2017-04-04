angular.module('starter.controllers', [])


.controller('AuthCtrl', function($scope,$ionicHistory,$ionicPlatform) {
 $ionicPlatform.onHardwareBackButton(function () {
    if ($state.is('auth.login')) { // here to check whether the home page, if yes, exit the application
        AlertService.Confirm('System warning', 'are you sure you want to exit?',
            function() {
                navigator.app.exitApp();
            },
            function() {
                return;
            });
    }
})
})




.controller('AppCtrl', function($scope, $ionicModal, $location,$window,$ionicPlatform) {
  //$ionicHistory.clearCache();
  //$ionicHistory.clearHistory();

// $scope.myGoBack = function() {
// $ionicHistory.goBack();
// }
   
})
   


.controller('profileCtrl', function($scope ,$ionicModal, $timeout,$location,$http,APIURL,imageUrl) {
  $scope.imageUrlHome = imageUrl;
  $scope.user  = {};
 
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
   
    console.log(userInfo);
  
    $scope.userInfo=userInfo;

    $scope.edit=function(){

      var params='action=manage_user&type=Edit&editId='+userInfo.id+'&firstName='+userInfo.firstName+'&lastName='+userInfo.lastName+'&address='+userInfo.address;
      $http.get(APIURL+params).success(function(response){
        
        if(response.status===true)
        {
          alert("Updated successfully");
          $location.path('app/home');
        }
        else{
          alert("Update Unsuccessful");
        }
      });
    }


})

.controller('catCtrl', function($scope, $http,APIURL,imageUrl) {
$scope.imageUrlHome = imageUrl;

var params='action=get_category_list';
$http.get(APIURL+params).success(function(data) {
    console.log(data['data']);
        $scope.categories = data.data;
     
    });

})

.controller('productCtrl',function($scope,$location,$http,APIURL,$stateParams,imageUrl,$timeout){
$scope.imageUrlHome=imageUrl;


    $scope.user={};
    console.log($stateParams);
    var params='action=get_items_list&categoryId='+$stateParams.categoryId;
     console.log(APIURL+params);
     $http.get(APIURL+params).success(function(data){
     console.log(data);
     $scope.items=data.data;
});
var params1='action=get_category_list';
 $http.get(APIURL+params1).success(function(data) {
    console.log(data['data']);
        $scope.categories = data.data;
     
    });
     $scope.showMe = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
    }
 
     
 })

.controller('LoginCtrl', function($scope,$location,$http,APIURL,$ionicHistory) {
  
  $scope.user={};

  $scope.login=function(){

    var params='action=login&mailId='+$scope.user.mailId+'&password='+$scope.user.password;


      $http.get(APIURL+params).success(function(response){

        if(response.status===true)
        {
          localStorage.setItem("userInfo",JSON.stringify(response.data));
          $location.path('app/home');
        }
        else{
          alert("Login Unsuccessful");
        }
      });
 /* console.log("asdasdsadsad");*/
  }
})

.controller('SignUpCtrl', function($scope,$location,$http,APIURL,$state,$ionicHistory) {

   $scope.user  = {};
      
      $scope.signup = function(){
      
         var params = 'action=manage_user&type=Add&mailId='+$scope.user.mailId+'&password='+$scope.user.password+'&firstName='+$scope.user.firstName+'&lastName='+$scope.user.lastName+'&contactNumber='+$scope.user.contactNumber;

                     
                        $http.get(APIURL+params).success(function(response) {
                         
                        if(response.status === true)
                        {

                          $location.path('auth/login');

                          alert("Registration Successful");

                        }else

                        {
                          alert("Registration UnSuccessful");
                        }
                        
                      });                            
      } 
       /*    
        $scope.refresh=function(){
                     $ionicHistory.clearCache();
                     $ionicHistory.clearHistory();
                             $location.path('auth/login');
                   
                  }
           */
    })

.controller('contactdet', function($scope,$location,$http,APIURL,$state) {
  $scope.user={};


  $scope.contactus=function(){
     var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    var params1 = 'action=contactUs&type=Add&userName='+$scope.user.name+'&mailId='+$scope.user.mailId+'&contactNumber='+$scope.user.contactNumber+'&userMessage='+$scope.user.message;
/*    console.log("asdasdsadsad");
    console.log(params1);*/
    $http.get(APIURL+params1).success(function(response){
     /* console.log(response);*/
      if(response.status===true){
      
        alert("Successful data Records");
      $state.go('app.home');
        
      }else{
        alert("Unsuccessful");
      }
    });
  }

})



 .controller('HomeCtrl', function($scope,$location,$http,APIURL,$stateParams,imageUrl,$state) {

  $scope.imageUrlHome = imageUrl;

var params='action=get_category_list';
  

  $http.get(APIURL+params).success(function(data) {
    console.log(data['data']);
        $scope.categories = data.data;
     
    });

  var params1='action=get_recentadditems_list';
     console.log(APIURL+params1);
     $http.get(APIURL+params1).success(function(data){
     console.log(data);
     $scope.recentitems=data.data;
});

    })

 

.controller('forgotCtrl', function($scope, $ionicModal, $timeout,$location,$http,APIURL,$ionicHistory,$state) {
  $scope.user  = {};

      $scope.forgotSubmit = function(){
    
        var params='action=forgot_password&mailId='+$scope.user.mailId;
        $http.get(APIURL+params).success(function(response) {
          console.log(APIURL+params);
                        if(response.status === true)
                        {
                          alert("New Password send to your Email")
                          $location.path('auth/login');

                        }else 
                        {
                         alert("Email Id Not exit");
                        }
                        
                      });
                  }
    
})

.controller('changepassCtrl', function($scope, $ionicModal, $timeout,$state,$http,APIURL,$location) {
    
    $scope.user  = {};
      var Confirmpassword = $scope.user.Confirmpassword;
      var newpassword = $scope.user.newpassword;

      $scope.changePassword  = function(){
        
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log(userInfo);
         var params = 'action=change_password&id='+userInfo.id+'&password='+$scope.user.oldpassword+'&password1='+$scope.user.newpassword;
    
                  if(angular.equals($scope.user.newpassword, $scope.user.Confirmpassword))
                  {    
                        $http.get(APIURL+params).success(function(response) {
                         
                        if(response.status === true)
                        {

                          $location.path('auth/login');
                          alert("Your Password has been change successfully");
                          
                        }else if(response.status === false)
                        {
                          alert("your old passsword did not match. Please Enter Again");
                        }
                        
                      });
                  }else
                  {
                    alert("Your Password not match");
                  }

        
      }
 })

 

// .controller('otpCtrl', function($scope,$location,$http,APIURL) {
      

//       $scope.user  = {};
//       var otp = $scope.user.otp;
      
//       // console.info($scope.confirmpassword);
//       $scope.otpSubmit = function() {
          
//         //var params = 'action=get_user_details&otp='+$scope.user.otp;
//         //console.log(userInfo);
//         var params = 'action=otp_varified&otp='+$scope.user.otp;
          
//           $http.get(APIURL+params).success(function(response) { 
//           console.log(response);
//           // localStorage.setItem("userInfo",JSON.stringify(response.data)); 
//           if(response.status === true)
//           {

//             $location.path('auth/changepassword');
//             alert("OTP Verified"); 
//           }else if(response.status === false)
//           {
//             alert("Your Password not change");
//           }
          
//         });
//       } 
// })


.controller('productdetailsCtrl',function($scope,$http,APIURL,imageUrl,$stateParams,$location,$state,$timeout){

$scope.imageUrlHome=imageUrl;


    $scope.user={};
    console.log($stateParams);
    var params='action=get_items_details&itemsId='+$stateParams.itemsId;
     console.log(APIURL+params);
     $http.get(APIURL+params).success(function(data){
     console.log(data);
     $scope.itemdetail=data.data;

});
     
    $scope.showMe = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
    }
   
 })



  /*// With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
*/