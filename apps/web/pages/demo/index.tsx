import { GetAtomsGql } from '@codelab/shared/codegen/graphql'
import { Image } from 'antd'
import axios from 'axios'
import React from 'react'

const DemoPage = async () => {
  const a = await axios.post(
    'http://127.0.0.1:3333/graphql/',
    {
      query: GetAtomsGql,
      variables: {},
    },
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ii1jbE5zT21jc1NTSHdocTNKWUltRCJ9.eyJpc3MiOiJodHRwczovL2NvZGVsYWItYWktZGV2LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJWTE00dVY0WEtTb1o5TW1oMEU3amZicTVQaTBBazd6R0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9jb2RlbGFiLWFpLWRldi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTYyOTgxMTg0MCwiZXhwIjoxNjI5ODk4MjQwLCJhenAiOiJWTE00dVY0WEtTb1o5TW1oMEU3amZicTVQaTBBazd6RyIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.DLGeYYgfQFIR84Y9_bVuF3fGbdeGL6lm8oO9L2cBOHSMR5E3yqHC6vFhdwPIxWRqmGhOQRvtfbJA08WogRpplBdfrjPwF2EY313sbuamLCkU7veCYGCMhqPSaIIZ3S2OSv98smM0kt_6Jq-IPvtdmXx9OczC1L8SAbz-ZsUbsthFgo8aMUDAFoGnr0pAZALkfikhupTl2-GInXQpRxzoSAlZ6BdKPsDcLXouCO3HZpwDySvgyVkVf0qWKH45QTDmucPyrgin1_H695ay_31ixcDjc29W19EYtUcnbF0TjC1-zqJXojHooTxUg8I-hfrYpMFmxHLv6rrbeGmW3RTJhQ`,
      },
    },
  )

  console.log(a)

  return (
    <>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </>
  )
}

export default DemoPage
