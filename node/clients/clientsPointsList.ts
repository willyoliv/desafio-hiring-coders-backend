// import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
// import { DATA_ENTITY } from '../utils/constants'


// export default class clientsPointsList extends AppClient {
//   constructor(context: IOContext, options?: InstanceOptions) {
//     super('masterdata', context, options)
//   }

//   public getClientsPointsList(ctx: Context): Promise<ClientsPointsList[]>| any {
//     const {
//       clients: { masterdata },
//     } = ctx
    
//     let CPointsList = await masterdata.scrollDocuments<{
//       id: string 
//       email: string 
//       pontos: number
//     }>({
//       dataEntity: DATA_ENTITY,
//       fields: ['id', 'email', 'pontos'],
//       schema: 'v0',
//     })

//    return CPointsList

// }

// interface ClientsPointsList {
//   id: string
//   email: string
//   pontos: number
// }