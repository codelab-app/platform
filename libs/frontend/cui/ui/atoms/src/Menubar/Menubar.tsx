'use client'

import { cn } from '@cui/utils'
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { forwardRef } from 'react'

const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    className={cn(
      `
        flex h-9 items-center
        space-x-1 rounded-md border
        bg-background p-1 shadow-sm
      `,
      className,
    )}
    ref={ref}
    {...props}
  />
))

Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    className={cn(
      `
        flex cursor-default select-none
        items-center rounded-sm px-3
        py-1 text-sm font-medium
        outline-none
        data-[state=open]:bg-accent data-[state=open]:text-accent-foreground
        focus:bg-accent focus:text-accent-foreground
      `,
      className,
    )}
    ref={ref}
    {...props}
  />
))

MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ children, className, inset, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
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
  </MenubarPrimitive.SubTrigger>
))

MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
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

MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { align = 'start', alignOffset = -4, className, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        align={align}
        alignOffset={alignOffset}
        className={cn(
          `
            z-50 min-w-[12rem] overflow-hidden
            rounded-md border bg-popover
            p-1 text-popover-foreground shadow-md
            data-[side=bottom]:slide-in-from-top-2
            data-[side=left]:slide-in-from-right-2
            data-[side=right]:slide-in-from-left-2
            data-[side=top]:slide-in-from-bottom-2
            data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
            data-[state=open]:animate-in data-[state=open]:fade-in-0
            data-[state=open]:zoom-in-95
          `,
          className,
        )}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
)

MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
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

MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ checked, children, className, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
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
      <MenubarPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))

MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ children, className, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
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
      <MenubarPrimitive.ItemIndicator>
        <DotFilledIcon className="size-4 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))

MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className,
    )}
    ref={ref}
    {...props}
  />
))

MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    ref={ref}
    {...props}
  />
))

MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
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

MenubarShortcut.displayname = 'MenubarShortcut'

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
