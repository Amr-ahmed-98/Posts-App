'use strict';
const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const textareaInput = document.querySelector('#textareaData');
const searchInput = document.querySelector('#searchData')
const displayPosts = document.querySelector('#posts');


const btnSignUp = document.querySelector('#btnSignUp');
const btnSignIn = document.querySelector('#btnSignIn');
const btnLogOut = document.querySelector('#btnLogout');
const btnPost = document.querySelector('#postBtn');
const btnGenerate = document.querySelector('#generateBtn');
const btnDelete = document.querySelector('.deletePost')
const btnEdit = document.querySelector('#editBtn')


const signUpAlert = document.querySelector('#signUpAlert');
const signInAlert = document.querySelector('#signInAlert');


const nameValidate = /^[a-zA-Z]{3,}\s+[a-zA-Z]{3,}$/;
const emailValidate = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordValidate =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

let dataArr;
let userName;



if (localStorage.getItem('data')) {
  dataArr = JSON.parse(localStorage.getItem('data'));
} else {
  dataArr = [];
}

// ----------- signUp And signIn And LogOut Buttons  ---------------
if (btnSignUp != null)
  btnSignUp.addEventListener('click', function () {
    if (
      validateData(nameValidate, nameInput) &
      validateData(emailValidate, emailInput) &
      validateData(passwordValidate, passwordInput)
    ) {
      if (dataArr.length != 0) {
        for (let i = 0; i < dataArr.length; i++) {
          if (dataArr[i].email == emailInput.value) {
            signUpAlert.classList.replace('d-none', 'd-block');
            return;
          }
        }
      }
      let data = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      dataArr.push(data);
      // userName.push(data.name);
      localStorage.setItem('data', JSON.stringify(dataArr));
      localStorage.setItem('userEmail', JSON.stringify(emailInput.value));
      // localStorage.setItem('userName', JSON.stringify(userName));
      clrData();
      location.replace('home.html');
    }
  });

  if (btnSignIn != null)
  btnSignIn.addEventListener('click', function () {
    if (
      validateData(emailValidate, emailInput) &
      validateData(passwordValidate, passwordInput)
    ) {
      for (let i = 0; i < dataArr.length; i++) {
        if (
          dataArr[i].email == emailInput.value &&
          dataArr[i].password == passwordInput.value
        ) {
          localStorage.setItem('data', JSON.stringify(dataArr));
          localStorage.setItem('userEmail', JSON.stringify(emailInput.value));
          clrSignIn();
          location.replace('home.html');
        }  else {
          signInAlert.classList.replace('d-none', 'd-block');
        }
      }
      signInAlert.classList.replace('d-none', 'd-block');
    }
  });

if (btnLogOut != null)
  btnLogOut.addEventListener('click', function () {
    location.replace('signin.html');
  });

  if(btnPost != null)
  btnPost.addEventListener('click',function(){
if(textareaInput.value != ''){
  let currentData = JSON.parse(localStorage.getItem('data'));
  let currentEmail  = JSON.parse(localStorage.getItem('userEmail'));
  for(let i =0; i<currentData.length; i++){
    if(currentData[i].email == currentEmail){
      const posts = {
        post:textareaInput.value,
      }
      let postsArr = currentData[i].newPost || [];
        postsArr.push(posts)
        currentData[i].newPost = postsArr;
        localStorage.setItem('data',JSON.stringify(currentData))
        localStorage.setItem('post',JSON.stringify(postsArr))
        displayPost();
        textareaInput.value = '';
        break;
    }
  }
}
  })

 

// ----------- Display Data ---------------
  const pElement = document.createElement('p');
  pElement.classList.add('fs-1', 'fw-bold');
  const userNameDisplay = document.querySelector('#userName')
function DisplayData() {
  let currentData = JSON.parse(localStorage.getItem('data'));
  let currentEmail  = JSON.parse(localStorage.getItem('userEmail'));
  for(let i =0; i<currentData.length; i++){
    if(currentData[i].email == currentEmail){
      pElement.textContent = 'Hello'+ ' ' +  currentData[i].name
      userNameDisplay.append(pElement)
      displayPost();
    }
  }
  
}

//-------------- Display Post ---------------
const div = document.createElement('div');
let card;

