const socket = io();

let userName;

// Prompt user for name
while (!userName) {
    userName = prompt('Please enter your name:');
}

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (message) {
        // Send message along with user's name
        socket.emit('chat message', { message, sender: userName }); // Send both message and sender's name
        input.value = '';
    }
});

socket.on('chat message', (data) => {
    const { message, sender } = data;

    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');

    // Create sender name element
    const senderName = document.createElement('div');
    senderName.textContent = sender; // Set sender's name
    senderName.classList.add('sender');

    // Create message content element
    const messageContent = document.createElement('div');
    messageContent.textContent = message; // Set message content
    messageContent.classList.add('content');

    // Append sender name and message content to message container
    messageContainer.appendChild(senderName);
    messageContainer.appendChild(messageContent);

    // Add message container to messages section
    messages.appendChild(messageContainer);

    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
});
