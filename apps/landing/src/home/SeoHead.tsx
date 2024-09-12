import { NextSeo } from 'next-seo'

interface SeoHeadProps {
  description: string
  title: string
}

export const SeoHead = ({ description, title }: SeoHeadProps) => (
  <NextSeo
    description={description}
    openGraph={{ description: description, title }}
    title={title}
    titleTemplate="%s"
  />
)
