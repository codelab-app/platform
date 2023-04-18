import type { IAtom } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import compact from 'lodash/compact'
import uniqBy from 'lodash/uniqBy'
import React from 'react'
import { useField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectAtomProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name'
> & {
  /**
   * Used for atom validation
   */
  parent?: IAtom
}

export const SelectAtom = ({ error, label, name, parent }: SelectAtomProps) => {
  const { atomService } = useStore()
  const [fieldProps] = useField<{ value?: string }>(name, {})

  const suggestedChildren =
    parent?.suggestedChildren.map((child) => child.current) ?? []

  // On update mode, the current selected type can be used
  // to show the type name instead of showing just the id
  const currentAtom = fieldProps.value
    ? atomService.atoms.get(fieldProps.value)
    : undefined

  const [{ error: queryError, result = [], status }, getAtoms] = useAsync(() =>
    atomService.getOptions(),
  )

  const options = uniqBy(
    compact([currentAtom, ...suggestedChildren, ...result]),
    'id',
  ).map((atom) => ({ label: atom.name, value: atom.id }))

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={status === 'loading'}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await getAtoms.execute()
        }
      }}
      optionFilterProp="label"
      options={options}
      showSearch
    />
  )
}
