import { EventObject, MachineOptions, ServiceConfig } from 'xstate'

export interface CustomMachineOptions<
  TContext = any,
  TEvent extends EventObject = any
> extends Partial<MachineOptions<TContext, TEvent>> {
  services: {
    fetchItem: ServiceConfig<TContext, TEvent>
    fetchList: ServiceConfig<TContext, TEvent>
  }
}
