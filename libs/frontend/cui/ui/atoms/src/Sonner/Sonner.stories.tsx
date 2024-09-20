import { toast } from 'sonner'
import { Button } from '../Button'
import { Toaster } from './Sonner'

export default {
  //   component: Sonner,
  title: 'Atoms/Sonner',
}

export const Default = {
  args: {},
  render: () => (
    <div>
      <Button
        onClick={() =>
          toast('Event has been created', {
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
            description: 'Sunday, December 03, 2023 at 9:00 AM',
          })
        }
        variant="outline"
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  ),
}
