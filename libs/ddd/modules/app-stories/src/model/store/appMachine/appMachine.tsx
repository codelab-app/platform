import { useMachine } from '@xstate/react'
import { atom, useRecoilValue } from 'recoil'
import { Machine } from 'xstate'

export const appMachine = Machine({
  id: 'app',
  type: 'parallel',
  states: {
    sidebar: {
      initial: 'active',
      states: {
        active: {
          on: {
            TOGGLE: 'inactive',
          },
        },
        inactive: {
          on: {
            TOGGLE: 'active',
          },
        },
      },
    },
  },
})

export const appMachineAtom = atom({
  key: 'appMachine',
  default: appMachine,
})

export const useAppMachine = () => {
  const app = useRecoilValue(appMachineAtom)
  const machine = useMachine(app)

  return machine
  // selector({
  //   key: 'createdAppMachine',
  //   get: ({ get }) => {
  //     const store = get(appStore)

  //     return useMachine(store)
  //   },
  // })
}
