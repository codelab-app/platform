import { act, render } from '@testing-library/react'
import { atom, Provider } from 'jotai'
import { useAtom } from 'jotai/react'

const priceAtom = atom(10)
const messageAtom = atom('hello')
const productAtom = atom({ id: 12, name: 'good stuff' })
const readOnlyAtom = atom((get) => get(priceAtom) * 2)

const writeOnlyAtom = atom(null, (get, set, update: { discount: number }) => {
  set(priceAtom, get(priceAtom) - update.discount)
  // Or can do it like this
  // set(priceAtom, (price) => price - update.discount)
})

const readWriteAtom = atom(
  (get) => get(priceAtom) * 2,
  (get, set, newPrice: number) => {
    set(priceAtom, newPrice / 2)
  },
)

describe('Jotai Atoms', () => {
  it('should initialize priceAtom with correct value', () => {
    const TestComponent = () => {
      const [price] = useAtom(priceAtom)

      return <div>{price}</div>
    }

    const { getByText } = render(
      <Provider>
        <TestComponent />
      </Provider>,
    )

    expect(getByText('10')).toBeTruthy()
  })

  it('should update priceAtom using writeOnlyAtom', () => {
    const TestComponent = () => {
      const [price] = useAtom(priceAtom)
      const [, setWriteOnly] = useAtom(writeOnlyAtom)

      return (
        <div>
          <span>{price}</span>
          <button onClick={() => setWriteOnly({ discount: 2 })}>
            Discount
          </button>
        </div>
      )
    }

    const { getByText } = render(
      <Provider>
        <TestComponent />
      </Provider>,
    )

    expect(getByText('10')).toBeTruthy()

    act(() => {
      getByText('Discount').click()
    })

    expect(getByText('8')).toBeTruthy()
  })

  it('should read and write using readWriteAtom', () => {
    const TestComponent = () => {
      const [readWrite, setReadWrite] = useAtom(readWriteAtom)

      return (
        <div>
          <span>{readWrite}</span>
          <button onClick={() => setReadWrite(30)}>Update</button>
        </div>
      )
    }

    const { getByText } = render(
      <Provider>
        <TestComponent />
      </Provider>,
    )

    expect(getByText('20')).toBeTruthy()

    act(() => {
      getByText('Update').click()
    })

    expect(getByText('30')).toBeTruthy()
  })

  it('should correctly initialize and read messageAtom', () => {
    const TestComponent = () => {
      const [message] = useAtom(messageAtom)

      return <div>{message}</div>
    }

    const { getByText } = render(
      <Provider>
        <TestComponent />
      </Provider>,
    )

    expect(getByText('hello')).toBeTruthy()
  })

  it('should correctly initialize and read productAtom', () => {
    const TestComponent = () => {
      const [product] = useAtom(productAtom)

      return <div>{product.name}</div>
    }

    const { getByText } = render(
      <Provider>
        <TestComponent />
      </Provider>,
    )

    expect(getByText('good stuff')).toBeTruthy()
  })
})