function displayPost(searchedPost = '') {
  let empty = '';
  let currentData = JSON.parse(localStorage.getItem('data'));
  let currentEmail  = JSON.parse(localStorage.getItem('userEmail'));
  for(let i =0; i<currentData.length; i++){
    if(currentData[i].email == currentEmail){
     const postArr = currentData[i].newPost;
     let searchArr = inputLength === 0 ? postArr : [searchedPost]
     let whichOneArr = searchedPost === '' || undefined ? postArr : searchArr
     for(let i =0; i<whichOneArr.length; i++){
       card = `<div class="col-lg-3 col-md-12 col-sm-12 col-12">
  <div class="card " style="min-width: 18rem;">
      <div class="card-body">
        <p class="card-text fs-3">${whichOneArr[i].post}</p>
        <button class='bg-white border-0'><i class="fa-solid fa-pen-to-square fs-3" data-index=${i}></i></button>
        <button class='bg-white border-0'><i class="fa-solid fa-trash fs-3 deletePost" data-index=${i}></i></button>
      </div>
    </div>
</div>`
empty += card
}
displayPosts.innerHTML = empty

    }}
}

//--------------- Delete Post ----------------

document.addEventListener('click',function(e){
  if(e.target.classList.contains('deletePost')){
    let currentData = JSON.parse(localStorage.getItem('data'));
    let currentEmail  = JSON.parse(localStorage.getItem('userEmail'));
    for(let i =0; i<currentData.length; i++){
      if(currentData[i].email == currentEmail){
        let currentIndex = e.target.dataset.index
        currentData[i].newPost.splice(currentIndex,1)
        localStorage.setItem('data',JSON.stringify(currentData))
        displayPost();
      }
    }
  }
})

// ------------ Edit Post ---------------
let newPost;
let currentIndex;
document.addEventListener('click',function(e){
  if(e.target.classList.contains('fa-pen-to-square')){
    let currentData = JSON.parse(localStorage.getItem('data'));
    let currentEmail  = JSON.parse(localStorage.getItem('userEmail'));
    for(let i =0; i<currentData.length; i++){
      if(currentData[i].email == currentEmail){
         currentIndex = e.target.dataset.index
         newPost = currentData[i].newPost[currentIndex]
        textareaInput.value = newPost.post
        btnPost.classList.add('d-none');
        btnEdit.classList.replace('d-none','d-inline-block')
}}}})

btnEdit.addEventListener('click',function(){
  let currentData = JSON.parse(localStorage.getItem('data'));
  let currentEmail  = JSON.parse(localStorage.getItem('userEmail'));
  for(let i =0; i<currentData.length; i++){
    if(currentData[i].email == currentEmail){
      currentData[i].newPost[currentIndex].post = textareaInput.value
      localStorage.setItem('data',JSON.stringify(currentData))
      btnEdit.classList.replace('d-inline-block','d-none');
      btnPost.classList.replace('d-none','d-inline-block')
      displayPost();
      textareaInput.value = ''
}}
})

// ----------- Search Data --------------
let searchedObj;
let inputLength;
searchInput.addEventListener('input',function(){
  const currentSearch = searchInput.value;
  inputLength = currentSearch.length
  let currentData = JSON.parse(localStorage.getItem('data'));
  let currentEmail  = JSON.parse(localStorage.getItem('userEmail'));
  let sPost;
  for(let i =0; i<currentData.length; i++){
    if(currentData[i].email == currentEmail){
     currentData[i].newPost.forEach((post)=>{
      if(post.post.includes(currentSearch)){
       sPost = post
      }
      })
      displayPost(sPost)
    }}

})
// ----------- Clear Data ---------------
function clrSignIn() {
  emailInput.value = '';
  passwordInput.value = '';
  emailInput.classList.remove('is-valid', 'is-invalid');
  passwordInput.classList.remove('is-valid', 'is-invalid');
}
function clrData() {
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  nameInput.classList.remove('is-valid', 'is-invalid');
  emailInput.classList.remove('is-valid', 'is-invalid');
  passwordInput.classList.remove('is-valid', 'is-invalid');
}

// --------------- Validation ---------------
function validateData(validate, element) {
  if (validate.test(element.value)) {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    element
      .closest('.form-floating')
      .nextElementSibling.classList.replace('d-block', 'd-none');
    return true;
  } else {
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    element
      .closest('.form-floating')
      .nextElementSibling.classList.replace('d-none', 'd-block');
    return false;
  }
}

//------------- Generate Random Quute ----------
const generateRandomQuote = async () => {
  try{
    const response = await fetch('https://api.api-ninjas.com/v1/quotes?X-Api-Key=wylSZCspCOAh88PsR0TGHQ==NOLisIB68lYB0o35');
  const data = await response.json();
  const quote = data[0].quote;
  return quote;
  }catch(error){
     alert(`You don't have Internet connection`);
  }
}

if(btnGenerate != null)
  btnGenerate.addEventListener('click',async () =>{
    if(await generateRandomQuote() != undefined){
    textareaInput.value = await generateRandomQuote();
  }else{
    textareaInput.value = ''
  }
})
