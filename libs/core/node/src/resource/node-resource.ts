import { Resource } from 'rest-hooks'

export class ResourceNode extends Resource {
  readonly id: string | undefined = undefined

  readonly type: string = ''

  pk(parent: any, key: string): string | undefined {
    // return this.id?.toString() ?? this._id?.toString()
    return this.id
  }

  static formShape<T extends typeof Resource>(this: T) {
    const shape = super.listShape()

    return {
      ...shape,
      fetch: async (params: any) => {
        const data: any = await shape.fetch(params)

        console.log(data, typeof data)

        const list = data.map((item: any) => {
          return {
            ...item,
            id: item._id,
            key: item._id,
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

        console.log(data, typeof data)

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

        console.log(data, typeof data)

        return {
          ...data,
          id: data._id,
        }
      },
    }
  }

  static urlRoot = `${process.env.NEXT_PUBLIC_API_ORIGIN}/${process.env.NEXT_PUBLIC_API_PATHNAME}/node`
}
