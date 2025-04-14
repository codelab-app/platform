import type {
  IComponentDto,
  IElementDto,
  IFieldDto,
  IInterfaceTypeDto,
  IPageDto,
  ITypeDto,
} from '@codelab/shared/abstract/core'
import type { Meta, StoryObj } from '@storybook/react'

import { type IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import { systemTypesData } from '@codelab/shared/data/seed'
import { userDto } from '@codelab/shared/data/test'
import { App } from '@codelab/shared-domain-module/app'
import { graphql, HttpResponse } from 'msw'
import { ErrorBoundary } from 'react-error-boundary'
import { v4 } from 'uuid'

import { InterfaceForm } from './InterfaceForm'
import { interfaceWithUnionField } from './tests/setup-store'

const meta: Meta<typeof InterfaceForm> = {
  component: InterfaceForm,
  title: 'InterfaceForm',
}

export default meta

type Story = StoryObj<typeof InterfaceForm>

const DefaultInterfaceForm = ({
  interfaceTypeId,
}: {
  interfaceTypeId: string
}) => {
  const { fieldDomainService, typeDomainService } = useDomainStore()
  const model = {}

  const onSubmit = (data: unknown) => {
    console.log(data)

    return Promise.resolve()
  }

  const interfaceTypeModel =
    typeDomainService.type<IInterfaceTypeModel>(interfaceTypeId)

  const reactNodeType = typeDomainService.typeByKind(ITypeKind.ReactNodeType)

  const reactNodeTypeField: IFieldDto = {
    api: { id: interfaceTypeModel.id },
    fieldType: { id: reactNodeType.id },
    id: v4(),
    key: 'component',
    name: 'Component',
  }

  fieldDomainService.hydrate(reactNodeTypeField)

  console.log(interfaceTypeModel)

  return (
    <InterfaceForm
      interfaceType={interfaceTypeModel}
      model={model}
      onSubmit={onSubmit}
    />
  )
}

const InterfaceFormHydrator = () => {
  const interfaceType: IInterfaceTypeDto = {
    __typename: ITypeKind.InterfaceType,
    id: v4(),
    kind: ITypeKind.InterfaceType,
    name: 'Test',
    owner: { id: userDto.id },
  }

  const systemTypes = systemTypesData(userDto)
  const typesDto: Array<ITypeDto> = [...systemTypes, interfaceType]
  const app = App.seedApp()

  const pageDto: IPageDto = {
    app: { id: v4() },
    id: v4(),
    kind: IPageKind.Regular,
    name: 'Test Page',
    rootElement: { id: v4() },
    store: { id: v4() },
    urlPattern: '',
  }

  const elementDto: IElementDto = {
    closestContainerNode: { id: pageDto.id },
    id: v4(),
    name: 'Element 1',
    props: { data: '{}', id: v4() },
    renderType: { __typename: 'Component', id: v4() },
  }

  const componentsDto: Array<IComponentDto> = [
    {
      __typename: 'Component',
      api: { id: v4() },
      id: v4(),
      name: 'Component 1',
      owner: { id: userDto.id },
      props: { data: '{}', id: v4() },
      rootElement: { id: v4() },
      store: { id: v4() },
    },
  ]

  return (
    <ErrorBoundary
      fallback={<div>Something went wrong with the Interface Form</div>}
      onError={(error, errorInfo) => {
        console.error('Interface Form Error:', error, errorInfo)
      }}
    >
      <DomainStoreHydrator
        componentsDto={componentsDto}
        elementsDto={[elementDto]}
        typesDto={typesDto}
      >
        <DefaultInterfaceForm interfaceTypeId={interfaceType.id} />
      </DomainStoreHydrator>
    </ErrorBoundary>
  )
}

/**
 * Easier to constructor the required data in mobx
 */
const components: Array<IComponentDto> = [
  // {
  //   __typename: 'Component',
  //   api: { id: v4() },
  //   id: v4(),
  //   name: 'Component 1',
  //   owner: { id: userDto.id },
  //   props: { data: '{}', id: v4() },
  //   rootElement: { id: v4() },
  //   store: { id: v4() },
  // },
  // {
  //   __typename: 'Component',
  //   api: { id: v4() },
  //   id: v4(),
  //   name: 'Component 2',
  //   owner: { id: userDto.id },
  //   props: { data: '{}', id: v4() },
  //   rootElement: { id: v4() },
  //   store: { id: v4() },
  // },
]

const response = {
  aggregate: {
    count: 2,
  },
  items: components,
}

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('ComponentList', () => {
          return HttpResponse.json({
            data: response,
          })
        }),
      ],
    },
  },
  render: () => <InterfaceFormHydrator />,
}

export const WithUnionField: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('ComponentList', () => {
          return HttpResponse.json({
            data: {
              aggregate: { count: 0 },
              items: [],
            },
          })
        }),
      ],
    },
  },
  render: () => {
    const onSubmit = (data: unknown) => {
      console.log('Submitted data:', data)

      return Promise.resolve()
    }

    return (
      <ErrorBoundary
        fallback={<div>Something went wrong with the Interface Form</div>}
        onError={(error, errorInfo) => {
          console.error('Interface Form Error:', error, errorInfo)
        }}
      >
        <InterfaceForm
          interfaceType={interfaceWithUnionField}
          model={{}}
          onSubmit={onSubmit}
        />
      </ErrorBoundary>
    )
  },
}
