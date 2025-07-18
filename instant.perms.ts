// instant.perms.ts
import type { InstantRules } from '@instantdb/react';

const rules = {
  "todos": {
    "allow": {
      "view": "auth.id != null && auth.id == data.creatorId",
      "create": "auth.id != null && auth.id == data.creatorId",
      "update": "auth.id != null && auth.id == data.creatorId",
      "delete": "auth.id != null && auth.id == data.creatorId",
    }
  }
} satisfies InstantRules;

export default rules;