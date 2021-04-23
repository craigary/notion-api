import { NotionAPI } from 'notion-client'
import { getTextContent } from 'notion-utils'

module.exports = async (req, res) => {
  const api = new NotionAPI()
  const id = req.query.id.toString()
  const response = await api.getPage(id)
  // the Collection contains the page meta info
  const collection = Object.values(response.collection)[0].value

  const properties = {}
  Object.entries(collection.schema).forEach(([key, val]) => {
    const property = {}
    property.id = key
    property.type = val.type
    property[val.type] = {}
    if (Object.entries(val)[2]) {
      property[val.type][Object.entries(val)[2][0]] = Object.entries(val)[2][1]
    }
    properties[val.name] = property
  })
  const data = {
    object: 'database',
    id: collection.parent_id,
    title: [
      {
        type: 'text',
        plain_text: getTextContent(collection.name)
      }
    ],
    properties
  }
  res.send(data)
}
