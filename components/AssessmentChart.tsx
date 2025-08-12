'use client'

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AssessmentScores {
  [key: string]: string
}

interface AssessmentChartProps {
  scores: AssessmentScores
  className?: string
  size?: number
  strengthColor?: string
  flexibilityColor?: string
}

const skills = {
  strength: ["Handstand Push-Up", "Arching Squat", "Handstand"],
  flexibility: ["Front Splits", "Bridge", "Middle Split"]
}

export function AssessmentChart({ 
  scores, 
  className, 
  size = 400,
  strengthColor = "#ea580c", // Default orange
  flexibilityColor = "#0891b2" // Default teal
}: AssessmentChartProps) {
  const hasScores = Object.keys(scores).length > 0
  
  // Chart dimensions - more compact
  const centerX = size / 2
  const centerY = size / 2
  const maxRadius = size * 0.4 // 40% of total size for more compact layout
  
  // All skills in interleaved order (alternating strength and flexibility)
  // Based on the original image: Handstand Push-Up, Front Splits, Arching Squat, Bridge, Handstand, Middle Split
  const allSkills = [
    "Handstand Push-Up",    // Strength
    "Front Splits",         // Flexibility  
    "Arching Squat",        // Strength
    "Bridge",               // Flexibility
    "Handstand",            // Strength
    "Middle Split"          // Flexibility
  ]
  
  // Calculate angles for each skill (360 degrees / 6 skills = 60 degrees each)
  const angleStep = 360 / allSkills.length
  
  // Helper function to convert polar coordinates to cartesian
  const polarToCartesian = (angle: number, radius: number) => {
    const angleInRadians = (angle - 90) * (Math.PI / 180) // -90 to start at top
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }
  
  // Generate grid circles
  const gridCircles = [2, 4, 6, 8, 10].map(value => {
    const radius = (value / 10) * maxRadius
    return (
      <circle
        key={value}
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2,2"
        opacity="0.3"
      />
    )
  })
  
  // Generate axis lines and labels
  const axes = allSkills.map((skill, index) => {
    const angle = index * angleStep
    const endPoint = polarToCartesian(angle, maxRadius)
    const labelPoint = polarToCartesian(angle, maxRadius + size * 0.06) // Closer labels
    
    return (
      <g key={skill}>
        {/* Axis line */}
        <line
          x1={centerX}
          y1={centerY}
          x2={endPoint.x}
          y2={endPoint.y}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
        {/* Skill label */}
        <text
          x={labelPoint.x}
          y={labelPoint.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fill="currentColor"
          className="text-xs font-medium"
        >
          {skill.split(' ').map((word, i) => (
            <tspan key={i} x={labelPoint.x} dy={i === 0 ? 0 : "1.2em"}>
              {word}
            </tspan>
          ))}
        </text>
      </g>
    )
  })
  
  // Generate strength radar shape
  const strengthPath = React.useMemo(() => {
    if (!hasScores) return ""
    
    const strengthPoints = skills.strength.map((skill, index) => {
      const score = scores[skill] ? parseFloat(scores[skill]) : 0
      const skillIndex = allSkills.indexOf(skill)
      const angle = skillIndex * angleStep
      const radius = (score / 10) * maxRadius
      return polarToCartesian(angle, radius)
    })
    
    if (strengthPoints.length === 0) return ""
    
    const pathData = strengthPoints.reduce((path, point, index) => {
      return path + (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`)
    }, "") + " Z"
    
    return pathData
  }, [scores, hasScores])
  
  // Generate flexibility radar shape
  const flexibilityPath = React.useMemo(() => {
    if (!hasScores) return ""
    
    const flexibilityPoints = skills.flexibility.map((skill, index) => {
      const score = scores[skill] ? parseFloat(scores[skill]) : 0
      const skillIndex = allSkills.indexOf(skill)
      const angle = skillIndex * angleStep
      const radius = (score / 10) * maxRadius
      return polarToCartesian(angle, radius)
    })
    
    if (flexibilityPoints.length === 0) return ""
    
    const pathData = flexibilityPoints.reduce((path, point, index) => {
      return path + (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`)
    }, "") + " Z"
    
    return pathData
  }, [scores, hasScores])
  
  // Data points removed as requested

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center">My Acro Avatar</CardTitle>
      </CardHeader>
      <CardContent>
        {hasScores ? (
          <div className="flex flex-col items-center space-y-3 w-full">
            <div className="w-full max-w-md aspect-square flex items-center justify-center">
              <svg 
                width="100%" 
                height="100%" 
                viewBox={`0 0 ${size + 40} ${size + 40}`}
                className="overflow-visible"
              >
                <g transform="translate(20, 20)">
                  {/* Grid circles */}
                  {gridCircles}
                  
                  {/* Axis lines and labels */}
                  {axes}
                  
                  {/* Strength radar area */}
                  {strengthPath && (
                    <path
                      d={strengthPath}
                      fill={strengthColor}
                      fillOpacity="0.25"
                      stroke={strengthColor}
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  )}
                  
                  {/* Flexibility radar area */}
                  {flexibilityPath && (
                    <path
                      d={flexibilityPath}
                      fill={flexibilityColor}
                      fillOpacity="0.25"
                      stroke={flexibilityColor}
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  )}
                </g>
              </svg>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: strengthColor }}
                />
                <span className="text-sm font-medium">Strength</span>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: flexibilityColor }}
                />
                <span className="text-sm font-medium">Flexibility</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md aspect-square flex items-center justify-center text-muted-foreground mx-auto">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">No assessment data available</p>
              <p className="text-sm">Complete your assessment to see your Acro Avatar</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
