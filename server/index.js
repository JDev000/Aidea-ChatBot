const express = require('express');
const app = express();
const { readFileSync } = require('fs');
const login = require("facebook-chat-api");

// Server logic
app.use('/', (req, res) => {
    res.send("Server is running...");
});

app.listen(5000, () => {
    console.log("Server running on PORT 5000");
});

// API logic
const loginPath = { appState: JSON.parse(readFileSync(__dirname + "/appstate.json", "utf-8")) };

login(loginPath, (err, api) => {
    if (err) return console.error(err);

    api.listenMqtt((error, message) => {
        if (error) return console.error(error);

        // api.sendMessage(message.body, message.threadID, message.messageID);

        if (message.body == "hi") {
            api.sendMessage("How's your day?", message.threadID, message.messageID);
        }
    });
});
