import { weatherCardSchema } from '@/schemas/weather-card-schema';
import { tool } from 'ai';
import { z } from 'zod';

export const profileInformationTool = tool({
  description:
    'Display a card with the user profile information. Example usage: { name: "John Doe", dateOfBirth: "01/01/2000" }',

  parameters: z.object({
    name: z.string().describe("The user's name"),
    dateOfBirth: z.string().describe("The user's date of birth"),
  }),

  execute: async function({ name, dateOfBirth }) {
    return { name, dateOfBirth };
  },
});

export const triviaQuestionTool = tool({
  description: "Display a trivia question with multiple choice options and an explanation of the correct answer.",

  parameters:
    z.object({
      question: z.string().describe("The question to display"),
      options: z.array(z.string()).min(2).max(4).describe("The multiple choice options"),
      correctAnswer: z.string().describe("The correct answer"),
      explanation: z.string().describe("An explanation of the correct answer"),
    })
  ,

  execute: async function(question) {
    return { question };
  }
})

export const displayWeatherTool = tool({
  description: "Display the current weather information for a given location.",

  parameters: weatherCardSchema,

  execute: async function({ temperature, unit, condition, location, date, humidity, windSpeed, windDirection, forecast }) {
    return { temperature, unit, condition, location, date, humidity, windSpeed, windDirection, forecast };
  }
})

export const tools = {
  displayProfileInformation: profileInformationTool,
  displayTriviaQuestion: triviaQuestionTool,
  displayWeather: displayWeatherTool,
};
