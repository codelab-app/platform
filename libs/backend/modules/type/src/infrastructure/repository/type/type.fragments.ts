export const enumTypeValueFragment = `
            id: uid
            name
            value: stringValue
        `

/** Use with @normalize */
export const fieldFragment = `
            id: uid
            key: key
            name: name
            description: description
            type {
              target: uid
            }
            ~fields {
              source: uid
            }
        `

export const typeFragment = `
          id: uid
          name
          typeKind
          owner {
            id: uid
          }

          itemType {
            id: uid
          }
          elementKind
          allowedValues (orderasc: order) {
           ${enumTypeValueFragment}
          }
          primitiveKind
          fields (orderasc: order) @normalize  {
            ${fieldFragment}
          }
          typesOfUnionType(orderasc: order) {
            id: uid
          }
          language
        `
