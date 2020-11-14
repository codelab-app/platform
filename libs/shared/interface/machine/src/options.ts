import {
  ActionObject,
  EventObject,
  MachineOptions,
  ServiceConfig,
} from 'xstate'
import { ActionsEntity, ServicesEntity } from '@codelab/shared/interface/entity'

export interface CustomMachineOptions<
  TContext = any,
  TEvent extends EventObject = any
> extends Partial<MachineOptions<TContext, TEvent>> {
  services: {
    [ServicesEntity.FETCH_LIST]: ServiceConfig<TContext, TEvent>
  }
  actions: {
    [ActionsEntity.ASSIGN_LIST]: ActionObject<TContext, TEvent>
  }
}
