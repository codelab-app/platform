import { ElementModel } from '../store/ElementModel'

export const mapElementOption = (e: ElementModel) => ({
  value: e.id,
  childrenIds: e.children.map((c) => c.id),
  label: e.label,
})
