import { IVertex } from '../../IVertex'

export interface IFieldVertex extends IVertex {
  key: string
  name?: string | null
  description?: string | null
}
