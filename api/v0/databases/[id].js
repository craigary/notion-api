import { NotionAPI } from 'notion-client'
import { getTextContent, getDateValue } from 'notion-utils'

module.exports = async (req, res) => {
  // Query Database
  const api = new NotionAPI()
  const id = req.query.id.toString()
  const response = await api.getPage(id)
  const collection = Object.values(response.collection)[0].value

  // Get all pageIDs & turn into an Array
  const pageSet = new Set()
  const collectionQueries = Object.values(response.collection_query)[0]
  Object.values(collectionQueries).forEach(query => {
    query.blockIds.forEach(id => pageSet.add(id))
  })

  const pageIDs = [...pageSet]

  // Get Schema
  const schema = collection.schema

  // Get All Blocks
  const block = response.block

  const getPageProperties = async (id, block, schema) => {
    const rawProperties = Object.entries(block[id].value.properties)
    const excludeProperties = ['date', 'select', 'multi_select', 'person']
    const properties = {}
    for (let i = 0; i < rawProperties.length; i++) {
      const [key, val] = rawProperties[i]
      properties.id = id
      if (!excludeProperties.includes(schema[key].type)) {
        properties[schema[key].name] = getTextContent(val)
      } else {
        switch (schema[key].type) {
          case 'date': {
            const dateProperty = getDateValue(val)
            delete dateProperty.type
            properties[schema[key].name] = dateProperty
            break
          }
          case 'select':
          case 'multi_select': {
            const selects = getTextContent(val)
            if (selects[0]?.length) {
              properties[schema[key].name] = selects.split(',')
            }
            break
          }
          case 'person': {
            const rawUsers = val.flat()
            const users = []
            for (let i = 0; i < rawUsers.length; i++) {
              if (rawUsers[i][0][1]) {
                const userId = rawUsers[i][0]
                const res = await api.getUsers(userId)
                const resValue =
                  res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value
                const user = {
                  id: resValue?.id,
                  first_name: resValue?.given_name,
                  last_name: resValue?.family_name,
                  profile_photo: resValue?.profile_photo
                }
                users.push(user)
              }
            }
            properties[schema[key].name] = users
            break
          }
          default:
            break
        }
      }
    }
    return properties
  }

  const data = []
  for (let i = 0; i < pageIDs.length; i++) {
    const id = pageIDs[i]
    const properties = await getPageProperties(id, block, schema)
    data.push(properties)
  }

  res.setHeader('content-type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  res.send(data)
}
