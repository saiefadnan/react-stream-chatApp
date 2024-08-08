import { fetchData } from "./fetchData.js";
import { authorization } from "./authorize.js";
document.getElementById('registerButton').addEventListener('click', async() => {
    const email = document.getElementById('emailInput').value;
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const profilePic = document.getElementById('profilePic');
    const errorText = document.getElementById('error-container').querySelector('legend');
    const profile = profilePic.files[0];
    const error = document.getElementById('error-container');
    if (username.trim() && email.trim() && password.trim() && profile) {
        const reader = new FileReader();
        reader.onload = async() => {
            const fileData = reader.result.split(',')[1];
            const reqData ={
                email: email,
                username: username,
                password: password,
                profile: { 
                    name: profile.name, 
                    data: fileData,
                    type: profile.type 
                }
            }
            const {signin,notify,token} = await fetchData('http://localhost:4000/api/signin',reqData);
            if(signin){
                username=
                error.style.display = 'block';
                errorText.textContent = notify
                errorText.style.color = 'green';
                localStorage.setItem('token',token);
                localStorage.setItem('email',email);
                await authorization(localStorage.getItem('token'));
            }
            else{
                error.style.display = 'block';
                errorText.textContent = notify
            }
        }
        reader.readAsDataURL(profile);
    }
    else if (username.trim() && email.trim() && password.trim()) {
        const reqData ={
            email: email,
            username: username,
            password: password,
            profile: false
        }
        const {signin,notify,picurl,token} = await fetchData('http://localhost:4000/api/signin',reqData);
        if(signin){
            error.style.display = 'block';
            errorText.textContent = notify
            errorText.style.color = 'green';
            localStorage.setItem('token',token);
            localStorage.setItem('email',email);
            await authorization(localStorage.getItem('token'));
        }
        else{
            error.style.display = 'block';
            errorText.textContent = notify
        }
    }
    else{
        error.style.display = 'block';
        errorText.textContent = 'Some fields are missing';
    }
  });
