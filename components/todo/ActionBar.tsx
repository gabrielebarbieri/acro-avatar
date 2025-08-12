'use client'

import { deleteCompleted } from '@/lib/actions'
import { Todo } from '@/lib/types'

interface ActionBarProps {
  todos: Todo[]
}

export function ActionBar({ todos }: ActionBarProps) {
  return (
    <div className="flex justify-between items-center h-10 px-2 text-xs border-t border-gray-300">
      <div>Remaining todos: {todos.filter((todo) => !todo.done).length}</div>
      <button 
        className="text-gray-300 hover:text-gray-500" 
        onClick={() => deleteCompleted(todos)}
      >
        Delete Completed
      </button>
    </div>
  )
}
