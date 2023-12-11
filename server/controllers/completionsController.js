const { generateCompletion } = require("../openAi");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
// const API_KEY = `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`;

const completionsController = async (req, res) => {
  const { message } = req.body;
  try {
    const apiKey = process.env.API_KEY;
    // const apiKey = API_KEY;
    const data = await generateCompletion(apiKey, message);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  completionsController,
};
