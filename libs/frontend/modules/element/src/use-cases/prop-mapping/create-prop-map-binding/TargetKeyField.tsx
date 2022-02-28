import { useLazyGetInterfaceTypeGraphsQuery } from '@codelab/frontend/modules/type'
import { usePrevious } from '@codelab/frontend/shared/utils'
import { IElement, ITypeGraph } from '@codelab/shared/abstract/core'
import { ElementTree, TypeTree } from '@codelab/shared/core'
import AutoComplete, { AutoCompleteProps } from 'antd/lib/auto-complete'
import { RefSelectProps } from 'antd/lib/select'
import React, { Ref, useEffect, useState } from 'react'
import { connectField, FieldProps, filterDOMProps, useField } from 'uniforms'
import { wrapField } from 'uniforms-antd'

type InnerProps = Omit<AutoCompleteProps, 'onSearch' | 'options'> & {
  tree: ElementTree
}

export type TargetKeyFieldProps = FieldProps<
  string,
  InnerProps,
  { inputRef?: Ref<RefSelectProps> }
>

const filterSearch = (
  options: Array<{ label: string; value: string }>,
  searchInput: string,
) =>
  searchInput
    ? options.filter((v) =>
        v.value.toLowerCase().includes(searchInput.toLowerCase()),
      )
    : options

const TargetKeyFieldInternal = ({ tree, ...props }: TargetKeyFieldProps) => {
  // Get the targetElementId value from the other field
  const [{ value: targetElementId }] = useField(
    'targetElementId',
    {},
    { absoluteName: true },
  )

  // Store the search input
  const [searchInput, setSearchInput] = useState('')

  // Store the options
  const [options, setOptions] = useState<
    Array<{ value: string; label: string }>
  >([])

  const [getType, { data }] = useLazyGetInterfaceTypeGraphsQuery()

  // Every time the targetElementId changes, fetch the targetElement's api
  useEffect(() => {
    const targetElement = targetElementId
      ? (tree.getVertex(targetElementId as string) as IElement)
      : null

    const api = targetElement?.atom?.api

    if (api) {
      getType({ variables: { where: { id: api.id } } })
    } else {
      setOptions([])
    }
  }, [getType, targetElementId, tree])

  // Everytime we get an Api result, update the options
  useEffect(() => {
    if (!data?.types) {
      setOptions([])
    } else {
      const typeGraph = (data?.types?.[0]?.graph || {
        vertices: [],
        edges: [],
      }) as ITypeGraph

      const typeTree = new TypeTree(typeGraph)
      setOptions(
        typeTree.getRootFields().map((f) => ({ label: f.key, value: f.key })),
      )
    }
  }, [data])

  // When the options change, or when the searchInput changes, update the options to filter them down using the search criteria
  const prevSearchValue = usePrevious(searchInput)
  useEffect(() => {
    if (prevSearchValue !== searchInput) {
      setOptions(filterSearch(options, searchInput))
    }
  }, [prevSearchValue, searchInput, options])

  return wrapField(
    props,
    <AutoComplete
      disabled={props.disabled}
      onChange={(v) => props.onChange(v)}
      onSearch={setSearchInput}
      options={options}
      placeholder={props.placeholder}
      ref={props.inputRef}
      showAction={['focus', 'click']}
      value={props.value ?? ''}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...filterDOMProps(props)}
    />,
  )
}

export const TargetKeyField = connectField<TargetKeyFieldProps>(
  TargetKeyFieldInternal,
  { kind: 'leaf' },
)
