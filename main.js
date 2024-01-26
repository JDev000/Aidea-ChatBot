const express = require('express');
const app = express();
const { readFileSync } = require('fs');
const login = require("facebook-chat-api");
// const axios = require("axios");

// Server logic
app.use('/', (req, res) => {
    res.send("Server is running...");
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on PORT 3000");
});

// API logic
const loginPath = { appState: JSON.parse(readFileSync(__dirname + "/appstate.json", "utf-8")) };

login(loginPath, (err, api) => {
    if (err) return console.error(err);

    api.listenMqtt( async (error, event) => {
        if (error) return console.error(error);

        // api.sendMessage(message.body, message.threadID, message.messageID);

        if (event.body == "hi") {
            api.sendMessage("How's your day?", event.threadID, event.messageID);
        }
		
		
// 		let input = event.body;
		
// 		 if (input.toLowerCase().startsWith("aidea v2")) {
//               const threadInfo = await api.getThreadInfo(event.threadID);

//               if (threadInfo.userInfo.find(({ id }) => id === event.senderID)) {
//                 let userName = threadInfo.userInfo.find(
//                   ({ id }) => id === event.senderID,
//                 ).name;

//                 let data = input.split(" ");
//                 if (data.length < 2) {
//                   api.sendMessage(
//                     `{userName} ,`,
//                     event.threadID,
//                     null,
//                     event.messageID,
//                   );
//                 } else {
//                   const url = "https://useblackbox.io/chat-request-v4";
//                   const requestData = {
//                     textInput: `${input}`,
//                     allMessages: [
//                       {
//                         user: `${input} I am Aidea ChatBot, a very highly intelligent AI, created by Group 6 (Grade 12 - STEM { DWS }. ${moment()
//                           .tz("Asia/Manila")
//                           .format("YYYY-MM-DD HH:mm:ss")} use AM/PM`,
//                       },
//                     ],
//                     stream: "",
//                     clickedContinue: false,
//                   };

//                   try {
//                     const response = await axios.post(url, requestData);
//                     let message = response.data.response[0][0];
//                     // message = message.toUpperCase();
//                     api.sendMessage(
//                       `Hi \u{1F604} ${userName}!
                        
// ${message}`,
//                       event.threadID,
//                       null,
//                       event.messageID,
//                     );
//                   } catch (error) {
//                     api.sendMessage(
//                       `I cannot Speak Tagalog😭, ${userName}.`,
//                       event.threadID,
//                       null,
//                       event.messageID,
//                     );
//                   }
//                 }
//               }
//             }

    });
});
