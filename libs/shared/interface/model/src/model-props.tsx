export interface ModelProps {
  name: string
}

export interface SchemaProps {
  [name: string]: SchemaPropsValue
}

export interface SchemaPropsValue {
  type: string
  ref?: string
  enum?: Array<string>
}
