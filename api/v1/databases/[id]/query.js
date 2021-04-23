import { NotionAPI } from 'notion-client'
// import { getTextContent } from 'notion-utils'

module.exports = async (req, res) => {
  const api = new NotionAPI()
  const id = req.query.id.toString()
  const response = await api.getPage(id)
  // the Collection contains the page meta info
  const collection = Object.values(response.collection)[0].value
  const data = {
    object: 'list',
    id: collection.parent_id,
    // title: [
    //   {
    //     type: 'text',
    //     plain_text: getTextContent(collection.name)
    //   }
    // ],
    results: [],
    has_more: false,
    next_cursor: null
  }
  res.send(data)
}
