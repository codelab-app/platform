import { hideField } from './hideField'

export const idField = {
  id: {
    type: 'string',
    nullable: true,
    ...hideField,
  },
}
