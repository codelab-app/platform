interface IRjsfMultipleChoice {
	type: 'string' | 'number' | 'integer' | 'boolean'
	choices: any[]
}

export const RjsfMultipleChoice = (props: IRjsfMultipleChoice) => (
	target: {} | any,
	name?: PropertyKey,
): any => {
	//
}
