import { CuiComponents, MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { act, renderHook } from '@testing-library/react'
import { useToggleState } from './toggle.state'

describe('useToggleState', () => {
  const key = {
    action: MODEL_ACTION.CreateApp.key,
    ui: CuiComponents.Form,
  }

  const useCreateAppForm = () => useToggleState<string>(key)

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCreateAppForm())

    console.log(result)

    expect(result.current.isOpen).toBe(false)
    expect(result.current.data).toBeUndefined()
  })

  it('should open with provided data', () => {
    const { result } = renderHook(() => useCreateAppForm())

    act(() => {
      result.current.open('test data')
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.data).toBe('test data')
  })

  it('should close and reset data', () => {
    const { result } = renderHook(() => useCreateAppForm())

    act(() => {
      result.current.open('test data')
    })

    act(() => {
      result.current.close()
    })

    expect(result.current.isOpen).toBe(false)
    expect(result.current.data).toBeUndefined()
  })

  it('should use mapper function when provided', () => {
    const mapper = (data?: string) => ({ mappedData: data?.toUpperCase() })

    const { result } = renderHook(() =>
      useToggleState<string, { mappedData: string | undefined }>(key, mapper),
    )

    act(() => {
      result.current.open('test data')
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.data).toEqual({ mappedData: 'TEST DATA' })
  })
})
