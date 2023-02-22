import slugify from 'voca/slugify'

export const pageSlug = ({ name }: { name: string }) => slugify(name)
