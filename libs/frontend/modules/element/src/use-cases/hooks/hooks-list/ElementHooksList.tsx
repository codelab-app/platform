import { List } from 'antd'
import React, { useEffect } from 'react'
import tw from 'twin.macro'
import {
  ElementFragment,
  HookConfigFragment,
  HookFragment,
} from '../../../graphql'
import { useLazyGetLambdaNameQuery } from '../hookEndpoints'
import { RemoveHookFromElementButton } from '../remove-hook-from-element'

export interface ElementHooksListProps {
  element: ElementFragment
}

export const ElementHooksList = ({ element }: ElementHooksListProps) => {
  return (
    <List
      dataSource={element.hooks}
      renderItem={(hook) => (
        <ElementHooksListItem hook={hook} element={element} />
      )}
    />
  )
}

const ElementHooksListItem = ({
  hook,
  element,
}: {
  hook: HookFragment
  element: ElementFragment
}) => (
  <List.Item
    css={tw`flex flex-row items-center justify-between`}
    actions={[
      <RemoveHookFromElementButton
        key={'delete'}
        hookId={hook.id}
        metadata={{ hook, element }}
      />,
    ]}
  >
    <List.Item.Meta
      title={hook.type}
      description={<ElementHooksListItemDescription {...hook.config} />}
    />
  </List.Item>
)

const ElementHooksListItemDescription = (config: HookConfigFragment) => {
  // FIXME optimize this if needed to either use getLambdas and fetch them all at once
  // or add a resolve field in the API to get the lambda along with the hook
  const [getLambda, { data: lambda }] = useLazyGetLambdaNameQuery()

  useEffect(() => {
    if (config.__typename === 'QueryHookConfig' && config.lambdaId) {
      getLambda({ variables: { input: { lambdaId: config.lambdaId } } })
    }
  }, [config, getLambda])

  switch (config.__typename) {
    case 'QueryHookConfig':
      return (
        <span>
          {config.lambdaId
            ? `Lambda ${
                config.lambdaId && lambda?.getLambda
                  ? ` - ${lambda.getLambda.name}`
                  : ''
              }`
            : `${config.queryKey} - ${config.method} - ${config.url}`}
        </span>
      )
    case 'GraphqlHookConfig':
      return (
        <span>
          {config.graphqlUrl} - {config.graphqlBody}
        </span>
      )
    case 'RecoilStateHookConfig':
      return (
        <span>
          {config.stateKey}{' '}
          {config.defaultValue ? `Default: ${config.defaultValue}` : ''}
        </span>
      )
  }

  return null
}

ElementHooksList.displayName = 'ElementHooksList'
