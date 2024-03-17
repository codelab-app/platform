import { MODEL_UI } from './model-ui.factory'

describe('ModelUi', () => {
  it('can create label and key for sidebar', () => {
    console.log(MODEL_UI)

    const pageSidebarKey = MODEL_UI.SidebarPage.key
    const pageSidebarTitle = MODEL_UI.SidebarPage.title

    expect(pageSidebarKey).toBe('sidebar-page')
    // We don't actually use this though
    expect(pageSidebarTitle).toBe('Sidebar Page')
  })
})
