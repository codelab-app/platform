import { cn } from '@cui/utils'
import { forwardRef } from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './NavigationMenu'

export default {
  component: NavigationMenu,
  title: 'Atoms/NavigationMenu',
}

const components: Array<{ title: string; href: string; description: string }> =
  [
    {
      description:
        'A modal dialog that interrupts the user with important content and expects a response.',
      href: '/docs/primitives/alert-dialog',
      title: 'Alert Dialog',
    },
    {
      description:
        'For sighted users to preview content available behind a link.',
      href: '/docs/primitives/hover-card',
      title: 'Hover Card',
    },
    {
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
      href: '/docs/primitives/progress',
      title: 'Progress',
    },
    {
      description: 'Visually or semantically separates content.',
      href: '/docs/primitives/scroll-area',
      title: 'Scroll-area',
    },
    {
      description:
        'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
      href: '/docs/primitives/tabs',
      title: 'Tabs',
    },
    {
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
      href: '/docs/primitives/tooltip',
      title: 'Tooltip',
    },
  ]

export const NavigationMenuDemo = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className={`
                grid gap-3 p-4
                lg:w-[500px] lg:grid-cols-[.75fr_1fr]
                md:w-[400px]
              `}
            >
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className={`
                      flex size-full select-none
                      flex-col justify-end rounded-md
                      bg-gradient-to-b from-muted/50 to-muted
                      p-6 no-underline outline-none
                      focus:shadow-md
                    `}
                    href="/"
                  >
                    {/* <Icons.logo className="size-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className={`
                grid w-[400px] gap-3
                p-4
                lg:w-[600px]
                md:w-[500px] md:grid-cols-2
              `}
            >
              {components.map((component) => (
                <ListItem
                  href={component.href}
                  key={component.title}
                  title={component.title}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ children, className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            `
              block select-none space-y-1
              rounded-md p-3 leading-none
              no-underline outline-none transition-colors
              focus:bg-accent focus:text-accent-foreground
              hover:bg-accent hover:text-accent-foreground
            `,
            className,
          )}
          ref={ref}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = 'ListItem'

export const Default = {
  args: {},
  render: () => <NavigationMenuDemo />,
}
