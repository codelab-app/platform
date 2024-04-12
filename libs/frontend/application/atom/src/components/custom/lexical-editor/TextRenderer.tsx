export interface TextRendererProps {
  data?: string
}

export const TextRenderer = ({ data }: TextRendererProps) => {
  return data
}

TextRenderer.displayName = 'TextRenderer'
