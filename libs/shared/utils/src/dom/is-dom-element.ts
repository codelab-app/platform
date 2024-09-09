export const isDomElement = (value: unknown): boolean =>
  value instanceof Element || value instanceof HTMLDocument
