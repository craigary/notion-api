import { NotionAPI } from 'notion-client'
import { getTextContent, idToUuid } from 'notion-utils'
import getAllPageIds from '../../../lib/getAllPageIds'
import getPageProperties from '../../../lib/getPageProperties'
import getMetadata from '../../../lib/getMetadata'

module.exports = async (req, res) => {
  try {
    let id = req.query.id.toString()
    const vId = req.query.v.toString() || null
    const api = new NotionAPI()
    const response = await api.getPage(id)

    id = idToUuid(id)
    const collection = Object.values(response.collection)[0]?.value
    const collectionQuery = response.collection_query
    const schema = collection?.schema
    const block = response.block

    const rawMetadata = block[id].value

    // Check Type
    if (rawMetadata?.type !== 'collection_view_page') {
      res.status(406).send({ message: `pageId "${id}" is not a database` })
    } else {
      // Construct Meta
      const metadata = getMetadata(rawMetadata)

      // Construct Data
      const pageIds = getAllPageIds(collectionQuery, vId)
      const data = []
      for (let i = 0; i < pageIds.length; i++) {
        const id = pageIds[i]
        const properties = await getPageProperties(id, block, schema)
        data.push(properties)
      }

      const responseData = {
        type: 'database',
        id,
        title: getTextContent(collection.name),
        metadata,
        data
      }

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
      res.status(200).send(responseData)
    }
  } catch (error) {
    res.status(404)
    res.send({
      message: error.message
    })
  }
}
