import { NextSeo } from 'next-seo'
import React from 'react'

interface SeoHeadProps {
  title: string
  description: string
}

export const SeoHead = ({ title, description }: SeoHeadProps) => (
  <NextSeo
    description={description}
    openGraph={{ title, description: description }}
    title={title}
    titleTemplate="%s"
  />
)
