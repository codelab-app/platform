import { AppFragment } from '../graphql/App.fragment.v2.graphql.gen'

export type AppProviderProps = {
  appId: string
}

export type UseProvideCurrentApp = {
  currentApp?: AppFragment
}
