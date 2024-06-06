import * as Types from '@codelab/shared/abstract/codegen'

import {} from '@tanstack/react-query'

function fetcher<TData, TVariables>(
  endpoint: string,
  requestInit: RequestInit,
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
}
export type DomainCreatedSubscriptionVariables = Types.Exact<{
  [key: string]: never
}>

export type DomainCreatedSubscription = {
  domainCreated: {
    event: Types.EventType
    timestamp: number
    createdDomain: { id: string; name: string }
  }
}

export type DomainUpdatedSubscriptionVariables = Types.Exact<{
  [key: string]: never
}>

export type DomainUpdatedSubscription = {
  domainUpdated: {
    event: Types.EventType
    timestamp: number
    updatedDomain: { id: string; name: string }
  }
}

export type DomainDeletedSubscriptionVariables = Types.Exact<{
  [key: string]: never
}>

export type DomainDeletedSubscription = {
  domainDeleted: {
    event: Types.EventType
    timestamp: number
    deletedDomain: { id: string; name: string }
  }
}

export const DomainCreatedDocument = `
    subscription DomainCreated {
  domainCreated {
    createdDomain {
      id
      name
    }
    event
    timestamp
  }
}
    `
export const DomainUpdatedDocument = `
    subscription DomainUpdated {
  domainUpdated {
    event
    timestamp
    updatedDomain {
      id
      name
    }
  }
}
    `
export const DomainDeletedDocument = `
    subscription DomainDeleted {
  domainDeleted {
    deletedDomain {
      id
      name
    }
    event
    timestamp
  }
}
    `
