import type {
  Filterables,
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
  dataRefs: Map<string, T>
  filter: U
  isLoading: boolean
  pageSize: number
  totalItems: number
}

const createPaginationAtomFamily = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>() => {
  return atomFamily((key: string) => {
    const baseAtom = atom<PaginationState<T, U>>({
      currentPage: 1,
      dataRefs: new Map(),
      filter: {} as U,
      isLoading: true,
      pageSize: 20,
      totalItems: 0,
    })

    const derivedAtom = atom(
      (get) => {
        const state = get(baseAtom)

        return {
          ...state,
          data: sortBy(Array.from(state.dataRefs.values()), (item) =>
            item.name.toLowerCase(),
          ),
        }
      },
      (get, set, update: Partial<PaginationState<T, U>>) => {
        set(baseAtom, { ...get(baseAtom), ...update })
      },
    )

    return derivedAtom
  })
}

export const usePaginationService = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>(
  key: 'atom',
  getDataFn: (
    page: number,
    pageSize: number,
    filter: U,
  ) => Promise<{ items: Array<T>; totalItems: number }>,
) => {
  const paginationAtomFamily = createPaginationAtomFamily<T, U>()
  const [state, setState] = useAtom(paginationAtomFamily(key))
  const setCurrentPage = (page: number) => setState({ currentPage: page })
  const setPageSize = (size: number) => setState({ pageSize: size })
  const setFilter = (filter: U) => setState({ filter })

  const getData = async () => {
    setState({ isLoading: true })

    const { items, totalItems } = await getDataFn(
      state.currentPage,
      state.pageSize,
      state.filter,
    )

    const newDataRefs = new Map(items.map((item) => [item.id, item]))

    setState({
      dataRefs: newDataRefs,
      isLoading: false,
      totalItems,
    })

    return items
  }

  return {
    ...state,
    getData,
    setCurrentPage,
    setFilter,
    setPageSize,
  }
}
