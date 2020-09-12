import React from 'react'

export interface TextProps {
  value: string
}

export namespace CodelabHtml {
  export const Text = ({ value }: TextProps) => {
    return <>{value}</>
  }
}
