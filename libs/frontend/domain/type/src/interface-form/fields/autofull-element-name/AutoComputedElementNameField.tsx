import type { Maybe } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import type { InputProps } from 'antd'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'
import type { FieldProps } from 'uniforms'
import { connectField, filterDOMProps } from 'uniforms'
import { wrapField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

type AutoComputedElementNameProps = FieldProps<
  string,
  Omit<InputProps, 'onReset'>
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

const AutoComputedElementName = (props: AutoComputedElementNameProps) => {
  const { name, error, atomId, componentId, value, onChange } = props
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
      setCurValue(curValue || '')
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
    { error: error && atomQueryError && componentQueryError, ...props },
    <Input
      disabled={props.disabled}
      name={name}
      onChange={handleChange}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      type={props.type ?? 'text'}
      value={curValue}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...filterDOMProps(props)}
    />,
  )
}

export const AutoComputedElementNameField = connectField(
  AutoComputedElementName,
  {
    kind: 'leaf',
  },
)
