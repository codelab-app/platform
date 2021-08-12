import React from 'react'

export interface TextProps {
  text: string | undefined | null
}

export const Text = ({ text }: TextProps) => {
  return <>{text ?? ''}</>
}

Text.displayName = 'Text'
