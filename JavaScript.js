


const token = '';
const chatId = '';

let sendTime = null;

const sendMessage = () => {
    const nameInput = document.getElementById('name');
    const idNumberInput = document.getElementById('id-number');
    const messageInput = document.getElementById('message');
    const name = nameInput.value;
    const idNumber = idNumberInput.value;
    const message = messageInput.value;

    const text = `Name: ${name}\nID Number: ${idNumber}\nMessage: ${message}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`;





    fetch(url)
        .then(response => {
            if (response.ok) {
                const statusMessage = document.getElementById('status-message');
                statusMessage.classList.remove('message-error');
                statusMessage.classList.add('message-success');
                statusMessage.textContent = 'Message sent successfully!';
                nameInput.value = '';
                idNumberInput.value = '';
                messageInput.value = '';
                sendTime = new Date();
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 2000);
            } else {
                const statusMessage = document.getElementById('status-message');
                statusMessage.classList.remove('message-success');
                statusMessage.classList.add('message-error');
                statusMessage.textContent = 'An error occurred while sending the message. Please try again later.';
            }
        })
        .catch(error => {
            const statusMessage = document.getElementById('status-message');
            statusMessage.classList.remove('message-success');
            statusMessage.classList.add('message-error');
            statusMessage.textContent = 'An error occurred while sending the message. Please try again later.';
            console.error(error);
        });
};

const checkTime = () => {
    if (sendTime) {
        const currentTime = new Date();
        const timeDiff = currentTime.getTime() - sendTime.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        if (hoursDiff > 24) {
            const messageContainer = document.getElementById('message-container');
            messageContainer.style.display = 'none';
            clearInterval(intervalId);
        }
    }
};

let intervalId = setInterval(checkTime, 10000);

document.getElementById('send-message').addEventListener('click', sendMessage);
