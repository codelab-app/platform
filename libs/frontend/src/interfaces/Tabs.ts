export type BuilderTabs = 'component' | 'page' | 'tree'

export type BuilderPane =
  // Render `main` only
  | 'main'
  // Render `detail` only
  | 'detail'
  // Render `main` & `detail`
  | 'both'
  // Render `none`
  | 'none'
