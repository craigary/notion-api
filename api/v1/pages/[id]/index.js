import { NotionAPI } from 'notion-client'

module.exports = async (req, res) => {
  const api = new NotionAPI()
  const id = req.query.id.toString()
  const response = await api.getPage(id)

  const data = {
    object: 'list',
    id: 123,
    parent: 123,
    properties: {},
    archived: false,
    created_time: 123,
    last_edited_time: null
  }
  res.send(data)
}
