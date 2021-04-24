import { NotionAPI } from 'notion-client'
import { getTextContent, idToUuid } from 'notion-utils'
import getAllPageIds from '../../../lib/getAllPageIds'
import getPageProperties from '../../../lib/getPageProperties'
import getMetadata from '../../../lib/getMetadata'

module.exports = async (req, res) => {
  const api = new NotionAPI()
  const id = idToUuid(req.query.id.toString())
  const response = await api.getPage(id)
  const collection = Object.values(response.collection)[0].value
  const collectionQuery = response.collection_query
  const schema = collection.schema
  const block = response.block

  // Construct Data
  const pageIds = getAllPageIds(collectionQuery)
  const data = []
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i]
    const properties = await getPageProperties(id, block, schema)
    data.push(properties)
  }

  // Construct Meta
  const rawMetadata = block[id].value
  const metadata = getMetadata(rawMetadata)

  const responseData = {
    type: 'database',
    id,
    title: getTextContent(collection.name),
    metadata,
    data
  }

  res.setHeader('content-type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  res.send(responseData)
}
