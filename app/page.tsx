'use client'

import { db } from '@/db/instant'
import { Assessment } from '@/components/Assessment'
import { AssessmentChart } from '@/components/AssessmentChart'
import { useState } from 'react'

function App() {
  // Use Instant's `useQuery()` hook to get the todos
  const { isLoading, error, data } = db.useQuery({ todos: {} })
  
  // State to store assessment scores for the radar chart
  const [assessmentScores, setAssessmentScores] = useState<Record<string, string>>({
    "Handstand Push-Up": "6.5",
    "Front Splits": "4.5",
    "Arching Squat": "6.5",
    "Bridge": "4",
    "Handstand": "6.5",
    "Middle Split": "6.5"
  })
  
  // Mock historical assessment data
  const historicalAssessments = [
    {
      date: "2024-01-15",
      scores: {
        "Handstand Push-Up": "2",
        "Front Splits": "3",
        "Arching Squat": "4",
        "Bridge": "2",
        "Handstand": "3",
        "Middle Split": "2"
      }
    },
    {
      date: "2024-02-15", 
      scores: {
        "Handstand Push-Up": "2.5",
        "Front Splits": "4",
        "Arching Squat": "5",
        "Bridge": "3",
        "Handstand": "3.5",
        "Middle Split": "3"
      }
    },
    {
      date: "2024-03-15",
      scores: {
        "Handstand Push-Up": "3",
        "Front Splits": "4.5",
        "Arching Squat": "6",
        "Bridge": "4",
        "Handstand": "4",
        "Middle Split": "3.5"
      }
    }
  ]
  
  if (isLoading) {
    return (
      <div className="-mt-16 min-h-screen flex justify-center items-center flex-col space-y-4">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 -mt-16 min-h-screen flex justify-center items-center flex-col space-y-4">
        Error: {error.message}
      </div>
    )
  }

  const { todos } = data

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="tracking-wide text-5xl font-extrabold">Acro Avatar</h1>
          <p className="text-muted-foreground text-lg">
            Assess your acrobatic skills and track your progress
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Assessment defaultScores={assessmentScores} onScoresChange={setAssessmentScores} />
          <AssessmentChart 
            scores={assessmentScores}
            historicalData={historicalAssessments}
          />
        </div>
      </div>
    </div>
  )
}

export default App