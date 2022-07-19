import { DATA_ENTITY } from '../utils/constants'


export async function getClientsPoints(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { masterdata },
  } = ctx
  ctx.status = 200
  ctx.body = await masterdata.scrollDocuments<{
    id: string 
    email: string 
    pontos: number
  }>({
    dataEntity: DATA_ENTITY,
    fields: ['id', 'email', 'pontos'],
    schema: 'schemapontos',
  })
  ctx.set('cache-control', 'no-cache')
  await next()
}