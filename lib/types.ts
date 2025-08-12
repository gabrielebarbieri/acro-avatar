import { InstaQLEntity } from '@instantdb/react'
import { schema } from '@/db/instant'

export type Todo = InstaQLEntity<typeof schema, 'todos'>
