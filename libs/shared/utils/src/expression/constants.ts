export const EXP_PATH_TEMPLATE_START = '{{'
export const EXP_PATH_TEMPLATE_START_REGEX = /\{\{/g

export const EXP_PATH_TEMPLATE_END = '}}'
export const EXP_PATH_TEMPLATE_END_REGEX = /}}/g
// start bracket that is not closed with }}
export const EXP_PATH_TEMPLATE_START_OPEN_REGEX = /\{\{(?!(.+)?}})/g

export const EXP_PATH_TEMPLATE_REGEX = /\{\{.*?\}\}/g
