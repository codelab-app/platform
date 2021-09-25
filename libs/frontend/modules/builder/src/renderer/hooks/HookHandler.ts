export type HookHandler = (
  config: any,
  props?: Record<string, any>,
) => Record<string, any> | void | undefined
