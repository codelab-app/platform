export const shouldInjectText = (atomName: string) => {
  return atomList.some(
    (atom) => atom.toLocaleLowerCase() === atomName.toLocaleLowerCase(),
  )
}

const atomList = ['AntDesignTypographyTitle', 'AntDesignButton']
