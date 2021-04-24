import { NotionAPI } from 'notion-client'

module.exports = async (req, res) => {
  const api = new NotionAPI()
  const id = req.query.id.toString()
  const response = await api.getPage(id)

  res.setHeader('content-type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  res.send(response)
}
