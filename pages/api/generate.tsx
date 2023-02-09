import { filter } from "@chakra-ui/react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type OpenAIReq = {
  method: String;
  headers: {
    "Content-Type": String;
  };
  body: {
    city: String;
    filters?: String[];
  };
};

export default async function (req: OpenAIReq, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const city = req.body.city || "";
  if (city.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid city",
      },
    });
    return;
  }

  const filters = req.body.filters || [];

  try {
    const prompt = generatePrompt(city) + " " + addFilters(filters);
    console.log(prompt);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.3,
      max_tokens: 500,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(city: String): String {
  const sanitizedCity = city[0].toUpperCase() + city.slice(1).toLowerCase();
  return `Suggest some things to do in ${sanitizedCity}`;
}

function addFilters(filters: String[]): String {
  if (filters.length <= 0) {
    return "";
  }
  return filters.join(", ");
}
