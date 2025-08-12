import { id } from '@instantdb/react'
import { db } from '@/db/instant'
import { Todo } from './types'

export function addTodo(text: string, user: any) {
  db.transact(
    db.tx.todos[id()].update({
      text,
      done: false,
      createdAt: Date.now(),
      creatorId: user?.id,
    }),
  )
}

export function deleteTodo(todo: Todo) {
  db.transact(db.tx.todos[todo.id].delete())
}

export function toggleDone(todo: Todo) {
  db.transact(db.tx.todos[todo.id].update({ done: !todo.done }))
}

export function deleteCompleted(todos: Todo[]) {
  const completed = todos.filter((todo) => todo.done)
  const txs = completed.map((todo) => db.tx.todos[todo.id].delete())
  db.transact(txs)
}

export function toggleAll(todos: Todo[]) {
  const newVal = !todos.every((todo) => todo.done)
  db.transact(todos.map((todo) => db.tx.todos[todo.id].update({ done: newVal })))
}
