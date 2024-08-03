'use client'

import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import React from 'react'
import { useUpdateFieldForm } from '../use-cases/update-field'
import { useUpdateTypeForm } from '../use-cases/update-type'

export const TypesViewHeader = () => {
  const updateTypeForm = useUpdateTypeForm()
  const updateFieldForm = useUpdateFieldForm()
  const typeToUpdate = updateTypeForm.data?.name || ''
  const fieldToUpdate = updateFieldForm.data?.key || ''

  const typeOrField = updateTypeForm.isOpen
    ? 'type'
    : updateFieldForm.isOpen
    ? 'field'
    : ''

  const typeOrFieldName = updateTypeForm.isOpen ? typeToUpdate : fieldToUpdate

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[
            { title: 'Types' },
            { title: typeOrField },
            { title: typeOrFieldName },
          ]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
    />
  )
}
