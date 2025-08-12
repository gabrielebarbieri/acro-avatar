'use client'

import { deleteTodo, toggleDone } from '@/lib/actions'
import { Todo } from '@/lib/types'

interface TodoListProps {
  todos: Todo[]
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <div className="divide-y divide-gray-300">
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center h-10">
          <div className="h-full px-2 flex items-center justify-center">
            <div className="w-5 h-5 flex items-center justify-center">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.done}
                onChange={() => toggleDone(todo)}
              />
            </div>
          </div>
          <div className="flex-1 px-2 overflow-hidden flex items-center">
            {todo.done ? (
              <span className="line-through">{todo.text}</span>
            ) : (
              <span>{todo.text}</span>
            )}
          </div>
          <button
            className="h-full px-2 flex items-center justify-center text-gray-300 hover:text-gray-500"
            onClick={() => deleteTodo(todo)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  )
}
