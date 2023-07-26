import React from 'react'

interface CuiHighlightedTextProps {
  highlight?: string
  text?: string
}

export const CuiHighlightedText = ({
  highlight = '',
  text = '',
}: CuiHighlightedTextProps) => {
  const index = text.search(new RegExp(highlight, 'i'))
  const beforeStr = text.substring(0, index)
  const matchedStr = text.substring(index, index + highlight.length)
  const afterStr = text.slice(index + highlight.length)

  return index > -1 ? (
    <span>
      {beforeStr}
      <span className="bg-amber-500">{matchedStr}</span>
      {afterStr}
    </span>
  ) : (
    <span>{text}</span>
  )
}
