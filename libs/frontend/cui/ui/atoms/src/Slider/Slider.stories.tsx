import { cn } from '@cui/utils'
import { Slider } from './Slider'

export default {
  component: Slider,
  title: 'Atoms/Slider',
}

type SliderProps = React.ComponentProps<typeof Slider>

export const Default = {
  args: {},
  render: ({ className, ...props }: SliderProps) => {
    return (
      <Slider
        className={cn('w-[60%]', className)}
        defaultValue={[50]}
        max={100}
        step={1}
        {...props}
      />
    )
  },
}
