'use client'

import { cn } from '@cui/utils'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons'
import { forwardRef } from 'react'

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ children, className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    className={cn(
      `
        flex cursor-default select-none
        items-center rounded-sm px-2
        py-1.5 text-sm outline-none
        data-[state=open]:bg-accent data-[state=open]:text-accent-foreground
        focus:bg-accent focus:text-accent-foreground
      `,
      inset && 'pl-8',
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto size-4" />
  </ContextMenuPrimitive.SubTrigger>
))

ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    className={cn(
      `
        z-50 min-w-[8rem] overflow-hidden
        rounded-md border bg-popover
        p-1 text-popover-foreground shadow-lg
        data-[side=bottom]:slide-in-from-top-2
        data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2
        data-[side=top]:slide-in-from-bottom-2
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=closed]:zoom-out-95
        data-[state=open]:animate-in data-[state=open]:fade-in-0
        data-[state=open]:zoom-in-95
      `,
      className,
    )}
    ref={ref}
    {...props}
  />
))

ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      className={cn(
        `
          z-50 min-w-[8rem] overflow-hidden
          rounded-md border bg-popover
          p-1 text-popover-foreground shadow-md
          data-[side=bottom]:slide-in-from-top-2
          data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=closed]:zoom-out-95
          data-[state=open]:animate-in data-[state=open]:fade-in-0
          data-[state=open]:zoom-in-95
        `,
        className,
      )}
      ref={ref}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))

ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    className={cn(
      `
        relative flex cursor-default
        select-none items-center rounded-sm
        px-2 py-1.5 text-sm
        outline-none
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50
        focus:bg-accent focus:text-accent-foreground
      `,
      inset && 'pl-8',
      className,
    )}
    ref={ref}
    {...props}
  />
))

ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ checked, children, className, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(
      `
        relative flex cursor-default
        select-none items-center rounded-sm
        py-1.5 pl-8 pr-2
        text-sm outline-none
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50
        focus:bg-accent focus:text-accent-foreground
      `,
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))

ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ children, className, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    className={cn(
      `
        relative flex cursor-default
        select-none items-center rounded-sm
        py-1.5 pl-8 pr-2
        text-sm outline-none
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50
        focus:bg-accent focus:text-accent-foreground
      `,
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="size-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))

ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    className={cn(
      'px-2 py-1.5 text-sm font-semibold text-foreground',
      inset && 'pl-8',
      className,
    )}
    ref={ref}
    {...props}
  />
))

ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    ref={ref}
    {...props}
  />
))

ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

ContextMenuShortcut.displayName = 'ContextMenuShortcut'

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
}
