import Ajv from 'ajv'
import { vehicleSchema } from './VehicleSchema'

const vehicleData = {
  'nc:VehicleAxleQuantity': 4,
  'nc:Amount': 60000.0,
  'nc:Currency': 'USD',
  'nc:VehicleIdentification': {
    'nc:IdentificationID': 'my-vehicle-id',
  },
}

describe('VehicleSchema', () => {
  it('validates', () => {
    const ajv = new Ajv()
    const validate = ajv.compile(vehicleSchema)
    const valid = validate(vehicleData)

    expect(valid).toBeTruthy()
  })
})
