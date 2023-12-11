// // const API_KEY = `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`;
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRouter = require("./routes/chatRoute");
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
// const port = process.env.PORT || 8001;

// app.post("/completions", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: req.body.message }],
//       max_tokens: 100,
//     }),
//   };
//   try {
//     const response = await fetch("https://api.openai.com/v1/completions");
//     const data = await response.json();
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.listen(port, () => console.log("your server is running on port " + port));

// server.js
//  const app = require("./routes/chatRoute");
app.use("/api", chatRouter);
const port = process.env.PORT || 8001;

app.listen(port, () => console.log("Your server is running on port " + port));
