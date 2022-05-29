//
// Utilities for transforming the form inputs to api inputs
//

import {
  InterfaceTypeCreateInput,
  StoreCreateInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { ICreateStoreDTO, IUpdateStoreDTO } from '@codelab/shared/abstract/core'
import { capitalize } from 'lodash'
import { v4 } from 'uuid'

export const makeStoreCreateInput = (
  input: ICreateStoreDTO,
): StoreCreateInput => {
  const { name, auth0Id } = input

  const interfaceCreateInput: InterfaceTypeCreateInput = {
    id: v4(),
    name: `${capitalize(name)} State`,
    owner: {
      connect: { where: { node: { auth0Id } } },
    },
  }

  return {
    id: v4(),
    name,
    state: { create: { node: { data: '{}' } } },
    stateApi: { create: { node: interfaceCreateInput } },
  }
}

export const makeStoreUpdateInput = (
  input: IUpdateStoreDTO,
): StoreUpdateInput => {
  const { name, state } = input

  return {
    name,
    state: { update: { node: { data: state } }, where: {} },
  }
}
