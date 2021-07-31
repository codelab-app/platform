import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { DgraphRepository } from '../dgraph'

@Injectable()
export class SeedDbService {
  constructor(protected readonly dgraph: DgraphRepository) {}

  async seedDB() {
    return await this.dgraph.transactionWrapper(async (txn) => {
      await this.seedAtoms(txn)
    })
  }

  async seedSampleLib() {
    return await this.dgraph.transactionWrapper(async (txn) => {
      await this.seedAtomsAndLibraries(txn)
    })
  }

  private async seedAtoms(txn: Txn) {
    const mu: Mutation = {}
    const ATOM_UID = '_:atom_id'
    const INTERFACE_UID = '_:interface_id'

    const atoms = {
      uid: ATOM_UID,
      atomType: 'AntDesignButton',
      name: 'Button',
      api: {
        uid: INTERFACE_UID,
        fields: [
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

    mu.setJson = atoms

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
      uid,
      key: name,
      name,
      description,
      type: {
        // 'uid': '_:type_id',
        'Type.name': type,
      },
    }
  }

  private async seedAtomsAndLibraries(txn: Txn) {
    const mu: Mutation = {}
    const OWNER_ID = 'seed-user-test-id'
    const LIB_UID = '_:root_lib'
    const ATOM_UID = '_:atom_id'
    const INTERFACE_UID = '_:interface_id'

    const lib_data = {
      uid: LIB_UID,
      name: 'Root Library',
      ownerId: OWNER_ID,
      atoms: [
        {
          uid: ATOM_UID,
          atomType: 'AntDesignButton',
          name: 'Button',
          api: {
            uid: INTERFACE_UID,
            fields: [
              {
                uid: '_:block_id',
                key: 'block',
                name: 'block',
                description: 'Option to fit button width to its parent width',
              },
              {
                uid: '_:danger_id',
                key: 'danger',
                name: 'danger',
                description: 'Set the danger status of button',
              },
            ],
          },
        },
      ],
    }

    mu.setJson = lib_data

    const mutationResultLib = await txn.mutate(mu)
    const fieldUid = mutationResultLib.data.uids['block_id']

    const prop = {
      field: { uid: fieldUid },
      value: {
        booleanValue: 'true',
      },
    }

    const propMutation: Mutation = {
      setJson: prop,
    }

    await txn.mutate(propMutation)

    await txn.commit()
  }

  private async seedAppWithPage(txn: Txn) {
    const d = {
      uid: '_:codelab_app',
      name: 'Codelab Test App',
      pages: [
        {
          name: 'Page',
          root: {
            name: 'Page Root',
          },
        },
      ],
    }

    const mutationResult = await txn.mutate({
      setJson: d,
    })

    // const uid = mutationResult.getUidsMap()

    await txn.commit()
  }
}
