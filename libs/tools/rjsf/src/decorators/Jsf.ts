import 'reflect-metadata';

interface IJsf {
  type: 'object'
  title?: string
  description?: string
  dependencies?: any
  required?: string[]
}

const metadataKey = 'Jsf'

export const Jsf = (props: IJsf) => {
  return (target: Function) => {
    Reflect.defineMetadata(metadataKey, props, target);
  }
}

export const getJsfProps = (target: Function) => {
  return Reflect.getOwnMetadata(metadataKey, target);
}
