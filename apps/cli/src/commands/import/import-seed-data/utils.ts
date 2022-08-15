export const searchRelatedParentName = (
  name: string,
  parentNames: Array<string>,
) => {
  // GridItem is child of Grid
  const foundIconName = parentNames.find(
    (iconName) => iconName !== name && name.startsWith(iconName),
  )

  return foundIconName
}
