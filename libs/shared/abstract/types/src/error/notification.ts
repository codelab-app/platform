export interface Notification<TEvent> {
  /** Enter a custom content of the notification. If you don't, it will be inferred from the error message, if found */
  description: string | ((event: TEvent) => string)
  /** Enter a custom title of the notification. If you don't, it will be "info" */
  title: string | ((event: TEvent) => string)
  type: 'error' | 'info' | 'success' | 'warning'
}
