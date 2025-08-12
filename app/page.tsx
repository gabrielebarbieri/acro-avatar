'use client'

import { db } from '@/db/instant'
import { TodoForm, TodoList, ActionBar } from '@/components/todo'

function App() {
  // Use Instant's `useQuery()` hook to get the todos
  const { isLoading, error, data } = db.useQuery({ todos: {} })
  
  if (isLoading) {
    return (
      <div className="-mt-16 font-mono min-h-screen flex justify-center items-center flex-col space-y-4">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 -mt-16 font-mono min-h-screen flex justify-center items-center flex-col space-y-4">
        Error: {error.message}
      </div>
    )
  }

  const { todos } = data

  return (
    <div className="-mt-16 font-mono min-h-screen flex justify-center items-center flex-col space-y-4">
      <h2 className="tracking-wide text-5xl text-gray-300">todos</h2>
      <div className="border border-gray-300 max-w-xs w-full">
        <TodoForm todos={todos} />
        <TodoList todos={todos} />
        <ActionBar todos={todos} />
      </div>
      <div className="text-xs text-center">Open another tab to see todos update in realtime!</div>
    </div>
  )
}

export default App