import { deepReplaceObjectValuesAndKeys } from '@codelab/shared/utils'
import * as Benchmark from 'benchmark'
import { benchmarkJsonData } from './benchmark-data'

// Results:
// Regex: 6025 ops / sec
// Json parse and replace in strings: 6025 ops / sec
// json parse and nested json parse + replace: 210 ops / sec
//
// Json parse and replace in strings is a bit faster, but not by much to
// compensate for its complexity
describe('Id replacement benchmark', function () {
  const suite = new Benchmark.Suite()
  const replaceStr = 'world'
  const replaceWith = 'codelab'

  it.skip('should replace string in object', function () {
    suite
      .add('regex replace', function () {
        const jsonString = JSON.stringify(benchmarkJsonData)

        const newString = jsonString.replace(
          new RegExp(replaceStr, 'g'),
          replaceWith,
        )

        const parsed = JSON.parse(newString)
      })
      .add('json parse and replace in strings', function () {
        const newValue = deepReplaceObjectValuesAndKeys(
          benchmarkJsonData,
          (value, key) => {
            return {
              value: value === replaceStr ? replaceWith : value,
              key: key === replaceStr ? replaceWith : key,
            }
          },
        )
      })
      .add('json parse and nested json parse + replace', function () {
        const recursiveDeepReplace = (val: any) =>
          deepReplaceObjectValuesAndKeys(val, (value, key) => {
            let newValue = value

            if (typeof value === 'string') {
              if (value === replaceStr) {
                newValue = replaceWith
              } else {
                try {
                  const innerParsed = JSON.parse(value)
                  newValue = recursiveDeepReplace(innerParsed)
                } catch (e) {
                  // do nothing
                }
              }
            }

            return {
              value: newValue,
              key: key === replaceStr ? replaceWith : key,
            }
          })

        const newValue = recursiveDeepReplace(benchmarkJsonData)
      })
      // add listeners
      .on('cycle', function (event: any) {
        console.log(String(event.target))
      })
      .on('complete', function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log('Fastest is ' + this.filter('fastest').map('name'))
      })
      // run async
      .run({ async: false })
  })
})
