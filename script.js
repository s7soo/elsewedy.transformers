var goodToGo = true;
var allIsGood = [];

let userFName = document.getElementById("fname");
let userLName = document.getElementById("lname");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let userCPassword = document.getElementById("cpassword");


let userLoginEmail = document.getElementById("loginEmail");
let userLoginPassword = document.getElementById("loginPassword");

//let createUserBtn = document.querySelector("#createUser-btn");
let flag = false;
let loginuser = "";
let tempiD;
let tempName;

let allusers = [];
let userID;

//check if local Storage is Empty before Create =
if (localStorage.getItem("users")) {
  allusers = JSON.parse(localStorage.getItem("users"));
  userID = JSON.parse(localStorage.getItem("id"));
  userID++;
} else {
  allusers = [];
  userID = 0;
}

function validation() {
  if (userFName.value != "" && userLName.value != "" && userEmail.value != "" && userPassword.value != "") {
    if (userPassword.value === userCPassword.value) {
      createUser();
    } else {
      alert("password not match");
    }
  } else { alert(" Must Enter All The values !! "); }
}

function callAll() {
  // check for first name
  isEmpty('fname', 'first name is empty', isLettersOnly('fname', "Please enter letters only in first name"));
  
  // check for last name
  isEmpty('lname', 'last name is empty', isLettersOnly('lname', "Please enter letters only in first name"));
  // check for email
  
  isEmpty('email', 'email is empty', emailCheck('email'));
  // check for password
  
  isEmpty('password','password is empty',validPassword('password'));
  // check for confirm password
  
  isEmpty('cpassword','confirm password is empty',validConfirmPassword('password','cpassword'));
  if (isEveryThingValid()) {
    createUser();
    //console.log(allusers);
    window.location.href = 'login.html';
  }
}




function popup(msg){
  document.getElementById('msg').innerText = msg;
  document.getElementById('alert').classList.remove("hide");
  document.getElementById('alert').classList.add("show");
  document.getElementById('alert').classList.add("showAlert");
  setTimeout(() => {
    document.getElementById('alert').classList.remove("show");
    document.getElementById('alert').classList.add("hide");
    
  }, 1000);
}
function contactCallAll(){

  isEmpty('name','You name is empty',isLettersOnly('name','Enter letters only'));
  isEmpty('email','Your email is empty',emailCheck('email'));
  isEmpty('phone','Your phone number is empty',()=>{});
  isEmpty('company','Company is empty',isLettersOnly('name','Enter letters only'));
  isEmpty('selectCountry','Country is empty',emailCheck('email'));

}
function changeText(msg, inputId){
  var input = document.getElementById(inputId);
  console.log('Running Change text');
  input.style.border="3px solid red";
  document.getElementById(inputId).value = msg;
  console.log(document.getElementById(inputId).value);
  setTimeout(() => {
    document.getElementById(inputId).value = '';
  }, 2000);
}
function isLettersOnly(inputId, errorMessage) {
  var inputElement = document.getElementById(inputId);
  var lettersRegex = /\d/;

  // Test the input against the regular expression
  var onlyLetters = lettersRegex.test(inputElement.value);

  if (onlyLetters) {
    changeText(errorMessage,inputId);
    inputElement.value = '';
    goodToGo = false;
  } else {
    goodToGo = true;
  }
}
function isEmpty(inputId, errorMessage, fn) {
  var input = document.getElementById(inputId);
  if (input.value === '') {
    //popup(errorMessage);
    changeText(errorMessage,inputId);
    goodToGo = false;
    allIsGood.push(goodToGo);
  } else {
    fn;
  }
}
function isEveryThingValid() {
  var good = true;
  for (let i = 0; i < allIsGood.length; i++) {
    if (allIsGood[i] == false) {
      good = false;
    }
  }
  return good;
}
function emailCheck(emailId) {
  var inputElement = document.getElementById(emailId);
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the input against the regular expression
  var validEmail = emailRegex.test(inputElement.value);

  if (inputElement.value !== '' && !validEmail) {
    changeText("Invalid Email Format",emailId);
    inputElement.value = '';
    goodToGo = false;
  } else {
    goodToGo = true;
  }
}
function validPassword(passId) {
  var inputElement = document.getElementById(passId);
  var lengthRegex = /^.{8,}$/;
  var lowercaseRegex = /[a-z]/;
  var uppercaseRegex = /[A-Z]/;
  var numberRegex = /\d/;
  var specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  var meetsLength = lengthRegex.test(inputElement.value);
  var meetsLowercase = lowercaseRegex.test(inputElement.value);
  var meetsUppercase = uppercaseRegex.test(inputElement.value);
  var meetsNumber = numberRegex.test(inputElement.value);
  var meetsSpecialChar = specialCharRegex.test(inputElement.value);

  if (inputElement.value === !'') {
    if (!meetsLength) {
      changeText("Password is less than 8",passId);
      inputElement.value = '';
      goodToGo = false;
    }
    else if (!meetsLowercase) {
      changeText("Password must contain lower case letter",passId);
      inputElement.value = '';
      goodToGo = false;
    }
    else if (!meetsUppercase) {
      changeText("Password must contain upper case letter", passId);
      inputElement.value = '';
      goodToGo = false;
    }
    else if (!meetsNumber) {
      changeText("Password must contain at least one number",passId);
      inputElement.value = '';
      goodToGo = false;
    }
    else if (!meetsSpecialChar) {
      changeText("Password must contain least one special character", passId);
      inputElement.value = '';
      goodToGo = false;
    } else {
      goodToGo = true;
    }
  }
}
function validConfirmPassword(inputId1, inputId2) {
  var pass = document.getElementById(inputId1);
  var cpass = document.getElementById(inputId2);


  if (pass.value !== cpass.value) {
    changeText("Passwords are not the same",inputId2);
    cpass.value = '';
    goodToGo = false;
  } else {
    goodToGo = true;
  }
}
function logout() {
  window.location.href = 'login.html';
}

