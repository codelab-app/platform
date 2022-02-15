import {
  AdminActionType,
  AppActionType,
  CRUDActionType,
} from '@codelab/frontend/abstract/core'
import { EntityRecord, Maybe } from '@codelab/shared/abstract/types'
import { Assign } from 'utility-types'
import { FormProps } from './form'

/**
 * An general use case version of our form props that require ref.
 */
export type UseCaseFormWithRef<TSchema> = Assign<
  Omit<FormProps<TSchema>, 'schema'>,
  {
    submitRef: FormProps<TSchema>['submitRef']
  }
>

/**
 * An delete use case version of our form props that require ref.
 */
export type DeleteUseCaseFormWithRef<TSchema, TEntity> = Omit<
  FormProps<TSchema>,
  'schema'
> &
  Entity<TEntity>

/**
 * Combine all domain action types here
 */
type CombinedActionType = CRUDActionType | AppActionType | AdminActionType

// Private methods
type FormHookState<TData, TAction extends CombinedActionType> = {
  isLoading: boolean
  reset: () => void
  actionType: TAction
}

type Entity<TEntity> = {
  entity: Maybe<TEntity>
}

/**
 * An general use case version of hooks for using form state
 */
export type UseUseCaseForm<
  // Data for the form submission
  TData,
  // Action type of the domain
  TAction extends CombinedActionType,
  // Additional props to return
  TResponse = unknown,
  // Optional input data into the hook
  TInput = never,
> = (
  ...args: TInput extends never ? [] : [TInput]
) => // Get form props without schema,
Omit<FormProps<TData, TResponse>, 'schema' | 'submitRef'> &
  // and form hook state
  FormHookState<TData, TAction>

/**
 * An use case version of hooks for using form state with entity
 */
export type UseEntityUseCaseForm<
  TData,
  TAction extends CombinedActionType,
  TEntity extends EntityRecord,
  TResponse = unknown,
  TInput = unknown,
> = (props?: TInput) => //
// Get form props without schema,
Omit<FormProps<TData, TResponse>, 'schema' | 'submitRef'> &
  // and form hook state
  FormHookState<TData, TAction> &
  Entity<TEntity>
