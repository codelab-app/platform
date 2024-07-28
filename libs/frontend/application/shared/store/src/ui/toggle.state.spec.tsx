import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { act, renderHook } from '@testing-library/react-hooks'
import { useToggleState } from './toggle.state'

describe('useToggleState', () => {
  const useCreateAppForm = () => useToggleState(MODEL_ACTION.CreateApp.key)

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCreateAppForm())

    expect(result.current.isOpen).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.output).toBeUndefined()
  })

  it('should open with provided data', () => {
    const { result } = renderHook(() => useToggleState<string>(action, ui))

    act(() => {
      result.current.open('test data')
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.data).toBe('test data')
  })

  it('should close and reset data', () => {
    const { result } = renderHook(() => useToggleState<string>(action, ui))

    act(() => {
      result.current.open('test data')
    })

    act(() => {
      result.current.close()
    })

    expect(result.current.isOpen).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.output).toBeUndefined()
  })

  it('should use mapper function when provided', () => {
    const mapper = (data?: string) => ({ mappedData: data?.toUpperCase() })

    const { result } = renderHook(() =>
      useToggleState<string, { mappedData: string | undefined }>(
        action,
        ui,
        mapper,
      ),
    )

    act(() => {
      result.current.open('test data')
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.data).toBe('test data')
    expect(result.current.output).toEqual({ mappedData: 'TEST DATA' })
  })
})
