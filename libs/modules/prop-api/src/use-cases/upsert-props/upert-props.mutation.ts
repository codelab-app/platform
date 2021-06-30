import {
  compileMultiple,
  DgraphMutationBuilder,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphTriple,
  UidFilter,
} from '@codelab/backend'
import { DgraphEnumTypeValue, MAX_TYPE_DEPTH } from '@codelab/modules/type-api'
import { Mutation, Request } from 'dgraph-js'
import * as _ from 'lodash'
import {
  DgraphArrayValue,
  DgraphArrayValueFields,
  DgraphBooleanValue,
  DgraphBooleanValueFields,
  DgraphFloatValue,
  DgraphFloatValueFields,
  DgraphInterfaceValue,
  DgraphInterfaceValueFields,
  DgraphIntValue,
  DgraphIntValueFields,
  DgraphProp,
  DgraphPropFields,
  DgraphStringValue,
  DgraphStringValueFields,
} from '../../models'
import { UpsertPropsInput, UpsertValueInput } from './upsert-props.input'

const Fields = DgraphPropFields

export class UpsertPropMutationBuilder extends DgraphMutationBuilder {
  private propIdToPropValueVariableNameMap = new Map<string, string>()

  private valuesToDelete: Array<{ valueId: string; propId: string }> = []

  private propSubjects: Set<string> = new Set()

  public getPropSubjects(): ReadonlySet<string> {
    return this.propSubjects
  }

  constructor(
    inputs: Array<UpsertPropsInput>,
    iteration = 0,
    nullPropSubject = '_:prop',
    valueVariableName: string | UidFilter = 'value',
  ) {
    super()

    for (let i = 0; i < inputs.length; i++) {
      const upsertPropInput = inputs[i]

      const propSub =
        upsertPropInput.propId || `${nullPropSubject}${iteration}${i}`

      this.propSubjects.add(propSub)

      let valueSub: string | UidFilter
      const valueKeyAddition = `${iteration}${i}`

      const valueKey =
        typeof valueVariableName === 'string'
          ? valueVariableName + valueKeyAddition
          : valueVariableName.uid + valueKeyAddition

      // If we have an existing propId, add it to the map, so we can add it to the upsert query block later
      // to get its value id and update that value, instead of creating a new one
      if (upsertPropInput.propId) {
        this.propIdToPropValueVariableNameMap.set(
          upsertPropInput.propId,
          valueKey,
        )

        valueSub = new UidFilter(valueKey)
      } else {
        valueSub = valueKey.startsWith('_') ? valueKey : `_:${valueKey}`
      }

      this.withDgraphTypeModel(propSub, DgraphProp).withTriple(
        new DgraphTriple(propSub, Fields.field, upsertPropInput.fieldId),
        new DgraphTriple(
          propSub,
          Fields.pageElement,
          upsertPropInput.pageElementId || '',
        ).onlyIf(upsertPropInput.pageElementId),
        new DgraphTriple(
          upsertPropInput.pageElementId || '',
          'PageElement.props',
          propSub,
        ).onlyIf(upsertPropInput.pageElementId),
      )

      if (upsertPropInput.value) {
        this.withDgraphTypeModel(
          valueSub,
          this.getDgraphTypeForValue(upsertPropInput.value),
        )
          .withTriple(
            new DgraphTriple(
              propSub,
              Fields.value,
              upsertPropInput.value?.enumValueId || valueSub,
            ),
          )
          .withTriple(
            ...this.getTriplesForValue(
              valueSub,
              upsertPropInput.value,
              iteration,
            ),
          )
      } else {
        if (typeof valueSub === 'object') {
          this.valuesToDelete.push({
            valueId: valueSub.build(),
            propId: propSub,
          })
        }
      }
    }
  }

  getDgraphTypeForValue = (value: UpsertValueInput) => {
    if (value.arrayValue) {
      return DgraphArrayValue
    } else if (value.floatValue) {
      return DgraphFloatValue
    } else if (value.intValue) {
      return DgraphIntValue
    } else if (value.stringValue) {
      return DgraphStringValue
    } else if (value.booleanValue) {
      return DgraphBooleanValue
    } else if (value.interfaceValue) {
      return DgraphInterfaceValue
    } else if (value.enumValueId) {
      return DgraphEnumTypeValue
    }

    throw new Error('Invalid UpsertValueInput')
  }

