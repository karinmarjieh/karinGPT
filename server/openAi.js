const generateCompletion = async (apiKey, message) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 100,
    }),
  };

  try {
    // Dynamic import for ES module
    const fetch = (await import("node-fetch")).default;

    const response = await fetch(
      "https://api.openai.com/v1/completions",
      options
    );
    return await response.json();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateCompletion,
};
