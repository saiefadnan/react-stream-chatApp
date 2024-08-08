import { fetchData } from "./fetchData.js";
import { authorization } from "./authorize.js";

document.addEventListener('DOMContentLoaded', () => {
  
});


document.getElementById('loginButton').addEventListener('click', async() => {
    const email = document.getElementById('logemailInput').value; 
    const password = document.getElementById('logpasswordInput').value;
    const error = document.getElementById('error-container');
    const errorText = document.getElementById('error-container').querySelector('legend');
    if (email.trim() && password.trim()) {
      const reqData ={
        email: email,
        password: password
      }
      const {login,notify,token} = await fetchData('http://localhost:4000/api/login',reqData);
      if(login){
        console.log(email,password);
        error.style.display = 'block';
        errorText.textContent = notify;
        errorText.style.color = 'green';
        localStorage.setItem('token',token);
        //localStorage.setItem('email',email);
        console.log(localStorage.getItem('token'));
        await authorization(localStorage.getItem('token'));
      }
      else{
        console.log('failure');
        error.style.display = 'block';
        errorText.textContent = notify;
        errorText.style.color = 'red';
      }
    }
    else {
        error.style.display = 'block';
        errorText.textContent = 'Some fields are missing';
        errorText.style.color = 'red';
    }
  });