function checkHover(isHovered) {

  var fullname = document.getElementById('fullname');


  if (isHovered) {
    fullname.innerHTML = 'Logout';
    console.log("Mouse is currently hovering over the element.");
    console.log(newName);
  } else {
    fullname.innerHTML = localStorage.getItem("logInuserName");
    console.log("Mouse is not hovering over the element.");
  }
}
function changeName() {

  var fullname = document.getElementById('fullname').innerHTML = localStorage.getItem("logInuserName");
  console.log(fullname);
}
function validateLogin() {
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;

  if (email == localStorage.getItem("email")) {
    if (password == localStorage.getItem("password")) {
      window.location.href = 'index.html';
    } else {
      changeText("Password is not correct, try again", password);
      password = '';
    }
  } else {
    changeText("email does not exist, try again", email);
    email = '';
  }
}
function sendEmail() {

}
function createUser() {

  let user = {
    uID: userID,
    uName: userFName.value + " " + userLName.value,
    uEmail: userEmail.value,
    uPassword: userPassword.value
  }
  allusers.push(user);
  localStorage.setItem("users", JSON.stringify(allusers));
  localStorage.setItem("id", JSON.stringify(userID));
  alert("User Registered Successfully");
  // location.reload();
}

function logIn() {
  console.log(localStorage.getItem("users"));
  if (localStorage.getItem("users")) {
    let searchedUser = JSON.parse(localStorage.getItem("users"));

    for (let index = 0; index < searchedUser.length; index++) {
      if (userLoginEmail.value == searchedUser[index].uEmail && userLoginPassword.value == searchedUser[index].uPassword) {
          flag = true;
          loginuser = `Welcome to your account Mr/Mrs : "${searchedUser[index].uName}"`;
          tempiD = searchedUser[index].uID;
          tempName = searchedUser[index].uName;
          break;
      }
    }
    if (flag) {
      alert(loginuser);
      window.location.href = 'index.html';
    } else {
      changeText("Invalid User email or password", 'loginEmail');
    }
  } else {
    changeText("Try to contact with Admin for this issue..",'loginEmail');
  }
  localStorage.setItem('logInuser', tempiD);
  localStorage.setItem('logInuserName', tempName);
}




