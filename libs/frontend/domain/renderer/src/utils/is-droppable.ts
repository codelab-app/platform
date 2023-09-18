export const isDroppable = (atomName: string) => {
  return droppableAtomList.some(
    (droppableAtom) =>
      droppableAtom.toLocaleLowerCase() === atomName.toLocaleLowerCase(),
  )
}

const droppableAtomList = ['HtmlDiv']
