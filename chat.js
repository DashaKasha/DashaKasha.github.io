// генерация случайного ответа на ключевые слова
function generateResponse(message) {
    const responses = {
        "привет": ["Привет!", "Здравствуй!", "Приветствую!"],
        "как дела?": ["Хорошо, спасибо!", "Отлично!", "Неплохо."],
        "что делаешь?": ["Отвечаю на сообщения.", "Читаю ваши вопросы.", "Общаюсь с вами."]
    };

    for (const keyword in responses) {
        if (message.toLowerCase().includes(keyword)) {
            const randomIndex = Math.floor(Math.random() * responses[keyword].length);
            return responses[keyword][randomIndex];
        }
    }

    return "Извините, не понял ваш вопрос.";
}

// добавление сообщения в чат
function addMessage(message, sender) {
    const chatMessages = document.getElementById("chat-messages");
    const messageElement = document.createElement("li");
    messageElement.textContent = message;
    messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// инициализация чата
function initChat() {
    const chatForm = document.getElementById("chat-container");
    const chatInput = document.getElementById("chat-message-input");

    chatForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Предотвращаем отправку формы
        const message = chatInput.value.trim();
        if (message !== "") {
            addMessage(message, "user");
            const botResponse = generateResponse(message);
            addMessage(botResponse, "bot");
            chatInput.value = "";
        }
    });
}

window.onload = function() {
    initChat();
};
