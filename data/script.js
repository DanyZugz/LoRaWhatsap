const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message');
const charCounter = document.getElementById('char-counter');

const socket = new WebSocket('ws://' + location.hostname + ':80/ws');

socket.onopen = (oevent) => {
  socket.onmessage =  (event) => {
    const messageincoming = event.data;
    const messageElem = document.createElement('p');
    messageElem.textContent = messageincoming;

    messageElem.classList.add('message');
    messageElem.classList.add('message-incoming');

    chatMessages.appendChild(messageElem);

    // Scroll chat window to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
}

messageInput.addEventListener('input', function() {
  const message = messageInput.value;

  if (message.length > 200) {
    messageInput.value = message.slice(0, 200); // Limita el texto a los primeros 200 caracteres
    // Alternativamente, puedes mostrar un mensaje de error al usuario
    // console.log("Se ha excedido el límite de caracteres");
  }
  charCounter.textContent = `${messageInput.value.length}/200`; // Nueva línea


  
});






//listener del formulario
chatForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let message = chatForm.elements['message'].value;
  socket.send(message);
  chatForm.elements['message'].value = '';


  if (message.trim() === '') {
    return;
   }

  const newMessage = document.createElement('p');
  newMessage.textContent = message;

  // Add classes based on message type
  newMessage.classList.add('message');
  newMessage.classList.add('message-outgoing'); // Assuming it's an outgoing message

// Creating a new element to hold the timestamp
  const timeStamp = document.createElement('small');
  timeStamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timeStamp.classList.add('timestamp');


  // Adding the timestamp to the new message
  newMessage.appendChild(timeStamp);
  


  chatMessages.appendChild(newMessage);



   // message = '';
  // Scroll chat window to the bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
});