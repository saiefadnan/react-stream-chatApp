const socket = io('http://localhost:4000');
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('popstate', (event) => {
    window.location.href = '/login'
  })
});

console.log('hello',localStorage.getItem('email'));
function sendMessage(){
  const recipient = document.getElementById('recipientInput').value;
    const message = document.getElementById('messageInput').value;
    if(recipient.trim() && message.trim() && recipient==='public'){
      socket.emit('public message', message);
      addMessageTo(`Me (public): ${message}`,new Date(Date.now()).toLocaleString()) ;
      document.getElementById('messageInput').value = '';
    }
    else if (recipient.trim() && message.trim()) {
      socket.emit('private message', { to: recipient, message });
      addMessageTo(`Me (${recipient}): ${message}`,new Date(Date.now()).toLocaleString()) ;
      document.getElementById('messageInput').value = '';
    }
    const fileinput = document.getElementById('fileInput');
    const file = fileinput.files[0];
    if(file && recipient.trim() && recipient==='public') {
        const reader = new FileReader();
        reader.onload = () => {
            const fileData = reader.result;
            if (file.type.startsWith('image/')) {
                socket.emit('public image', {fileData });
                addImageTo(recipient, fileData);
            } else if (file.type.startsWith('video/')) {
                console.log('video..');
                socket.emit('public video', {fileData });
                addVideoTo(recipient, fileData);
            } else {
                socket.emit('public file', {fileData ,fileName: file.name});
                addFileTo(recipient, fileData, file.name);
            }
            };
            reader.readAsDataURL(file);
            document.getElementById('fileInput').value = '';
    }
    else if(file && recipient.trim()) {
        const reader = new FileReader();
        reader.onload = () => {
            const fileData = reader.result;
            if (file.type.startsWith('image/')) {
                socket.emit('private image', { to: recipient, fileData });
                addImageTo(recipient, fileData);
            } else if (file.type.startsWith('video/')) {
                socket.emit('private video', { to: recipient, fileData });
                addVideoTo(recipient, fileData);
            } else {
                socket.emit('private file', { to: recipient, fileData ,fileName: file.name});
                addFileTo(recipient, fileData, file.name);
            }
        };
        reader.readAsDataURL(file);
        document.getElementById('fileInput').value = '';
    }
}

  document.getElementById('sendButton').addEventListener('click',sendMessage);
  document.getElementById('messageInput').addEventListener('keydown', (event) => {
    console.log('enter........');
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

  socket.on('private message', ({ from, time, message, profile }) => {
    const date = new Date(time).toLocaleString();
    addMessage(`${from}: ${message}`, date, profile) ;
  });


  socket.on('public message', ({ from, time, message, profile  }) => {
    const date = new Date(time).toLocaleString();
    addMessage(`${from} (public): ${message}`, date, profile) ;
  });

  socket.on('private image',({from,time,fileData, profile  })=>{
    addImage(from,fileData,profile) ;
  })

  socket.on('public image',({from,time,fileData, profile  })=>{
    addImage(from,fileData,profile) ;
  })

  socket.on('private video',({from,time,fileData, profile  })=>{
    addVideo(from,fileData,profile) ;
  })

  socket.on('public video',({from,time,fileData, profile  })=>{
    addVideo(from,fileData,profile) ;
  })

  socket.on('private file',({from,time,fileData,fileName, profile  })=>{
    addFile(from,fileData,fileName,profile);
  })
  socket.on('public file',({from,time,fileData,fileName, profile })=>{
    addFile(from,fileData,fileName,profile);
  })
  socket.on('error', ({error}) => {
    addError(`${error}`) ;
  });

  socket.on('notify',({notify,picture})=>{
    addNotify(notify);
    addPicture(picture);
    // if(login)window.location.href = '/chat';
  });

  socket.on('profilePicture',({picture})=>{
    addPicture(picture);
  })

  socket.on('activeUsers',({activeUsers, profile})=>{
    const activeBar = document.getElementById('active');
    activeUsers.push('public');
    profile.push('https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600');
    activeBar.innerHTML = ''; 
    activeUsers.forEach((name, index) => {
        const userDiv = document.createElement('div');
        const profileDiv = document.createElement('img');
        const profileUrl = profile[index];
        console.log(profileUrl);
        userDiv.style.height = '80px';
        userDiv.style.width = '80%';
        if(name!=='public') userDiv.style.backgroundColor = 'cadetblue';
        else userDiv.style.backgroundColor = 'crimson';
        userDiv.style.display = 'flex';
        userDiv.style.alignItems = 'center';
        userDiv.style.justifyContent = 'space-between';
        userDiv.style.border = '1px solid black'
        userDiv.style.borderRadius = '10px';
        userDiv.style.padding = '0 20px';
        userDiv.textContent = name;
        userDiv.style.marginTop ='10px';
        userDiv.style.fontWeight = 'bold';

        profileDiv.src=profileUrl;
        profileDiv.className = 'profile-container';

        userDiv.addEventListener('mouseover', () => {
            userDiv.style.backgroundColor = 'rgb(55, 88, 89)';
            userDiv.style.cursor = 'pointer';
        });
        userDiv.addEventListener('click', () => {
            document.getElementById('recipientInput').value=`${name}`;
        });
        userDiv.addEventListener('mouseout', () => {
            if(name!=='public')userDiv.style.backgroundColor = 'cadetblue';
            else userDiv.style.backgroundColor = 'crimson';
        });
        userDiv.appendChild(profileDiv);
        activeBar.appendChild(userDiv);
        activeBar.scrollTop = activeBar.scrollHeight;
    });
  });


function addImageTo(to, imageData){
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.style.padding = '8px';
    messageElement.style.margin = '10px';
    messageElement.style.textAlign = 'left';
    messageElement.style.width = '50%';
    messageElement.style.marginLeft = '70%';
    messageElement.innerHTML = `<strong>Me (${to}):</strong><br><img src="${imageData}" alt="Image" style="max-width: 200px; max-height: 200px;">`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    //at ${new Date(time).toLocaleTimeString()}
}


function addImage(from, imageData,profile){
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    const profileDiv = document.createElement('img');
    const messageContainer = document.createElement('div');
    messageElement.innerHTML = `<strong>${from}:</strong><br><img src="${imageData}" alt="Image" style="max-width: 200px; max-height: 200px;">`;

    profileDiv.src=profile;
    profileDiv.className = 'profile-container';

    messageContainer.style.width = '50%';
    messageContainer.appendChild(profileDiv);
    messageContainer.appendChild(messageElement);
    messageContainer.style.display = 'flex';
    messageContainer.style.justifyContent = 'center';
    messageContainer.style.alignItems = 'center';
    messageElement.style.width= '95%';
    messagesDiv.appendChild(messageContainer);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    //at ${new Date(time).toLocaleTimeString()}
}


function addVideoTo(to, videoData) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.style.padding = '8px';
    messageElement.style.margin = '10px';
    messageElement.style.textAlign = 'left';
    messageElement.style.width = '50%';
    messageElement.style.marginLeft = '70%';
    messageElement.innerHTML = `<strong>Me (${to}):</strong><br><video controls style="max-width: 200px; max-height: 200px;">
                            <source src="${videoData}" type="video/mp4">
                            Your browser does not support the video tag.
                          </video>`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addVideo(to, videoData, profile) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    const profileDiv = document.createElement('img');
    const messageContainer = document.createElement('div');
    messageElement.innerHTML = `<strong>To ${to}:</strong><br><video controls style="max-width: 200px; max-height: 200px;">
                            <source src="${videoData}" type="video/mp4">
                            Your browser does not support the video tag.
                          </video>`;
    profileDiv.src=profile;
    profileDiv.className = 'profile-container';
                      
    messageContainer.style.width = '50%';
    messageContainer.appendChild(profileDiv);
    messageContainer.appendChild(messageElement);
    messageContainer.style.display = 'flex';
    messageContainer.style.justifyContent = 'center';
    messageContainer.style.alignItems = 'center';
    messageElement.style.width= '95%';
    messagesDiv.appendChild(messageContainer);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


function addFile(to, fileData, fileName, profile) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    const profileDiv = document.createElement('img');
    const messageContainer = document.createElement('div');
    messageElement.innerHTML = `<strong>${to}:</strong><br><a href="${fileData}" download="${fileName}">${fileName}</a>`;

    profileDiv.src=profile;
    profileDiv.className = 'profile-container';
                      
    messageContainer.style.width = '50%';
    messageContainer.appendChild(profileDiv);
    messageContainer.appendChild(messageElement);
    messageContainer.style.display = 'flex';
    messageContainer.style.justifyContent = 'center';
    messageContainer.style.alignItems = 'center';
    messageElement.style.width= '95%';
    messagesDiv.appendChild(messageContainer);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addFileTo(to, fileData, fileName) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.style.padding = '8px';
    messageElement.style.margin = '10px';
    messageElement.style.textAlign = 'left';
    messageElement.style.width = '50%';
    messageElement.style.marginLeft = '70%';
    messageElement.innerHTML = `<strong>Me (${to}):</strong><br><a href="${fileData}" download="${fileName}">${fileName}</a>`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


function addMessage(message, time, profile) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    const profileDiv = document.createElement('img');
    const timeDiv = document.createElement('p');
    const messageContainer = document.createElement('div');
    const finalContainer = document.createElement('div');

    messageElement.textContent = message;
    messageElement.className="message-receive";
    timeDiv.textContent=time;
    timeDiv.className = 'time-container';
    profileDiv.src=profile;
    profileDiv.className = 'profile-container';

    messageContainer.className = 'message-container';
    messageContainer.appendChild(profileDiv);
    messageContainer.appendChild(messageElement);

    finalContainer.className ='final-container';
    finalContainer.appendChild(timeDiv);
    finalContainer.appendChild(messageContainer);

    messagesDiv.appendChild(finalContainer);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  function addMessageTo(message,time) {
      const messagesDiv = document.getElementById('messages');
      const messageElement = document.createElement('div');
      const timeDiv = document.createElement('p');
      const messageContainer = document.createElement('div');
      const finalContainer = document.createElement('div');

      messageElement.textContent = message;
      messageElement.className="message-send";
      timeDiv.textContent=time;
      timeDiv.className = 'time-container';

      messageContainer.className = 'message-container';
      messageContainer.appendChild(messageElement);

      finalContainer.className ='final-container';
      finalContainer.appendChild(timeDiv);
      finalContainer.style.marginLeft = '50%'
      finalContainer.appendChild(messageContainer);

      messagesDiv.appendChild(finalContainer);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
function addNotify(message) {
    const notifyDiv = document.getElementById('info');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = 'notify';
    notifyDiv.appendChild(messageElement);
    notifyDiv.scrollTop = notifyDiv.scrollHeight;
  }

function addError(message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = 'error';
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  function addPicture(picture){
    const profileDiv = document.getElementById('profileDiv').querySelector('img');
    if(picture){
        profileDiv.src=picture;
        console.log('picc');
    }
  }