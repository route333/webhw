const form = document.querySelector("form");
const btn = document.querySelector(".loginBtn");
const key = "userInfo";
const loginKey = "loginInfo";

form.addEventListener("input", () => {
  const userName = form.elements.userName.value;
  const userSurname = form.elements.userSurname.value;
  const userEmail = form.elements.userEmail.value;
  const userAge = form.elements.userAge.value;
  const info = {
    name: userName,
    surname: userSurname,
    email: userEmail,
    age: userAge,
  };
  const saveInfo = JSON.stringify(info);
  localStorage.setItem(key, saveInfo);
});

btn.addEventListener("click", () => {
  const userLogin = form.elements.userLogin.value;
  const userPassword = form.elements.userPassword.value;
  const loginInfo = {
    user: userLogin,
    password: userPassword,
  };
  const saveLoginInfo = JSON.stringify(loginInfo);
  localStorage.setItem(loginKey, saveLoginInfo);
  checkUser(userLogin, userPassword);
});

function getFromLocalStorage() {
  const data = localStorage.getItem(key);
  const parseData = JSON.parse(data);
  form.elements.userName.value = parseData?.name || "";
  form.elements.userSurname.value = parseData?.surname || "";
  form.elements.userEmail.value = parseData?.email || "";
  form.elements.userAge.value = parseData?.age || "";
}

function getLoginFromLocalStorage() {
  const loginData = localStorage.getItem(loginKey);
  const loginParseData = JSON.parse(loginData);
  form.elements.userLogin.value = loginParseData?.user || "";
  form.elements.userPassword.value = loginParseData?.password || "";
}

function checkUser(user, password) {
  const savedLoginData = localStorage.getItem(loginKey);
  if (savedLoginData) {
    const savedParseData = JSON.parse(savedLoginData);
    if (savedParseData.user === user && savedParseData.password === password) {
      alert("Hello my new friend!");
    } else {
      alert("ERRORRRRRR!");
    }
  }
}

getLoginFromLocalStorage();

getFromLocalStorage();
