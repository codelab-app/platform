import {
  DgraphEntityType,
  ITransaction,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { AtomSchema, IAtom } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'
import { GetAtomInput } from './get-atom.input'
import { GetAtomRequest } from './get-atom.request'

@Injectable()
export class GetAtomService
  extends DgraphUseCase<GetAtomRequest, Nullable<IAtom>>
  implements UseCasePort<GetAtomRequest, Nullable<IAtom>>
{
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected schema = AtomSchema.nullable()

  async executeTransaction(
    { input }: GetAtomRequest,
    txn: ITransaction,
  ): Promise<Nullable<IAtom>> {
    GetAtomService.validate(input)

    const {
      where: { id, type, element },
    } = input

    if (id) {
      return this.dgraph.getOneNamed(
        txn,
        GetAtomService.createGetByIdQuery(id),
        'query',
      )
    }

    if (type) {
      return this.dgraph.getOneNamed<IAtom>(
        txn,
        GetAtomService.createGetByType(type),
        'query',
      )
    }

    if (element) {
      return this.dgraph.getOneNamed<IAtom>(
        txn,
        GetAtomService.getAtomByElementQuery(element),
        'query',
      )
    }

    throw new Error('Bad input to GetAtomsService')
  }

  private static createGetByIdQuery(id: string) {
    return GetAtomService.getAtomQuery(`@filter(uid(${id}))`)
  }

  private static createGetByType(type: string) {
    return GetAtomService.getAtomQuery(`@filter(eq(atomType, ${type}))`)
  }

  public static getAtomByElementQuery(elementId: string) {
    return GetAtomService.getAtomQuery(
      `@filter(uid(ATOM_ID))`,
      `
      var (func: uid(${elementId})) @filter(type(${DgraphEntityType.Element})) {
        atom {
          ATOM_ID as uid
        }
      }`,
    )
  }

  public static getAtomQuery(filter?: string, extraQuery?: string) {
    return `{
      ${extraQuery ?? ''}
      query(func: type(${DgraphEntityType.Atom})) ${filter ?? ''} {
        id: uid
        type: atomType
        name
        api {
          id: uid
          expand(_all_)
        }
        tags
      }
    }`
  }

  private static validate({ where: { id, element, type } }: GetAtomInput) {
    if ([id, element, type].filter((f) => !!f).length !== 1) {
      throw new Error('Provide exactly one filter to GetAtomService')
    }
  }
}
