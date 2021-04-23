import { NotionAPI } from 'notion-client'

module.exports = async (req, res) => {
  const api = new NotionAPI()
  let id = req.query.id.toString()
  id = 'e35f56ddec204a41b65444e3872c4ae2'
  const response = await api.getPage(id)
  res.send(response.block)
}
