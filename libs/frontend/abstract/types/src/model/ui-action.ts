export interface UiData {
  key: string
}

export enum UiActionKey {
  CreateAtomPopover = 'CreateAtomPopover',
  CreateAtomToolbarItem = 'CreateAtomToolbarItem',
}

export const UiAction: Record<UiActionKey, UiData> = {
  [UiActionKey.CreateAtomPopover]: { key: 'create-atom-popover' },
  [UiActionKey.CreateAtomToolbarItem]: { key: 'CreateAtomToolbarItem' },
} as const
