const socket = io()

let user_name;


do{
    user_name = prompt('Please enter your name :) ... ');
}while(!user_name);

console.log(user_name);

const textArea = document.querySelector("#text_area");
const msgArea = document.querySelector(".chat_area");

const appendMessage = (msg, type)=>{
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className);
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message} </p>
    `;

    mainDiv.innerHTML = markup;
    msgArea.appendChild(mainDiv);
    textArea.value = "";
}

const sendMessage = (msg)=>{
    let userInfo = {
        user : user_name,
        message: msg
    }
    // Append the msg
    appendMessage(userInfo, 'outgoing')

    // send to server via websocket connection
    socket.emit('message',userInfo);

}

textArea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
});

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
});