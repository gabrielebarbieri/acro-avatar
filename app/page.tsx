'use client'

import { db } from '@/db/instant'
import { Assessment } from '@/components/Assessment'

function App() {
  // Use Instant's `useQuery()` hook to get the todos
  const { isLoading, error, data } = db.useQuery({ todos: {} })
  
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
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="tracking-wide text-5xl font-extrabold">Acro Avatar</h1>
          <p className="text-muted-foreground text-lg">
            Assess your acrobatic skills and track your progress
          </p>
        </div>
        <Assessment />
      </div>
    </div>
  )
}

export default App