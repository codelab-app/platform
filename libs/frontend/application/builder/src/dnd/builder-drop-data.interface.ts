export enum DropPosition {
  After = 'After',
  Before = 'Before',
  Inside = 'Inside',
}

export interface BuilderDropData {
  dropPosition?: DropPosition
}
