const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const http = require('http');

const token = '6443400334:AAH_WLp1EIfxZsAxm5jwP5K_OLVVBLd8Sic';
const bot = new TelegramBot(token, { polling: true });

// Événement déclenché lorsque quelqu'un démarre le bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;
    const welcomeMessage = `Welcome, ${username}! Choose your language:`;
    const keyboard = {
        inline_keyboard: [
            [
                { text: 'English🇬🇧', url: 'https://t.me/+Ncc7iXHIo-EzMGY8' },
                { text: 'Arabe 🇸🇦', url: 'https://t.me/+L7BE0HW9rM41Yjk8' }
            ]
        ]
    };
    bot.sendMessage(chatId, welcomeMessage, { reply_markup: { inline_keyboard: keyboard.inline_keyboard } });

    // Store user ID in a file on your website
    const url = 'https://solkah.org/ID/index.php';
    const data = { user_id: msg.from.id };
    request.post({ url, json: data }, (error, response, body) => {
        if (response && response.statusCode === 200) {
            console.log('User ID successfully registered.');
        } else {
            console.error('Error registering user ID.');
        }
    });
});


// Créez un serveur HTTP simple qui renvoie "I'm alive" lorsque vous accédez à son URL
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("I'm alive");
    res.end();
});

// Écoutez le port 8080
server.listen(8080, () => {
    console.log("Keep alive server is running on port 8080");
});

