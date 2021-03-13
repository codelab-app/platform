interface IRjsfEnum {
	enum: any[]
	enumNames?: string[]
	noChoiceValue?: any
}

export const RjsfEnum = (props: IRjsfEnum) => (
	target: {} | any,
	name?: PropertyKey,
): any => {
	//
}
