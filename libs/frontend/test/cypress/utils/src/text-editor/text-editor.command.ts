/**
 * Type into the text editor.
 * If a parent element identifier is given, we find the text
 * editor within that element (this is important for working with multiple text editors).
 * Otherwise, we find the text editor within the render root.
 * @param content - The content to type into the text editor
 * @param parentId - The parent element identifier
 */
export const typeIntoTextEditor = (content: string, parentId?: string) => {
  const id = parentId ? `#${parentId}-editor` : '#render-root'

  const editorSelector =
    '.codex-editor .ce-block__content .cdx-block[contenteditable]'

  cy.get(id).find(editorSelector).dblclick()
  cy.get(id).find(editorSelector).clear()
  cy.get(id).find(editorSelector).type(content, {
    parseSpecialCharSequences: false,
  })
}
