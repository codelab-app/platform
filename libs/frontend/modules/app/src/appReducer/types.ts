import { AppFragment } from '../App.fragment.graphql.gen'

export type AppState = {
  appList: Array<AppFragment>
  loading: boolean
}
