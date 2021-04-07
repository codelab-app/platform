import React from 'react'
import {
  Attribute_Bool_Exp,
  useGetAttributesQuery,
  usePageElementPropsQuery,
} from '@codelab/hasura'
import { Empty, Spin } from 'antd'
import { CreatePropForm, UpdatePropForm } from '../PropForm'
import {
  loadIndicatorState,
  LoadingIndicator,
  usePromisesLoadingIndicator,
} from '../../../../frontend/shared/src'

export interface PageElementPropsFormProps {
  pageElementId: string
}

const PROPS_FORM_INDICATOR_KEY = 'page-element-props'

export const PageElementLoadingState = loadIndicatorState(
  PROPS_FORM_INDICATOR_KEY,
)

export const PageElementPropsForm = ({
  pageElementId,
}: PageElementPropsFormProps) => {
  const { trackPromise } = usePromisesLoadingIndicator(PROPS_FORM_INDICATOR_KEY)

  //Get the props for this page element
  const { data } = usePageElementPropsQuery({
    variables: {
      pageElementId,
    },
  })

  //Get all attributes
  //We can just plug in here an attribute filtering system in the future
  const attributeSearchValue = ''

  const where: Attribute_Bool_Exp = {}

  if (attributeSearchValue) {
    where.key = { _ilike: `%${attributeSearchValue}%` }
  }

  const { data: attributes, loading } = useGetAttributesQuery({
    variables: {
      where,
    },
  })

  if (loading) return <Spin />

  if (!attributes) return <Empty />

  function handlePropCreated() {
    //todo
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div
        style={{
          overflowY: 'auto',
        }}
      >
        {/* Map all matching attributes and render a form for each one */}
        {/* TODO: filter attributes on type of element (and search?) */}

        {attributes.attribute.map((a) => {
          //If the page element already has a prop with this attribute, display the update form for it
          //TODO create a map of props by attribute
          const propWithThatAttribute = data?.page_element_by_pk?.props.find(
            (p) => p.prop.attribute.id === a.id,
          )

          if (propWithThatAttribute) {
            return (
              <UpdatePropForm
                key={propWithThatAttribute.prop.id}
                propData={propWithThatAttribute.prop}
              />
            )
          }

          return (
            <CreatePropForm
              key={a.id}
              onCreated={handlePropCreated}
              attribute={a}
              onMutationStarted={trackPromise}
            />
          )
        })}
      </div>

      <div style={{ color: '#676767' }}>
        autosave:{' '}
        <LoadingIndicator
          atomKey={PROPS_FORM_INDICATOR_KEY}
          renderNotLoading={() => <span>saved</span>}
          renderLoading={() => <span>...saving</span>}
        />
      </div>
    </div>
  )
}
