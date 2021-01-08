export type FindAppBy = FindAppByTitle | FindAppByID

export type FindAppByTitle = {
  title: string
}

export type FindAppByID = {
  id: string
}

export type AppsWhere = {
  title?: string
}
