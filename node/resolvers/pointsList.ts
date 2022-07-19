import { DATA_ENTITY } from "../utils/constants";
import { Clients } from "../clients/index";
import { EventContext } from "@vtex/api";

export async function pointsList(ctx: EventContext<Clients>)  {
  const [pontosCadastrados] = await ctx.clients.masterdata.searchDocuments<{
    id: string
    email: string
    pontos: number
  }>({
    dataEntity: DATA_ENTITY,
    fields: ['id','email','pontos'],
    pagination: {
      page: 1,
      pageSize: 1,
    },
    schema: 'v0'
  })

  console.log('Pontos cadastrados', pontosCadastrados)
}
  // masterdata
  //   .scrollDocuments({
  //     dataEntity: DATA_ENTITY,
  //     fields: ['email', 'pontos'],
  //     schema: 'schemapontos',
  //     size: topN,
  //     sort: `pontos DESC`,
  //   })
  //   .then(({ data }) => data)
