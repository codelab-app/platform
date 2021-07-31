import { isLeft, isRight } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { UID } from './UID'

describe('UID', () => {
  it('validates incorrect id', () => {
    const results = UID.decode('10x01')

    expect(isLeft(results)).toBeTruthy()

    const r = PathReporter.report(results)
    console.log(r)
  })

  it('validates correct id', () => {
    const results = UID.decode('0x01')

    expect(isRight(results)).toBeTruthy()

    const r = PathReporter.report(results)
    console.log(r)
  })
})
