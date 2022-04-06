import { Element } from '../store/element.model'

export const mapElementOption = (e: Element) => ({
  value: e.id,
  childrenIds: e.childrenSorted.map((c) => c.id),
  label: e.label,
})
