import type {
  Maybe,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import React, { useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'
import { TextField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type AutofillElementNameProps = Pick<
  UniformSelectFieldProps,
  'label' | 'name' | 'error'
> & {
  atomId?: string
  componentId?: string
  value?: string
  onChange: (value: string) => void
}

/**
 * @returns { data, isLoading, error }
 */
const useGetAtomById = () => {
  const [{ value, loading, error }, getAtom] = useAsyncFn(
    (id: string) =>
      interfaceFormApi.InterfaceForm_GetAtoms({
        where: { id },
      }),
    [],
  )

  return { getAtom, retrievedAtom: value?.atoms[0], loading, error }
}

const useGetComponentById = () => {
  const [{ value, loading, error }, getComponent] = useAsyncFn(
    (id: string) =>
      interfaceFormApi.InterfaceForm_GetComponents({
        where: {
          id,
        },
      }),
    [],
  )

  return {
    getComponent,
    retrievedComponent: value?.components[0],
    loading,
    error,
  }
}

export const AutofillElementName = ({
  label,
  name,
  error,
  atomId,
  componentId,
  value,
  onChange,
}: AutofillElementNameProps) => {
  const { retrievedAtom, error: atomQueryError, getAtom } = useGetAtomById()

  const {
    retrievedComponent,
    error: componentQueryError,
    getComponent,
  } = useGetComponentById()

  const [curValue, setCurValue] = useState(value || '')

  useEffect(() => {
    if (atomId) {
      void getAtom(atomId)
    }
  }, [atomId, getAtom])

  useEffect(() => {
    if (componentId) {
      void getComponent(componentId)
    }
  }, [componentId, getComponent])

  useEffect(() => {
    if (retrievedComponent) {
      setCurValue(compoundCaseToTitleCase(retrievedComponent.name))
    } else if (retrievedAtom) {
      setCurValue(compoundCaseToTitleCase(retrievedAtom.name))
    }
  }, [retrievedComponent, retrievedAtom])

  useEffect(() => {
    if (curValue) {
      onChange(curValue)
    }
  }, [curValue, onChange])

  const handleChange = (v: Maybe<string>) => {
    v && setCurValue(v)
  }

  return (
    <TextField
      error={error && atomQueryError && componentQueryError}
      label={label}
      name={name}
      onChange={handleChange}
      value={curValue}
    />
  )
}
