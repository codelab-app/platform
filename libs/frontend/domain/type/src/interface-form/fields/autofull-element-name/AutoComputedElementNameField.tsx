import type {
  IAtomService,
  IComponentService,
} from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import type { InputProps } from 'antd'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'
import type { FieldProps } from 'uniforms'
import { connectField, filterDOMProps } from 'uniforms'
import { wrapField } from 'uniforms-antd'

type AutoComputedElementNameProps = FieldProps<
  string,
  Omit<InputProps, 'onReset'>
> & {
  atomId?: string
  componentId?: string
  value?: string
  componentService: IComponentService
  atomService: IAtomService
  onChange: (value: string) => void
}

const useComponentName = ({
  componentId,
  componentService,
}: {
  componentId: Maybe<string>
  componentService: IComponentService
}) => {
  const [{ loading, error, value }, getComponent] = useAsyncFn((id: string) => {
    return componentService.getOne(id)
  })

  useEffect(() => {
    if (componentId) {
      void getComponent(componentId)
    }
  }, [componentId, getComponent])

  return {
    componentName: value?.name || '',
    loading,
    error,
  }
}

const useAtomName = ({
  atomId,
  atomService,
}: {
  atomId: Maybe<string>
  atomService: IAtomService
}) => {
  const [{ loading, error, value }, getAtom] = useAsyncFn((id: string) => {
    return atomService.getOne(id)
  })

  useEffect(() => {
    if (atomId) {
      void getAtom(atomId)
    }
  }, [atomId, getAtom])

  return {
    atomName: value?.name || '',
    loading,
    error,
  }
}

const AutoComputedElementName = (props: AutoComputedElementNameProps) => {
  const {
    name,
    atomId,
    componentId,
    value,
    onChange,
    componentService,
    atomService,
  } = props

  const [curValue, setCurValue] = useState(value || '')

  const { componentName } = useComponentName({
    componentId,
    componentService,
  })

  const { atomName } = useAtomName({
    atomId,
    atomService,
  })

  useEffect(() => {
    // The priority is given for the component because of how we render
    // elements. if a component and an atom is selected we render the
    // element as an instance of the component.
    if (componentName) {
      setCurValue(compoundCaseToTitleCase(componentName).toLowerCase())
    } else if (atomName) {
      setCurValue(compoundCaseToTitleCase(atomName).toLowerCase())
    } else {
      setCurValue(curValue || '')
    }
  }, [componentName, atomName])

  useEffect(() => {
    // Calls the params.onChange when the current value changes either
    // by user input or when the selected atom or component change
    onChange(curValue)
  }, [curValue, onChange])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value
    setCurValue(v)
  }

  return wrapField(
    props,
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
