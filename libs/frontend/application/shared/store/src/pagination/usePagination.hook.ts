import type {
  Filterables,
  IPaginationService,
  SupportedPaginationModel,
} from '@codelab/frontend/abstract/application'
import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import sortBy from 'lodash/sortBy'

interface PaginationState<
  T extends SupportedPaginationModel,
  U extends Filterables,
> {
  currentPage: number
  data: Map<string, T>
  dataList: Array<T>
  filter: U
  isLoading: boolean
  pageSize: number
  totalItems: number
}

const paginationAtomFamily = atomFamily((key: string) => {
  const baseAtom = atom({
    currentPage: 1,
    data: new Map(),
    filter: {},
    isLoading: true,
    pageSize: 20,
    totalItems: 0,
  })

  const derivedAtom = atom(
    (get) => {
      const state = get(baseAtom)

      return {
        ...state,
        dataList: sortBy(Array.from(state.data.values()), (item) =>
          item.current.name.toLowerCase(),
        ),
      }
    },
    (
      get,
      set,
      update: Partial<PaginationState<SupportedPaginationModel, Filterables>>,
    ) => {
      set(baseAtom, { ...get(baseAtom), ...update })
    },
  )

  return derivedAtom
})

export const usePaginationService = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>(
  key: 'atom' | 'tag' | 'type',
  getDataFn: (
    page: number,
    pageSize: number,
    filter: U,
  ) => Promise<{ items: Array<T>; totalItems: number }>,
): IPaginationService<T, U> => {
  const [state, setState] = useAtom(paginationAtomFamily(key))
  const setCurrentPage = (page: number) => setState({ currentPage: page })
  const setPageSize = (size: number) => setState({ pageSize: size })
  const setFilter = (filter: U) => setState({ filter })

  const getData = async () => {
    setState({ isLoading: true })

    const { items, totalItems } = await getDataFn(
      state.currentPage,
      state.pageSize,
      state.filter as U,
    )

    setState({
      isLoading: false,
      totalItems,
    })

    return items.map((item) => item)
  }

  const setData = (item: T) => {
    setState({
      data: state.data.set(item.id, item),
    })
  }

  return {
    currentPage: state.currentPage,
    data: state.dataList,
    dataMap: state.data,
    filter: state.filter as U,
    getData,
    isLoading: state.isLoading,
    pageSize: state.pageSize,
    setCurrentPage,
    setData,
    setFilter,
    setPageSize,
    totalItems: state.totalItems,
  }
}
