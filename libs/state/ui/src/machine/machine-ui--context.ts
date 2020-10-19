export interface ContextModal {
  visible: boolean
}

export interface ContextLayout {
  sidebar: {
    collapsed: boolean
  }
}

export interface ContextUI {
  modal: ContextModal
  layout: ContextLayout
}
