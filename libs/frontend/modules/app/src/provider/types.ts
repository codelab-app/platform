import { AppFragment } from '../graphql/App.fragment.graphql.gen'

export type AppProviderProps = {
  appId: string
}

export type UseProvideCurrentApp = {
  currentApp?: AppFragment
}
