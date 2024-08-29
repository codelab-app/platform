import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Button } from '../Button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer'

export default {
  component: Drawer,
  title: 'Atoms/Drawer',
}

const DrawerDemo = () => {
  const [goal, setGoal] = React.useState(350)

  const onClick = (adjustment: number) => {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                className="size-8 shrink-0 rounded-full"
                disabled={goal <= 200}
                onClick={() => onClick(-10)}
                size="icon"
                variant="outline"
              >
                <MinusIcon className="size-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                className="size-8 shrink-0 rounded-full"
                disabled={goal >= 400}
                onClick={() => onClick(10)}
                size="icon"
                variant="outline"
              >
                <PlusIcon className="size-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            {/* <div className="mt-3 h-[120px]">
              <ResponsiveContainer height="100%" width="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: 'hsl(var(--foreground))',
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div> */}
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export const Default = {
  args: {},
  render: () => <DrawerDemo />,
}
