import React from 'react'

export interface TextProps {
  value: string
}

export namespace CodelabHtml {
  export function Text({ value }: TextProps) {
    return <>{value}</>
  }
}
