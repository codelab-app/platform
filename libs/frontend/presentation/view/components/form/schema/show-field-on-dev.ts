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
