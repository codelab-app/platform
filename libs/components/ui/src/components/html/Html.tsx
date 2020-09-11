import React from 'react'

export interface TextProps {
  value: string
}

export namespace Html {
  export function Text({ value }: TextProps) {
    return <>{value}</>
  }
}
