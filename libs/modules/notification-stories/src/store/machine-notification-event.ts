type NotificationType = 'success' | 'info' | 'warning' | 'error'

export interface MachineNotificationEvent {
  type: 'NOTIFY'
  notificationType: NotificationType
  content?: string
  title?: string
}
