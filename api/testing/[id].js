import { NotionAPI } from 'notion-client'
module.exports = async (req, res) => {
  const id = req.query.id.toString()
  const api = new NotionAPI()
  const response = await api.getPage(id)
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  res.status(200).send(response)
}
