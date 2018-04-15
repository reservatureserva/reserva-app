 var config = {
   apiKey: "AIzaSyBoylqLp2f2ZO7afv-cso52PhCCncoOgbY",
   authDomain: "login-f6988.firebaseapp.com",
   databaseURL: "https://login-f6988.firebaseio.com",
   projectId: "login-f6988",
   storageBucket: "",
   messagingSenderId: "18277841873"
 };
 firebase.initializeApp(config);

 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    alert("Bienvenido "+email);
    firebase.auth().signOut().then(function() {
      alert('Cerrando sesion');
    }, function(error) {
      alert('Sign Out Error'+ error);
    });
  } else {

  }
});

 function login() {
  var email = $("input[name='email']").val();
  var password = $("input[name='password']").val();

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode == "auth/user-not-found"){
      var c = confirm("No dispone de cuenta\n¿Desea registrarse?");
      if(c){
        window.location.href = "http://localhost/login/registro.html";
      }
    }else{
      alert(errorCode);
      alert(errorMessage);  
    }
  });
}

function registro() {
  var email = $("input[name='email']").val();
  var password = $("input[name='password']").val();
  var repassword = $("input[name='repassword']").val();

  if(password === repassword && $("input[name='dni']").val() !== ''){
    console.log("Guardando en ElasticSearch");
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log(error);
     //Se notifica al usuario
     //Si hay error, borrará el registro de elastic
   });
  } 
} 