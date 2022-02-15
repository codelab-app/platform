declare module '*.svg' {
  const content: any

  export const ReactComponent: any
  export default content
}

declare module '*.cypher' {
  const content: string
  export default content
}

interface Window {
  jQuery: JQueryStatic
  Morphtext: any
}
