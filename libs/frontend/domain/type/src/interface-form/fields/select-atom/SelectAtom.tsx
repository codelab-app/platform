import type { IAtom } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import type { AtomType } from '@codelab/shared/abstract/codegen'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import compact from 'lodash/compact'
import uniqBy from 'lodash/uniqBy'
import React, { useMemo } from 'react'
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

  const [{ error: queryError, result = [], status }, getAtoms] = useAsync(() =>
    atomService.getOptions(),
  )

  const options = useMemo(() => {
    // On update mode, the current selected type can be used
    // to show the type name instead of showing just the id
    const currentAtom = fieldProps.value
      ? atomService.atoms.get(fieldProps.value)
      : undefined

    const allAtoms = uniqBy(compact([currentAtom, ...result]), 'id')

    return parent
      ? filterAtoms(allAtoms, parent)
      : allAtoms.map((atom) => ({ label: atom.name, value: atom.id }))
  }, [result, parent])

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

const filterAtoms = (
  allAtoms: Array<
    | IAtom
    | {
        id: string
        name: string
        type: AtomType
        requiredParents: Array<{ id: string; type: AtomType }>
      }
  >,
  parent: IAtom,
) => {
  const atomsRequiringCurrentParent = allAtoms
    .filter((atom) => {
      return atom.requiredParents.length
        ? atom.requiredParents.some(
            (requiredParent) => requiredParent.id === parent.id,
          )
        : false
    })
    .map(mapAtomOptions)

  const atomsExcludingSelfAndRequiredParents = allAtoms
    .filter((atom) => {
      return parent.requiredParents.length
        ? parent.requiredParents.every(
            (requiredParent) => requiredParent.id !== atom.id,
          ) && parent.id !== atom.id
        : false
    })
    .map(mapAtomOptions)

  const atomsWithNoRequiredParents = allAtoms
    .filter((atom) => atom.requiredParents.length === 0)
    .map(mapAtomOptions)

  if (atomsRequiringCurrentParent.length) {
    // only get atoms if their required parents include the parent
    return atomsRequiringCurrentParent
  }

  if (atomsExcludingSelfAndRequiredParents.length) {
    // only get atoms if the required parents of the parent doesn't include the atom
    return atomsExcludingSelfAndRequiredParents
  }

  // only get atoms that doesn't have required parents
  return atomsWithNoRequiredParents
}

const mapAtomOptions = (
  atom:
    | IAtom
    | {
        id: string
        name: string
        type: AtomType
        requiredParents: Array<{ id: string; type: AtomType }>
      },
) => ({ label: atom.name, value: atom.id })
