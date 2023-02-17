export const elementSlug = ({ name }: { name: string }) =>
  name.replace(/\s/g, '-')
