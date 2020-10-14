import { AbstractInstanceType, Resource, SimpleRecord } from 'rest-hooks'

export class ResourceNode extends Resource {
  readonly id: string | undefined = undefined

  readonly type: string = ''

  readonly children: Array<any> = []

  pk(parent: any, key: string): string | undefined {
    return this.id
  }

  static fromJS<T extends typeof SimpleRecord>(
    this: T, // Passed automatically
    props: Partial<AbstractInstanceType<T>> = {},
  ): any {
    return super.fromJS<typeof SimpleRecord>({
      ...props,
      id: (props as any)._id,
    })
  }

  static formShape<T extends typeof Resource>(this: T) {
    const shape = super.listShape()

    return {
      ...shape,
      fetch: async (params: any) => {
        const data: any = await shape.fetch(params)

        const list = data.map((item: any) => {
          const result = this.fromJS<typeof SimpleRecord>(item) as ResourceNode

          return {
            ...result,
            key: result.id,
          }
        })

        return list
      },
    }
  }

  static listShape<T extends typeof Resource>(this: T) {
    const shape = super.listShape()

    return {
      ...shape,
      fetch: async (params: any) => {
        const data: any = await shape.fetch(params)

        console.log(data)

        const list = data.map((item: any) => {
          return {
            ...item,
            id: item._id,
          }
        })

        return list
      },
    }
  }

  static detailShape<T extends typeof Resource>(this: T) {
    const shape = super.detailShape()

    return {
      ...shape,
      fetch: async (params: any) => {
        const data: any = await shape.fetch(params)

        const result = this.fromJS<typeof SimpleRecord>(data)

        return result
      },
    }
  }

  static urlRoot = `${process.env.NEXT_PUBLIC_API_ORIGIN}/${process.env.NEXT_PUBLIC_API_PATHNAME}/node`
}
