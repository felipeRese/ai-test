"use client"

import { useState, useEffect } from "react"
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  MapPin,
  Sun,
  Wind,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ValidWeatherCondition, WeatherCardProps } from "@/schemas/weather-card-schema"

export default function WeatherCard({
  temperature,
  unit,
  condition,
  location,
  date = new Date(),
  humidity = 0,
  windSpeed = 0,
  windDirection = "N",
  forecast = [],
}: WeatherCardProps) {
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    // Format the date
    const dateObj = date instanceof Date ? date : new Date(date)
    setFormattedDate(
      dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
    )
  }, [date])

  // Get the appropriate weather icon based on condition
  const getWeatherIcon = (condition: ValidWeatherCondition) => {
    const iconProps = { className: "h-10 w-10" }
    const lowerCondition = condition.toLowerCase()

    switch (true) {
      case lowerCondition.includes("sunny") || lowerCondition.includes("clear"):
        return <Sun {...iconProps} className="h-10 w-10 text-yellow-500" />
      case lowerCondition.includes("cloud") || lowerCondition.includes("overcast"):
        return <Cloud {...iconProps} className="h-10 w-10 text-gray-400" />
      case lowerCondition.includes("rain"):
        return <CloudRain {...iconProps} className="h-10 w-10 text-blue-400" />
      case lowerCondition.includes("drizzle"):
        return <CloudDrizzle {...iconProps} className="h-10 w-10 text-blue-300" />
      case lowerCondition.includes("snow"):
        return <CloudSnow {...iconProps} className="h-10 w-10 text-blue-100" />
      case lowerCondition.includes("fog") || lowerCondition.includes("mist"):
        return <CloudFog {...iconProps} className="h-10 w-10 text-gray-300" />
      case lowerCondition.includes("thunder"):
        return <CloudLightning {...iconProps} className="h-10 w-10 text-yellow-400" />
      default:
        return <Sun {...iconProps} className="h-10 w-10 text-yellow-500" />
    }
  }

  // Get background style based on weather condition
  const getBackgroundStyle = () => {
    const lowerCondition = condition.toLowerCase()

    switch (true) {
      case lowerCondition.includes("sunny") || lowerCondition.includes("clear"):
        return "bg-gradient-to-br from-blue-400 to-blue-600"
      case lowerCondition.includes("cloud") || lowerCondition.includes("overcast"):
        return "bg-gradient-to-br from-gray-300 to-gray-500"
      case lowerCondition.includes("rain") || lowerCondition.includes("drizzle"):
        return "bg-gradient-to-br from-blue-600 to-blue-800"
      case lowerCondition.includes("snow"):
        return "bg-gradient-to-br from-blue-100 to-blue-300"
      case lowerCondition.includes("fog") || lowerCondition.includes("mist"):
        return "bg-gradient-to-br from-gray-400 to-gray-600"
      case lowerCondition.includes("thunder"):
        return "bg-gradient-to-br from-gray-700 to-gray-900"
      default:
        return "bg-gradient-to-br from-blue-400 to-blue-600"
    }
  }

  return (
    <Card className={`w-full max-w-2xl overflow-hidden py-6 ${getBackgroundStyle()} text-white shadow-lg`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="font-medium">{location}</span>
          </div>
          <div className="text-sm opacity-90">{formattedDate}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6">
          <div className="mb-4 flex items-center justify-center">{getWeatherIcon(condition)}</div>
          <div className="mb-2 text-center w-full flex flex-col justify-center">
            <div className="text-5xl font-bold">
              {temperature}°{unit}
            </div>
            <div className="mt-1 text-xl capitalize">{condition}</div>
          </div>
          <div className="mt-4 w-full grid-cols-2 flex justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-200" />
              <span>{humidity}% Humidity</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5" />
              <span>
                {windSpeed} km/h {windDirection}
              </span>
            </div>
          </div>
        </div>

        {forecast && forecast.length > 0 && (
          <div className="mt-4 border-t border-white/20 pt-4 scrollbar-hide">
            <h3 className="mb-2 font-medium">Forecast</h3>
            <div className="flex justify-between overflow-x-auto">
              {forecast.map((item, index) => (
                <div key={index} className="flex flex-col items-center px-2 text-center">
                  <span className="text-sm">{item.day}</span>
                  <div className="my-1">{getWeatherIcon(item.condition)}</div>
                  <span className="text-sm font-medium">{item.temperature}°</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

