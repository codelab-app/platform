export const showFieldOnDev = () => {
  if (process.env.NODE_ENV === 'development') {
    return {}
  }

  return {
    uniforms: {
      component: () => null,
    },
  }
}

export const hideField = {
  uniforms: {
    component: () => null,
  },
}

export const idField = {
  id: {
    type: 'string',
    nullable: true,
    ...hideField,
  },
}