  getTriplesForValue = (
    subject: string | UidFilter,
    value: UpsertValueInput,
    iteration = 0,
  ): Array<DgraphTriple> => {
    if (iteration > MAX_TYPE_DEPTH) {
      throw new Error('Value too nested')
    }

    if (value.arrayValue) {
      const nestedTriples = _.flatMap(
        value.arrayValue.values,
        (arrayValue, i) => {
          const subjAddition = `arrValue${iteration}${i}`

          const innerSubject =
            typeof subject === 'string'
              ? subject + subjAddition
              : new UidFilter((subject.uid as string) + subjAddition)

          return this.getTriplesForValue(
            // Make sure we have an unique subject here
            innerSubject,
            arrayValue,
            iteration + 1,
          )
        },
      )

      const mainToNestedValuesConnection = nestedTriples.map(
        (t) =>
          new DgraphTriple(subject, DgraphArrayValueFields.values, t.subject),
      )

      return nestedTriples.concat(mainToNestedValuesConnection)
    }

    if (value.floatValue) {
      return DgraphTriple.fromPredicateValuePairs(subject, {
        [DgraphFloatValueFields.value]: value.floatValue.value,
      })
    }

    if (value.intValue) {
      return DgraphTriple.fromPredicateValuePairs(subject, {
        [DgraphIntValueFields.value]: value.intValue.value,
      })
    }

    if (value.stringValue) {
      return DgraphTriple.fromPredicateValuePairs(subject, {
        [DgraphStringValueFields.value]: value.stringValue.value,
      })
    }

    if (value.booleanValue) {
      return DgraphTriple.fromPredicateValuePairs(subject, {
        [DgraphBooleanValueFields.value]: value.booleanValue.value,
      })
    }

    if (value.interfaceValue) {
      const subjAddition = `interfaceProp${iteration}`
      const subjValueAddition = `interfacePropValue${iteration}`

      const innerSubject =
        typeof subject === 'string'
          ? subject + subjValueAddition
          : new UidFilter((subject.uid as string) + subjValueAddition)

      const innerPropSubject =
        typeof subject === 'string'
          ? subject + subjAddition
          : subject.uid + subjAddition

      const mb = new UpsertPropMutationBuilder(
        value.interfaceValue.props,
        iteration + 1,
        innerPropSubject,
        innerSubject,
      )

      const innerTriples = mb.triples()
      const innerTriplesSubjects = mb.getPropSubjects()

      mb.propIdToPropValueVariableNameMap.forEach((v, k) =>
        this.propIdToPropValueVariableNameMap.set(k, v),
      )

      this.valuesToDelete.push(...mb.valuesToDelete)

      const connectionTriples = Array.from(innerTriplesSubjects).map(
        (innerTripleSubject) =>
          new DgraphTriple(
            subject,
            DgraphInterfaceValueFields.props,
            innerTripleSubject,
          ),
      )

      return innerTriples.concat(connectionTriples)
    }

    if (value.enumValueId) {
      // The enum value should exists already, no need to set it to anything, just reference it
      return []
    }

    throw new Error('Invalid UpsertValueInput')
  }

  buildQuery() {
    const qbs: Array<DgraphQueryBuilder> = []
    this.propIdToPropValueVariableNameMap.forEach((variableName, propId) => {
      const qb = new DgraphQueryBuilder()
        .withUidFunc(propId)
        .withFields(
          new DgraphQueryField(DgraphPropFields.value).withInnerFields(
            `${variableName} as uid`,
          ),
        )
        .withQueryName(variableName + 'Query')

      qbs.push(qb)
    })

    return compileMultiple(qbs)
  }

  buildMutation(): Mutation {
    const mu = super.buildMutation()

    if (this.valuesToDelete.length > 0) {
      const deleteFields = _.flatMap(
        this.valuesToDelete.map(({ valueId, propId }) => {
          const triples = []

          if (!propId.startsWith('_')) {
            triples.push(new DgraphTriple(propId, DgraphPropFields.value, '*'))
          }

          if (!valueId.startsWith('_')) {
            triples.push(new DgraphTriple(valueId, '*', '*'))
          }

          return triples
        }),
      )

      mu.setDelNquads(compileMultiple(deleteFields, { multiline: true }))
    }

    return mu
  }

  buildRequest(): Request {
    const request = new Request()
    const mu = this.buildMutation()
    const q = this.buildQuery()

    request.setQuery(q)
    request.setMutationsList([mu])

    return request
  }
}
