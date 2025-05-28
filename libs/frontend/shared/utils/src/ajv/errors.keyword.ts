import type { CodeKeywordDefinition, KeywordCxt, Name } from 'ajv'

import { _ } from 'ajv'
import { and } from 'ajv/dist/compile/codegen'
import { stringify } from 'ajv/dist/compile/codegen/code'
import Names from 'ajv/dist/compile/names'
import { isObject } from 'radash'
import { entries, pipe } from 'remeda'

/**
 * a custom ajv keyword to override default error messages by ones provided
 *
 * example usage: 
 * 
 * const schema = {
 *   type: 'object',
 *   required: ['prop1'],
 * 
 *   properties: {
 *     prop1: {
 *       type: 'string',
 *       pattren: '',
 *     },

 *     prop2: {
 *       type: 'object',
 *       nestedProp: {
 *         type: 'string',
 *         minLength: 1,
 *       },
 *     },
 *   },
 *   
 *   errors: {
 *     prop1: {
 *       required: 'prop1 is required',
 *     },
 *     prop2: {
 *       nestedProp: {
 *         minLength: 'prop2 is very short',
 *       },
 *     },
 *   },
 * }
 * 
 *
 *
 * }
 *
 */

const keyword = 'errors'

const flattenSchema = (
  schema: KeywordCxt['schema'],
  prefix?: string,
): Record<string, string> =>
  pipe(
    entries(schema),
    (pairs) =>
      pairs.flatMap(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key

        return isObject(value)
          ? entries(flattenSchema(value, fullKey))
          : [[fullKey, value]]
      }),
    Object.fromEntries,
  )

const getKey = (err: Name) =>
  /**
   * required errors are diffrent from other errors
   * instancePath will not contain the property name in the path
   * therefore we need to concat with params.missingProperty
   * other errors will contain the property name in the path
   */
  _`${err}.keyword === 'required' ? ${getRequiredErrorMessageKey(
    _`${err}.instancePath`,
    _`${err}.params.missingProperty`,
    _`${err}.keyword`,
  )} : ${getStandardErrorMessageKey(
    _`${err}.instancePath`,
    _`${err}.keyword`,
  )} `

const getRequiredErrorMessageKey = (
  instancePath: Name,
  propertyName: Name,
  errorkeyword: Name,
) =>
  // instancePath will be empty for to level properties
  _`${and(_`${instancePath}`, _`${instancePath}.length > 0`)} ?
           [${instancePath}.slice(1), ${propertyName}, ${errorkeyword}].join('.') :
           [${propertyName}, ${errorkeyword}].join('.')`

const getStandardErrorMessageKey = (instancePath: Name, errorkeyword: Name) =>
  _`[${instancePath}.replaceAll('/', '.').slice(1), ${errorkeyword}].join('.')`

export const errorsKeyword: CodeKeywordDefinition = {
  $data: true,
  code: (cxt: KeywordCxt) => {
    const { gen, schema } = cxt
    // flatten errors schema and pass gen
    /**
     *
     *  const flatSchema = {
     *   prop1.required: 'prop1 is required',
     *   prop2.nestedProp.minLength: 'prop2 is very short',
     * }
     */
    const flatSchema = gen.const('flatSchema', stringify(flattenSchema(schema)))

    gen.if(_`${Names.errors} > 0`, () => {
      gen.forOf('err', Names.vErrors, (err) => {
        const key = getKey(err)

        // override error message with one from schema
        // if not found, keep the current message
        gen.assign(
          _`${err}.message`,
          _`${flatSchema}[${key}] ?? ${err}.message`,
        )
      })
    })
  },
  keyword,
  post: true,
  schemaType: ['object'],
}
