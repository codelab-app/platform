import { getJsfProps } from './decorators/Jsf';
import { getJsfPropertyProps } from './decorators/JsfProperty';

export const generateSchema = (target: Function) => {
	const obj = getJsfProps(target)
	const props = getJsfPropertyProps(target)
	obj.properties = props
	return obj
}
