import slugify from 'voca/slugify'

export const elementSlug = ({ name }: { name: string }) => slugify(name)
