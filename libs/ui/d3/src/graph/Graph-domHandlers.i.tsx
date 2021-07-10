export type DomHandler<T> = (node: T, i: number, nodes: ArrayLike<T>) => any

export type DomHandlerHOC<T, M> = (mutation?: M) => DomHandler<T>
