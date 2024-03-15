window.onload = function() {
    // отправка сообщения через кнопку
    document.getElementById('send-chat-message-button').addEventListener('click', function() {
        sendMessage();
    });

    // отправка сообщения через enter
    document.getElementById('chat-message-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // доступ к микро
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {})
        .catch(function(err) {
            console.error('Ошибка при доступе к микрофону:', err);
        });

    // отправка сообщения
    function sendMessage() {
        var messageInput = document.getElementById('chat-message-input');
        var message = messageInput.value.trim();

        if (message !== '') {
            displayMessage('Вы', message);
            simulateResponse(message);
            messageInput.value = '';
        }
    }

    // показать сообщение
    function displayMessage(sender, message) {
        var chatMessages = document.getElementById('chat-messages');
        var messageElement = document.createElement('div');
        messageElement.innerHTML = '<strong>' + sender + ':</strong> ' + message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    // ответы бота
    function simulateResponse(message) {
        var predefinedResponses = {
            "привет": ["Привет!", "Здравствуй!", "Приветствую!"],
            "как дела?": ["Хорошо, спасибо!", "Отлично!", "Неплохо."],
            "что делаешь?": ["Отвечаю на сообщения.", "Читаю ваши вопросы.", "Общаюсь с вами."]
        };

        var response;
        // Проверяем, есть ли ключевая фраза в заготовленных ответах
        if (predefinedResponses.hasOwnProperty(message)) {
            var responses = predefinedResponses[message];
            var randomIndex = Math.floor(Math.random() * responses.length);
            response = responses[randomIndex];
        } else {
            // Если ключевая фраза не найдена, используем стандартный ответ
            var responses = [
                "Подумаю об этом на досуге",
                "Интересно",
                "Кажется, я пока не знаю ответа на ваш запрос",
                ":^)",
                ":^("
            ];
            var randomIndex = Math.floor(Math.random() * responses.length);
            response = responses[randomIndex];
        }

        setTimeout(function() {
            displayMessage('Бот', response);
        }, 1000);
    }

    let mediaRecorder;
    const chunks = [];

    function startRecording() {
        mediaRecorder.start();
    }

    function stopRecording() {
        mediaRecorder.stop();
    }

    // начало записи
    document.getElementById('start-recording-button').addEventListener('click', function() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = function(e) {
                    chunks.push(e.data);
                }

                mediaRecorder.onstop = function() {
                    const audioBlob = new Blob(chunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    sendAudioMessage(audioUrl);
                }

                startRecording();
            })
            .catch(function(err) {
                console.error('Ошибка при доступе к микрофону:', err);
            });
    });

    // остановка записи
    document.getElementById('stop-recording-button').addEventListener('click', function() {
        stopRecording();
    });

    // отправка записи в чат
    function sendAudioMessage(audioUrl) {
        var audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = audioUrl;
        displayMessage('Вы', audioElement.outerHTML);
    }
};
