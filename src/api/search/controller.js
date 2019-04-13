import { getHTML, findItemInfoDDTech, findItemInfoCyberPuerta } from '../../services/scraper'

const ddTechUrl = 'https://ddtech.mx/buscar/'
const cyberPuertaUrl =
  'https://www.cyberpuerta.mx/index.php?stoken=2FB8262A&lang=0&cl=search&searchparam='

export const index = async ({ query: { term }, querymen: { cursor } }, res, next) => {
  const searchTerm = term.replace(/\s+/g, '+')
  const [ddHtml, cpHtml] = await Promise.all([
    getHTML(`${ddTechUrl}${searchTerm}`),
    getHTML(`${cyberPuertaUrl}${searchTerm}`)
  ])
  const prop = Object.keys(cursor.sort)[0]
  const result = [...findItemInfoDDTech(ddHtml), ...findItemInfoCyberPuerta(cpHtml)]
  const data = limitResults(result, cursor).sort(dynamicSort(prop, cursor.sort[prop]))
  res.status(200).json({
    itemsFound: result.length,
    limit: cursor.limit,
    skip: cursor.skip,
    data
  })
}

const limitResults = (arr = [], { skip, limit }) => arr.slice(skip, limit + skip)

const dynamicSort = (prop, sortOrder) => (a, b) =>
  (a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0) * sortOrder
