import { useContext } from 'react'
import { CuiContext } from './CuiContext'

export const useCui = () => useContext(CuiContext) as CuiContext
