import { z } from "zod"

// Define valid weather conditions
const VALID_WEATHER_CONDITIONS = [
  "Sunny",
  "Clear",
  "Partly Cloudy",
  "Cloudy",
  "Overcast",
  "Rainy",
  "Light Rain",
  "Heavy Rain",
  "Drizzle",
  "Thunderstorm",
  "Snowy",
  "Light Snow",
  "Heavy Snow",
  "Foggy",
  "Misty",
  "Windy",
] as const

// Define valid wind directions
const VALID_WIND_DIRECTIONS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
] as const

// Define valid days of the week
const VALID_DAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const

// Schema for forecast item
export const forecastItemSchema = z.object({
  day: z
    .enum(VALID_DAYS, {
      errorMap: () => ({ message: "Day must be a valid day of the week" }),
    })
    .describe("Day of the week (abbreviated or full name)"),

  temperature: z
    .number()
    .min(-100, "Temperature cannot be below -100°")
    .max(100, "Temperature cannot be above 100°")
    .describe("Forecast temperature for this day"),

  condition: z
    .enum(VALID_WEATHER_CONDITIONS, {
      errorMap: () => ({ message: "Must be a valid weather condition" }),
    })
    .describe("Weather condition for this day (sunny, cloudy, etc.)"),
})

// Schema for weather card props
export const weatherCardSchema = z.object({
  // Required fields with stricter validation
  temperature: z
    .number()
    .min(-100, "Temperature cannot be below -100°")
    .max(100, "Temperature cannot be above 100°")
    .describe("Current temperature value"),

  unit: z
    .enum(["C", "F"], {
      errorMap: () => ({ message: "Unit must be either 'C' or 'F'" }),
    })
    .describe("Temperature unit (Celsius or Fahrenheit)"),

  condition: z
    .enum(VALID_WEATHER_CONDITIONS, {
      errorMap: () => ({ message: "Must be a valid weather condition" }),
    })
    .describe("Current weather condition (sunny, cloudy, rainy, etc.)"),

  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location name is too long")
    .describe("Location name (city, region, etc.)"),

  // Optional fields with improved validation
  date: z
    .union([z.date(), z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date string format" })])
    .optional()
    .default(new Date())
    .describe("Current date (Date object or ISO string)"),

  humidity: z
    .number()
    .min(0, "Humidity cannot be negative")
    .max(100, "Humidity cannot exceed 100%")
    .optional()
    .default(0)
    .describe("Humidity percentage (0-100)"),

  windSpeed: z
    .number()
    .min(0, "Wind speed cannot be negative")
    .max(500, "Wind speed is unrealistically high")
    .optional()
    .default(0)
    .describe("Wind speed in km/h"),

  windDirection: z
    .enum(VALID_WIND_DIRECTIONS, {
      errorMap: () => ({ message: "Must be a valid wind direction (N, NE, E, etc.)" }),
    })
    .optional()
    .default("N")
    .describe("Wind direction using compass points (N, NE, E, SE, etc.)"),

  forecast: z
    .array(forecastItemSchema)
    .max(7, "Forecast cannot exceed 7 days")
    .optional()
    .default([])
    .describe("Array of forecast data for upcoming days (max 7 days)"),
})

// Export the valid conditions as a type
export type ValidWeatherCondition = z.infer<typeof weatherCardSchema.shape.condition>
export type ValidWindDirection = z.infer<typeof weatherCardSchema.shape.windDirection>
export type ValidDay = z.infer<typeof forecastItemSchema.shape.day>

// Type for weather card props
export type WeatherCardProps = z.infer<typeof weatherCardSchema>

// Helper function to validate props
export function validateWeatherCardProps(props: unknown) {
  return weatherCardSchema.parse(props)
}

// Helper function to safely validate props (returns result object instead of throwing)
export function safeValidateWeatherCardProps(props: unknown) {
  return weatherCardSchema.safeParse(props)
}

// Helper function to get all valid weather conditions
export function getValidWeatherConditions(): readonly string[] {
  return VALID_WEATHER_CONDITIONS
}

// Helper function to get all valid wind directions
export function getValidWindDirections(): readonly string[] {
  return VALID_WIND_DIRECTIONS
}

// Helper function to get all valid days
export function getValidDays(): readonly string[] {
  return VALID_DAYS
}

