declare module '*.svg' {
  const content: any

  export const ReactComponent: any
  export default content
}

declare module '@babel/plugin-transform-react-jsx'

interface Window {
  jQuery: JQueryStatic
  Morphtext: any
  Cypress: Cypress
}
