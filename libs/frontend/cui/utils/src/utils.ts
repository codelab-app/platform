import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: Array<ClassValue>) => {
  return twMerge(clsx(inputs))
}
