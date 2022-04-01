import { Element } from '../store/Element'

export const mapElementOption = (e: Element) => ({
  value: e.id,
  childrenIds: e.childrenSorted.map((c) => c.id),
  label: e.label,
})
