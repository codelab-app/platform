import { isLeft, isRight } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { fromEnum } from './enum'

describe('Enum codec', () => {
  enum Thing {
    FOO = 'foo',
    BAR = 'bar',
  }
  it('succeeds with valid input', () => {
    const value = 'foo'
    const ThingCodec = fromEnum<Thing>('Thing', Thing)

    console.log(PathReporter.report(ThingCodec.decode(value)))
    // prints [ 'No errors!' ]

    expect(isRight(ThingCodec.decode(value))).toBeTruthy()
  })

  it('fails with invalid input', () => {
    const value = 'invalidvalue'
    const ThingCodec = fromEnum<Thing>('Thing', Thing)

    console.log(PathReporter.report(ThingCodec.decode(value)))
    // prints [ 'Invalid value "invalidvalue" supplied to : Thing' ]

    expect(isLeft(ThingCodec.decode(value))).toBeTruthy()
  })
})
