import { ActionService } from '../../../../store'

export type ActionCellData = {
  id: string
  name: string
  body: string
}

export type ActionColumnProps = {
  action: ActionCellData
  actionService: ActionService
}
