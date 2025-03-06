"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Define the structure for a trivia question
export interface TriviaQuestion {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

// Define props interface
interface TriviaQuizProps {
  question: TriviaQuestion
  onNextQuestion?: () => void
}

export default function TriviaQuiz({ question , onNextQuestion }: TriviaQuizProps) {
  // State for selected answer and whether to show feedback
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // Check if the selected answer is correct
  const isCorrect = selectedAnswer === question.correctAnswer

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
  }

  // Handle next question request
  const handleNextQuestion = () => {
    // Reset the component state
    setSelectedAnswer(null)
    setShowFeedback(false)

    // Notify parent component to provide a new question
    if (onNextQuestion) {
      onNextQuestion()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-primary/10 border-b rounded-xl p-4">
        <CardTitle className="text-xl">Trivia Question</CardTitle>
        <CardDescription>Test your knowledge!</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const optionLabel = String.fromCharCode(97 + index) // Convert 0, 1, 2, 3 to a, b, c, d
              const isSelected = option === selectedAnswer

              let buttonVariant: "outline" | "default" | "secondary" | "destructive" | "ghost" | "link" | null =
                "outline"

              if (showFeedback) {
                if (option === question.correctAnswer) {
                  buttonVariant = "default"
                } else if (isSelected) {
                  buttonVariant = "ghost"
                }
              }

              return (
                <Button
                  key={option}
                  variant={buttonVariant}
                  className={`w-full justify-start text-left text-white ${
                    showFeedback && option === question.correctAnswer
                      ? "border-green-500 bg-green-400 hover:bg-green-100"
                      : ""
                  } ${
                    showFeedback && isSelected && option !== question.correctAnswer
                      ? "border-red-500 bg-red-400 hover:bg-red-100 "
                      : ""
                  }`}
                  onClick={() => !showFeedback && handleAnswerSelect(option)}
                  disabled={showFeedback}
                >
                  <span className="mr-2 font-mono">{optionLabel})</span> {option}
                  {showFeedback && option === question.correctAnswer && (
                    <Check className="ml-auto h-4 w-4 text-white" />
                  )}
                  {showFeedback && isSelected && option !== question.correctAnswer && (
                    <X className="ml-auto h-4 w-4 text-white" />
                  )}
                </Button>
              )
            })}
          </div>
        </div>

        {showFeedback && (
          <div className={`p-4 rounded-lg mb-4 ${isCorrect ? "bg-green-400 text-green-900" : "bg-red-400 text-red-900"}`}>
            <p className="font-medium mb-1">{isCorrect ? "Correct!" : "Incorrect!"}</p>
            <p>{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/20">
        {!showFeedback && <p className="text-sm text-muted-foreground">Select an answer to see if you're correct!</p>}
      </CardFooter>
    </Card>
  )
}

