import { NotionAPI } from 'notion-client'
import { getTextContent, idToUuid } from 'notion-utils'

import getMetadata from '../../../lib/getMetadata'
import getPageProperties from '../../../lib/getPageProperties'

module.exports = async (req, res) => {
  try {
    let id = req.query.id.toString()
    const authToken = req.headers.authorization || null
    const api = new NotionAPI({ authToken })
    const response = await api.getPage(id)

    id = idToUuid(id)
    const block = response.block // don't use response.block[id] since we need to pass the entire block to response

    const rawMetadata = block[id].value

    if (rawMetadata?.type !== 'page') {
      res.status(406).send({ message: `pageId "${id}" is not a page` })
    } else {
      // Construct Meta
      const metadata = getMetadata(rawMetadata)

      const responseData = {
        type: 'page',
        id,
        title: getTextContent(rawMetadata.properties.title),
        metadata,
        block
      }

      // Check if it belongs to an Object, if so, push properties
      if (Object.keys(response.collection).length !== 0) {
        const collection = Object.values(response.collection)[0].value
        const schema = collection.schema
        const properties = await getPageProperties(id, block, schema)
        delete properties.id
        responseData.properties = properties
      }

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
      res.send(responseData)
    }
  } catch (error) {
    res.status(404)
    res.send({
      message: error.message
    })
  }
}
