import React from 'react'
import { usePageElementPropQuery } from '@codelab/hasura'
import { Empty, Spin } from 'antd'
import {
  loadIndicatorState,
  LoadingIndicator,
  usePromisesLoadingIndicator,
} from '@codelab/frontend/shared'
import { PageElementPropForm } from './PageElementPropForm'
import { StyledLoadingIndicator, StyledPropsForm } from './Styled'

const PROPS_FORM_INDICATOR_KEY = 'page-element-props'

export interface PageElementPropFormProps {
  pageElementId: string
}

/** The recoil state for the autosave indicator */
export const PageElementLoadingState = loadIndicatorState(
  PROPS_FORM_INDICATOR_KEY,
)

/** Form for managing the props of a page element */
export const PageElementPropsForm = ({
  pageElementId,
}: PageElementPropFormProps) => {
  //Use this to track all promises using the loading indicator
  const { trackPromise } = usePromisesLoadingIndicator(PROPS_FORM_INDICATOR_KEY)

  //Get the props for this page element
  const { data, loading: loadingPageElement } = usePageElementPropQuery({
    variables: { pageElementId },
  })

  //Get all attributes. We can just plug in here an attribute filtering system in the future
  // const {
  //   data: attributes,
  //   loading: loadingGetAttributes,
  // } = useGetAttributesQuery({
  //   variables: { where },
  // })
  //
  // if (loadingPageElement || loadingGetAttributes) {
  //   return <Spin />
  // }

  if (!data) {
    return null
  }
  //
  // if (!attributes) {
  //   return <Empty />
  // }

  // const propsByAttributeIdMap =
  //   data?.page_element_by_pk?.props.reduce<
  //     Record<string, PageElement__PropFragment>
  //   >((map, prop) => {
  //     map[prop.prop.attribute.id] = prop.prop
  //
  //     return map
  //   }, {}) || {}

  return (
    <StyledPropsForm>
      <div style={{ overflowY: 'auto' }}>
        <h4>{data?.page_element_by_pk?.name || ''}</h4>

        {/*/!* Map all matching attributes and render a form for each one *!/*/}
        {/*{attributes.attribute.map((a) => {*/}
        {/*  //Passing the existing prop will make the form update its value instead of creating a new prop*/}
        {/*  const propWithThatAttribute = propsByAttributeIdMap[a.id]*/}

        {/*  return (*/}
        {/*    <PageElementPropForm*/}
        {/*      key={a.id}*/}
        {/*      pageElementId={pageElementId}*/}
        {/*      onMutationStarted={trackPromise}*/}
        {/*      initialData={*/}
        {/*        propWithThatAttribute || {*/}
        {/*          attribute: a,*/}
        {/*        }*/}
        {/*      }*/}
        {/*    />*/}
        {/*  )*/}
        {/*})}*/}
      </div>

      <StyledLoadingIndicator>
        autosave:{' '}
        <LoadingIndicator
          atomKey={PROPS_FORM_INDICATOR_KEY}
          renderNotLoading={() => <span>saved</span>}
          renderLoading={() => <span>...saving</span>}
        />
      </StyledLoadingIndicator>
    </StyledPropsForm>
  )
}
