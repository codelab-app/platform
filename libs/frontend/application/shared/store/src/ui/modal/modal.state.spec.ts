import { UiKey } from '@codelab/frontend/abstract/types'
import { act, renderHook } from '@testing-library/react'
import { useModalState } from './modal.state'

describe('useModalState', () => {
  const useCreateAppModal = () => useModalState<number>(UiKey.CreateAppModal)

  it('should initialize with closed state', () => {
    const { result } = renderHook(() => useCreateAppModal())

    expect(result.current.isOpen).toBe(false)
    expect(result.current.data).toBeUndefined()
  })

  it('should open modal', () => {
    const { result } = renderHook(() => useCreateAppModal())

    act(() => {
      result.current.open()
    })

    expect(result.current.isOpen).toBe(true)
  })

  it('should close modal', () => {
    const { result } = renderHook(() => useCreateAppModal())

    act(() => {
      result.current.open()
      result.current.close()
    })

    expect(result.current.isOpen).toBe(false)
  })

  it('should open modal with data', () => {
    const { result } = renderHook(() => useCreateAppModal())

    act(() => {
      result.current.open(0)
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.data).toBe(0)
  })

  it('should use custom mapper function', () => {
    const mapper = (state: number) => ({ value: state * 2 })

    const useUpdateAppModal = () =>
      useModalState<number, { value: number }>(UiKey.CreateAppModal, mapper)

    const { result } = renderHook(() => useUpdateAppModal())

    act(() => {
      result.current.open(5)
    })

    expect(result.current.data).toEqual({ value: 10 })
  })

  it('should share data between 2 usages of the same hook', () => {
    const { result: result1 } = renderHook(() =>
      useModalState<number>(UiKey.CreateAppModal),
    )

    const { result: result2 } = renderHook(() =>
      useModalState<number>(UiKey.CreateAppModal),
    )

    act(() => {
      result1.current.open(42)
    })

    expect(result1.current.isOpen).toBe(true)
    expect(result1.current.data).toBe(42)

    expect(result2.current.isOpen).toBe(true)
    expect(result2.current.data).toBe(42)

    act(() => {
      result2.current.close()
    })

    expect(result1.current.isOpen).toBe(false)
    expect(result2.current.isOpen).toBe(false)
  })

  it('should not share data between modals with different keys', () => {
    const { result: result1 } = renderHook(() =>
      useModalState<number>(UiKey.CreateAppModal),
    )

    const { result: result2 } = renderHook(() =>
      useModalState<number>(UiKey.UpdateAppModal),
    )

    act(() => {
      result1.current.open(42)
    })

    expect(result1.current.isOpen).toBe(true)
    expect(result1.current.data).toBe(42)

    expect(result2.current.isOpen).toBe(false)
    expect(result2.current.data).toBeUndefined()

    act(() => {
      result2.current.open(24)
    })

    expect(result1.current.isOpen).toBe(true)
    expect(result1.current.data).toBe(42)

    expect(result2.current.isOpen).toBe(true)
    expect(result2.current.data).toBe(24)

    act(() => {
      result1.current.close()
    })

    expect(result1.current.isOpen).toBe(false)
    expect(result2.current.isOpen).toBe(true)
    expect(result2.current.data).toBe(24)
  })
})
