export const makeFilterData = (data: any[]) => data.map(({children, id, name}) => {
  const props: any = {text: name, value: id}, o = {} as any
  for (let p in props) {
    if(props[p])
    o[p] = props[p]
  }
  if(children) {
    o.children = makeFilterData(children)
  }
  return o
})