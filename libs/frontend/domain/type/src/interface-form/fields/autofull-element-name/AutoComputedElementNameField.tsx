import type {
  Maybe,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'
import { connectField } from 'uniforms'
import { wrapField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

type AutoComputedElementNameProps = Pick<
  UniformSelectFieldProps,
  'label' | 'name' | 'error'
> & {
  atomId?: string
  componentId?: string
  value?: string
  onChange: (value: string) => void
}

const useGetAtomById = () => {
  const [{ value, loading, error }, getAtom] = useAsyncFn(
    (id: Maybe<string>) => {
      if (id) {
        return interfaceFormApi.InterfaceForm_GetAtoms({
          where: { id },
        })
      }

      return Promise.resolve({ atoms: [] })
    },
    [],
  )

  return { getAtom, retrievedAtom: value?.atoms[0], loading, error }
}

const useGetComponentById = () => {
  const [{ value, loading, error }, getComponent] = useAsyncFn(
    (id: Maybe<string>) => {
      if (id) {
        return interfaceFormApi.InterfaceForm_GetComponents({
          where: {
            id,
          },
        })
      }

      return Promise.resolve({ components: [] })
    },
    [],
  )

  return {
    getComponent,
    retrievedComponent: value?.components[0],
    loading,
    error,
  }
}

const AutoComputedElementName = ({
  label,
  name,
  error,
  atomId,
  componentId,
  value,
  onChange,
}: AutoComputedElementNameProps) => {
  const { retrievedAtom, error: atomQueryError, getAtom } = useGetAtomById()

  const {
    retrievedComponent,
    error: componentQueryError,
    getComponent,
  } = useGetComponentById()

  const [curValue, setCurValue] = useState(value || '')

  useEffect(() => {
    void getAtom(atomId)
  }, [atomId, getAtom])

  useEffect(() => {
    void getComponent(componentId)
  }, [componentId, getComponent])

  useEffect(() => {
    // The priority is given for the component because of how we render
    // elements. if a component and an atom is selected we render the
    // element as an instance of the component.
    if (retrievedComponent) {
      setCurValue(
        compoundCaseToTitleCase(retrievedComponent.name).toLowerCase(),
      )
    } else if (retrievedAtom) {
      setCurValue(compoundCaseToTitleCase(retrievedAtom.name).toLowerCase())
    } else {
      setCurValue('')
    }
  }, [retrievedComponent, retrievedAtom, componentId, atomId])

  useEffect(() => {
    onChange(curValue)
  }, [curValue, onChange])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value
    setCurValue(v)
  }

  return wrapField(
    { label, error: error && atomQueryError && componentQueryError },
    <Input name={name} onChange={handleChange} value={curValue} />,
  )
}

export const AutoComputedElementNameField = connectField(
  AutoComputedElementName,
  {
    kind: 'leaf',
  },
)
