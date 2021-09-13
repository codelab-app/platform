import {
  TypeTreeGraphql,
  useGetTypeGraphLazyQuery,
} from '@codelab/frontend/modules/type'
import { usePrevious } from '@codelab/frontend/shared/utils'
import AutoComplete, { AutoCompleteProps } from 'antd/lib/auto-complete'
import { RefSelectProps } from 'antd/lib/select'
import React, { Ref, useEffect, useState } from 'react'
import { connectField, FieldProps, filterDOMProps, useField } from 'uniforms'
import { wrapField } from 'uniforms-antd'
import { ElementFragment } from '../../../graphql'
import { ElementTreeGraphql } from '../../../tree'

type InnerProps = Omit<AutoCompleteProps, 'onSearch' | 'options'> & {
  tree: ElementTreeGraphql
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

  const [getType, { data }] = useGetTypeGraphLazyQuery()

  // Every time the targetElementId changes, fetch the targetElement's api
  useEffect(() => {
    const targetElement = targetElementId
      ? (tree.getVertex(
          targetElementId as string,
          tree.isElementPredicate,
        ) as ElementFragment)
      : null

    const api = targetElement?.atom?.api

    if (api) {
      getType({ variables: { input: { where: { id: api.id } } } })
    } else {
      setOptions([])
    }
  }, [getType, targetElementId, tree])

  // Everytime we get an Api result, update the options
  useEffect(() => {
    if (!data?.getTypeGraph) {
      setOptions([])
    } else {
      const typeTree = new TypeTreeGraphql(data.getTypeGraph)
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
      showAction={['focus', 'click']}
      onChange={(v) => props.onChange(v)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      value={props.value ?? ''}
      options={options}
      onSearch={setSearchInput}
      {...filterDOMProps(props)}
    />,
  )
}

export const TargetKeyField = connectField<TargetKeyFieldProps>(
  TargetKeyFieldInternal,
  { kind: 'leaf' },
)
