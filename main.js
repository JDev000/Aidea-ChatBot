const express = require("express");
const app = express();
const { readFileSync } = require("fs");
const login = require("facebook-chat-api");
const axios = require("axios");

const prefix = "aidea";

// Set up Google Generative AI
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const mySecret = process.env["API_KEY"];
const genAI = new GoogleGenerativeAI(mySecret);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Server logic
app.use("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on PORT 3000");
});

// API logic
const loginPath = {
  appState: JSON.parse(readFileSync(__dirname + "/appstate.json", "utf-8")),
};

login(loginPath, (err, api) => {
  if (err) return console.error(err);

  api.listenMqtt(async (error, event) => {
    if (error) return console.error(error);

    // Assuming event is defined somewhere in your code
    if (event.body.startsWith(prefix)) {
      // Extract the user's request from the input
      const userRequest = event.body.substring(prefix.length).trim();

      // Use the user's request to generate content
      const result = await model.generateContent(userRequest);
      const response = await result.response;
      const text = response.text();

      api.sendMessage(text, event.threadID, event.messageID);
    }
  });
});
