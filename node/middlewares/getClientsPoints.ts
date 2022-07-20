import { DATA_ENTITY } from '../utils/constants'

export async function getClientsPoints(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { masterdata },
  } = ctx
  ctx.status = 200

  const userId = ctx.vtex.route.params.userId

  const documentos = await masterdata.searchDocuments<
    Octopontos
  >({
    dataEntity: DATA_ENTITY,
    fields: ['id', 'userId', 'pontos'],
    where: `userId=${userId}`,
    pagination: {
      page: 1,
      pageSize: 1
    },
    schema: 'v0'
  })
  ctx.body = documentos ? documentos[0] : null

  await next()
}
interface Octopontos {
  id: string
  userId: string
  pontos: number
}