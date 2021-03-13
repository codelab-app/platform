interface IRjsfNumber {
	// minimum, maximum, multipleOf can be used if type is 'number' or 'integer'
	minimum?: number
	maximum?: number
	multipleOf?: number
	// minimum, maximum, multipleOf can be used if type is 'number' or 'integer'
}

export const RjsfNumber = (props: IRjsfNumber) => (
	target: {} | any,
	name?: PropertyKey,
): any => {
	//
}
