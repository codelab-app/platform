import { v4 as uuidv4 } from 'uuid'
import { CytoscapeI } from './factory'

export const v_0 = uuidv4()
export const v_1_0 = uuidv4()
export const v_1_1 = uuidv4()
export const v_2_0 = uuidv4()
export const v_2_1 = uuidv4()

export const e_A = uuidv4()
export const e_B = uuidv4()
export const e_C = uuidv4()
export const e_D = uuidv4()

export const input: CytoscapeI = {
  vertices: [
    { id: v_0, label: 'v_0' },
    { id: v_1_0, label: 'v_1_0' },
    { id: v_1_1, label: 'v_1_1' },
    { id: v_2_0, label: 'v_2_0' },
    { id: v_2_1, label: 'v_2_1' },
  ],
  edges: [
    { id: e_A, start: v_0, end: v_1_0 },
    { id: e_B, start: v_0, end: v_1_1 },
    { id: e_C, start: v_1_0, end: v_2_0 },
    { id: e_D, start: v_1_0, end: v_2_1 },
  ],
}
