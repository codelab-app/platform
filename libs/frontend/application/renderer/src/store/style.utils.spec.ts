import { parseCssStringIntoObject } from './style.utils'

describe('parseCssStringIntoObject', () => {
  it('should parse css string with nested blocks', () => {
    const unformattedCssWithNestedRules = `
    margin-top :    50px; 
    color: orange ; 
   
    p  { 
       color : orange;border:none;
   }
   
    *::after  {
     border:  1px solid red !important;
   top:12rem;
   }`

    const parsedCssString = parseCssStringIntoObject(
      unformattedCssWithNestedRules,
    )

    expect(parsedCssString).toEqual({
      '*::after': {
        border: '1px solid red !important',
        top: '12rem',
      },
      color: 'orange',
      'margin-top': '50px',
      p: {
        border: 'none',
        color: 'orange',
      },
    })
  })
})
