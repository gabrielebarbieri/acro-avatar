'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const skills = {
  strength: ["Handstand Push-Up", "Arching Squat", "Handstand"],
  flexibility: ["Front Splits", "Bridge", "Middle Split"]
}

// Generate score options: 1, 1.5, 2, 2.5, ..., 9.5, 10
const scoreOptions = Array.from({ length: 19 }, (_, i) => 1 + (i * 0.5))

interface AssessmentProps {
  defaultScores: Record<string, string>
  onScoresChange?: (scores: Record<string, string>) => void 
  strengthColor?: string
  flexibilityColor?: string
}

export function Assessment({ defaultScores, onScoresChange }: AssessmentProps) {
  
  const [scores, setScores] = React.useState<Record<string, string>>(defaultScores)

  const handleScoreChange = (skill: string, value: string) => {
    const newScores = { ...scores, [skill]: value }
    setScores(newScores)
    onScoresChange?.(newScores)
  }

  const handleSubmit = () => {
    console.log('Assessment scores:', scores)
    // TODO: Add logic to save scores to database
  }

  const renderSkillRow = (skill: string) => (
    <div key={skill} className="flex items-center justify-between gap-3">
      <Label className="text-sm font-medium flex-1">{skill}</Label>
      <Select 
        value={scores[skill]} 
        onValueChange={(value) => handleScoreChange(skill, value)}
      >
        <SelectTrigger className="w-20 h-8">
          <SelectValue placeholder="0" />
        </SelectTrigger>
        <SelectContent>
          {scoreOptions.map(score => (
            <SelectItem key={score} value={score.toString()}>
              {score}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center">Enter Your Assessment Scores Here</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Strength</h3>
            <div className="space-y-2">
              {skills.strength.map(renderSkillRow)}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Flexibility</h3>
            <div className="space-y-2">
              {skills.flexibility.map(renderSkillRow)}
            </div>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full mt-4">
          Save Assessment
        </Button>
      </CardContent>
    </Card>
  )
}
