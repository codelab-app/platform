import { VertexEntity } from '../vertex/vertex.entity'
import { NodeType } from '@codelab/alpha/shared/interface/node'

export const createAtoFVertices = () => {
  const root = new VertexEntity()

  root.id = 'root'
  root.type = NodeType.React_Html_Div

  const a = new VertexEntity()

  a.id = 'a'
  a.type = NodeType.React_List

  const b = new VertexEntity()

  b.id = 'b'
  b.type = NodeType.React_List_Item

  const c = new VertexEntity()

  c.id = 'c'
  c.type = NodeType.React_List_Item

  const d = new VertexEntity()

  d.id = 'd'
  d.type = NodeType.React_List

  const e = new VertexEntity()

  e.id = 'e'
  e.type = NodeType.React_List_Item

  const f = new VertexEntity()

  f.id = 'f'
  f.type = NodeType.React_List_Item

  return {
    root,
    a,
    b,
    c,
    d,
    e,
    f,
  }
}

export const createAtoEVertices = () => {
  const root = new VertexEntity()

  root.id = 'root'
  root.type = NodeType.React_Html_Div

  const a = new VertexEntity()

  a.id = 'a'
  a.type = NodeType.React_List

  const b = new VertexEntity()

  b.id = 'b'
  b.type = NodeType.React_List_Item

  const c = new VertexEntity()

  c.id = 'c'
  c.type = NodeType.React_List_Item

  const d = new VertexEntity()

  d.id = 'd'
  d.type = NodeType.React_List

  const e = new VertexEntity()

  e.id = 'e'
  e.type = NodeType.React_List_Item

  return {
    root,
    a,
    b,
    c,
    d,
    e,
  }
}

export const createAtoIVertices = () => {
  const root = new VertexEntity()

  root.id = 'root'
  root.type = NodeType.React_Html_Div

  const a = new VertexEntity()

  a.id = 'a'
  a.type = NodeType.React_List

  const b = new VertexEntity()

  b.id = 'b'
  b.type = NodeType.React_List

  const c = new VertexEntity()

  c.id = 'c'
  c.type = NodeType.React_List_Item

  const d = new VertexEntity()

  d.id = 'd'
  d.type = NodeType.React_List_Item

  const e = new VertexEntity()

  e.id = 'e'
  e.type = NodeType.React_List_Item

  const f = new VertexEntity()

  f.id = 'f'
  f.type = NodeType.React_List_Item

  const g = new VertexEntity()

  g.id = 'g'
  g.type = NodeType.React_List_Item

  const h = new VertexEntity()

  h.id = 'h'
  h.type = NodeType.React_List_Item

  const i = new VertexEntity()

  i.id = 'i'
  i.type = NodeType.React_List_Item

  return {
    root,
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
  }
}
