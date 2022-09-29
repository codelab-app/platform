/**
 * If child starts with parent name, return
 *
 * If "Parent = Grid" & "Children = GridItem", we return "Grid"
 */
export const searchRelatedParentName = (
  name: string,
  parentNames: Array<string>,
) => {
  // Grid id parent of GridItem
  return parentNames.find(
    (parentName) => parentName !== name && name.startsWith(parentName),
  )
}
