import slugify from 'voca/slugify'

export const appSlug = ({ name }: { name: string }) => slugify(name)
