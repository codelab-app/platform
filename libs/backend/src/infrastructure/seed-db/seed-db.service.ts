import { Inject, Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js'
import { DgraphProvider, DgraphTokens } from '../dgraph'

@Injectable()
export class SeedDbService {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
  ) {}

  async seedDB() {
    return await this.transactionWrapper(async (txn) => {
      await this.seedAtoms(txn)
    })
  }

  async seedSampleLib() {
    return await this.transactionWrapper(async (txn) => {
      await this.seedAtomsAndLibraries(txn)
    })
  }

  private async seedAtoms(txn: Txn) {
    const mu = new Mutation()
    const ATOM_UID = '_:atom_id'
    const INTERFACE_UID = '_:interface_id'

    const atoms = {
      uid: ATOM_UID,
      'Atom.type': 'AntDesignButton',
      'Atom.label': 'Button',
      'Atom.propTypes': {
        uid: INTERFACE_UID,
        'Interface.atom': { uid: ATOM_UID },
        'Interface.fields': [
          this.createField(
            '_:' + 'block' + '_id',
            INTERFACE_UID,
            'block',
            'Option to fit button width to its parent width',
            'boolean',
          ),
          this.createField(
            '_:' + 'danger' + '_id',
            INTERFACE_UID,
            'danger',
            'Set the danger status of button',
            'boolean',
          ),
          this.createField(
            '_:' + 'disabled' + '_id',
            INTERFACE_UID,
            'disabled',
            'Disabled state of button',
            'boolean',
          ),
          this.createField(
            '_:' + 'ghost' + '_id',
            INTERFACE_UID,
            'ghost',
            'Make background transparent and invert text and border colors',
            'boolean',
          ),
          this.createField(
            '_:' + 'href' + '_id',
            INTERFACE_UID,
            'href',
            'Redirect url of link button',
            'string',
          ),
          this.createField(
            '_:' + 'htmlType' + '_id',
            INTERFACE_UID,
            'htmlType',
            'Set the original html type of button',
            'string',
          ),
          this.createField(
            '_:' + 'icon' + '_id',
            INTERFACE_UID,
            'icon',
            'Set the icon component of button',
            'ReactNode',
          ),
          this.createField(
            '_:' + 'loading' + '_id',
            INTERFACE_UID,
            'loading',
            'Set the loading status of button',
            'boolean | { delay: number }',
          ),
          this.createField(
            '_:' + 'shape' + '_id',
            INTERFACE_UID,
            'shape',
            'Can be set button shape',
            'circle | round',
          ),
          this.createField(
            '_:' + 'size' + '_id',
            INTERFACE_UID,
            'size',
            'Set the size of button',
            'large | middle | small',
          ),
          this.createField(
            '_:' + 'target' + '_id',
            INTERFACE_UID,
            'target',
            'Same as target attribute of a, works when href is specified',
            'string',
          ),
          this.createField(
            '_:' + 'type' + '_id',
            INTERFACE_UID,
            'type',
            'Can be set to primary ghost dashed link text default',
            'string',
          ),
          this.createField(
            '_:' + 'onClick' + '_id',
            INTERFACE_UID,
            'onClick',
            'Set the handler to handle click event',
            '(event) => void',
          ),
        ],
      },
    }

    mu.setSetJson(atoms)

    await txn.mutate(mu)
    await txn.commit()
  }

  private createField(
    uid: string,
    interfaceUid: string,
    name: string,
    description: string,
    type?: string,
  ) {
    return {
      uid: uid,
      'Field.interface': { uid: interfaceUid },
      'Field.key': name,
      'Field.label': name,
      'Field.description': description,
      'Field.type': {
        // 'uid': '_:type_id',
        'Type.name': type,
      },
    }
  }

  private async seedAtomsAndLibraries(txn: Txn) {
    const mu = new Mutation()
    const OWNER_ID = 'seed-user-test-id'
    const LIB_UID = '_:root_lib'
    const ATOM_UID = '_:atom_id'
    const INTERFACE_UID = '_:interface_id'

    const lib_data = {
      uid: LIB_UID,
      'Library.name': 'Root Library',
      'Library.ownerId': OWNER_ID,
      'Library.atoms': [
        {
          uid: ATOM_UID,
          'Atom.library': { uid: LIB_UID },
          'Atom.type': 'AntDesignButton',
          'Atom.label': 'Button',
          'Atom.propTypes': {
            uid: INTERFACE_UID,
            'Interface.atom': { uid: ATOM_UID },
            'Interface.fields': [
              {
                uid: '_:block_id',
                'Field.interface': { uid: INTERFACE_UID },
                'Field.key': 'block',
                'Field.label': 'block',
                'Field.description':
                  'Option to fit button width to its parent width',
              },
              {
                uid: '_:danger_id',
                'Field.interface': { uid: INTERFACE_UID },
                'Field.key': 'danger',
                'Field.label': 'danger',
                'Field.description': 'Set the danger status of button',
              },
            ],
          },
        },
      ],
    }

    mu.setSetJson(lib_data)

    const mutationResultLib = await txn.mutate(mu)
    const fieldUid = mutationResultLib.getUidsMap().get('block_id')
    const uidMap = mutationResultLib.getUidsMap()

    const prop = {
      'Prop.field': { uid: fieldUid },
      'Prop.value': {
        'BooleanValue.booleanValue': 'true',
      },
    }

    const propMutation = new Mutation()
    propMutation.setSetJson(prop)
    await txn.mutate(propMutation)

    await txn.commit()
  }

  private async seedAppWithPage(txn: Txn) {
    const mu = new Mutation()

    const d = {
      uid: '_:codelab_app',
      'App.name': 'Codelab Test App',
      'App.pages': [
        {
          'Page.name': 'Page Root',
          'Page.app': {
            uid: '_:codelab_app',
          },
        },
      ],
    }

    mu.setSetJson(d)

    const mutationResult = await txn.mutate(mu)

    // const uid = mutationResult.getUidsMap()

    await txn.commit()
  }

  private async transactionWrapper<TResult>(
    execute: (txn: Txn) => Promise<TResult>,
  ) {
    const txn = this.dgraphProvider.client.newTxn()

    try {
      return await execute(txn)
    } finally {
      await txn.discard()
    }
  }
}
