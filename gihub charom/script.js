const username = localStorage.getItem('loggedInUser');
if (!username) window.location.href = 'login.html';
document.getElementById('username').innerText = username;

const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');

async function loadMessages() {
  const res = await fetch('https://codo09090.pythonanywhere.com/messages');
  const messages = await res.json();
  chatBox.innerHTML = messages.map(m => `<p><b>${m.user}:</b> ${m.text}</p>`).join('');
}
setInterval(loadMessages, 2000); // Poll every 2 seconds
loadMessages();

form.onsubmit = async (e) => {
  e.preventDefault();
  const message = document.getElementById('message').value;
  if (!message) return;
  await fetch('https://codo09090.pythonanywhere.com/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: username, text: message })
  });
  document.getElementById('message').value = '';
};
