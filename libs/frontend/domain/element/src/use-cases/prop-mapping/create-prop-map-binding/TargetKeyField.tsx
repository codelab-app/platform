import { IElementService } from '@codelab/frontend/abstract/core'
import { getTypeApi } from '@codelab/frontend/domain/type'
import { usePrevious } from '@codelab/frontend/shared/utils'
import AutoComplete, { AutoCompleteProps } from 'antd/lib/auto-complete'
import { RefSelectProps } from 'antd/lib/select'
import { observer } from 'mobx-react-lite'
import React, { Ref, useEffect, useState } from 'react'
import { connectField, FieldProps, filterDOMProps, useField } from 'uniforms'
import { wrapField } from 'uniforms-antd'

type InnerProps = Omit<AutoCompleteProps, 'onSearch' | 'options'> &
  Pick<IElementService, 'element'>

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

/** *
 * Provides autocompletion for the keys of the api of a target element
 */
const TargetKeyFieldInternal = observer<TargetKeyFieldProps>(
  ({ element, ...props }) => {
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

    // Every time the targetElementId changes, fetch the targetElement's api
    useEffect(() => {
      const targetElement = targetElementId
        ? element(targetElementId as string)
        : null

      const api = targetElement?.atom?.current.api

      if (api) {
        void getTypeApi
          .GetInterfaceTypes({ where: { id: api.id } })
          .then((r) => {
            if (!r.types.length) {
              setOptions([])

              return
            }

            setOptions(
              r.types[0]?.fields.map((e) => ({
                label: e.key,
                value: e.key,
              })) ?? [],
            )
          })
      } else {
        setOptions([])
      }
    }, [targetElementId])

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
  },
)

export const TargetKeyField = observer(
  connectField<TargetKeyFieldProps>(TargetKeyFieldInternal, { kind: 'leaf' }),
)
