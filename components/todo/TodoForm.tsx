'use client'

import { db } from '@/db/instant'
import { addTodo, toggleAll } from '@/lib/actions'
import { Todo } from '@/lib/types'

interface TodoFormProps {
  todos: Todo[]
}

export function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20">
      <path d="M5 8 L10 13 L15 8" stroke="currentColor" fill="none" strokeWidth="2" />
    </svg>
  )
}

export function TodoForm({ todos }: TodoFormProps) {
  const { user } = db.useAuth()
  
  return (
    <div className="flex items-center h-10 border-b border-gray-300">
      <button
        className="h-full px-2 border-r border-gray-300 flex items-center justify-center"
        onClick={() => toggleAll(todos)}
      >
        <div className="w-5 h-5">
          <ChevronDownIcon />
        </div>
      </button>
      <form
        className="flex-1 h-full"
        onSubmit={(e) => {
          e.preventDefault()
          const input = e.currentTarget.input as HTMLInputElement
          addTodo(input.value, user)
          input.value = ''
        }}
      >
        <input
          className="w-full h-full px-2 outline-none bg-transparent"
          autoFocus
          placeholder="What needs to be done?"
          type="text"
          name="input"
        />
      </form>
    </div>
  )
}
