export type ModelIds = 'appId' | 'pageId' | 'graphId' | 'vertexId' | 'edgeId'

export type PropsWithIds<T extends ModelIds> = {
  [K in T]: string
}

// Example:
//
// type HomePageProps = PropsWithIds<'appId' | 'pageId'>
