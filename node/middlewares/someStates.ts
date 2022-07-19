// import { DATA_ENTITY } from "../utils/constants";
// import { Clients } from "../clients/index";
// import { EventContext } from "@vtex/api";


// export async function someStates(
//   ctx: StatusChangeContext,
//   next: () => Promise<any>
// ) {
//   const {
//     clients: { oms },
//   } = ctx

//   const orderId = await ctx.body.orderId
//   console.info('Dados', orderId)
//   const data = await oms.order(orderId)
  // Pegar valores realmente pago pelos produtos menos descontos e não incluindo taxas e frete
  // const totalItems = data.totals[0].value
  // const discounts = data.totals[1].value
  // const amountPaid = totalItems - discounts

  // Removendo os centavos do valor pago
  // let amountPaidString = amountPaid.toString()
  // amountPaidString = amountPaidString.slice(0, -2)

  // Pegar e-mail e userProfileId do cliente
  // const emailClient = data.clientProfileData.email
  // const userProfileId = data.clientProfileData.userProfileId

  // console.info('Valor total pago desconsiderando taxas e frete: ', amountPaidString)
  // console.info('E-mail cliente: ', emailClient)
  // console.info('userProfileId do cliente: ', userProfileId)
  // console.info('Pedido', data)


  // const pontosCadastrados = await ctx.clients.masterdata.scrollDocuments<{
  //   id: string
  //   email: string
  //   pontos: number
  // }>({
  //   dataEntity: DATA_ENTITY,
  //   fields: ['id','email','pontos'],
  //   schema: 'schemapontos'
  // })

  // console.info('Pontos cadastrados', pontosCadastrados)

  // await Promise.all(
  //   pontosCadastrados.map(async ({email, pontos}) => {
  //     try {
  //       const [savedPoints] = await ctx.clients.masterdata.searchDocuments<{
  //         id: string
  //         email: string
  //         pontos: number
  //       }>({
  //         dataEntity: DATA_ENTITY,
  //         fields: ['id', 'email', 'pontos'],
  //         pagination: {
  //           page: 1,
  //           pageSize: 1,
  //         },
  //         schema: 'schemapontos',
  //         where: `email=${email}`
  //       })
  //     }
  //   })
  // )

//   await next()//vtexcommercestable
// }



// export async function someStates(
//   ctx: StatusChangeContext,
//   next: () => Promise<any>
// ) {
//   // console.info('teste', ctx.body)

//   const orderId = await ctx.body.orderId
//   console.info('Dados', orderId)
//   // 1157751060419-01


//   const fetch = require('node-fetch');
//   const url = `https://bitsized.vtexcommercestable.com.br/api/oms/pvt/orders/${orderId}`;
//   const options = {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'X-VTEX-API-AppKey': 'vtexappkey-bitsized-RIVVUA',
//       'X-VTEX-API-AppToken': 'FQTVUYFGOZBTEPYPMULTKAWSMSDDHMUINWPVALQICFSTKCIBRBPKVXOYJKWAVQTHSQLJBUCGRYKBWJQLDAWBMGYFYXAJGSAGQOAVMRLSHBCELTGWMCFVGNEYYZLPFFHB'
//     }
//   };

//   fetch(url, options)
//     .then((res: any) => {
//       if (res.ok) {
//         res.json()
//           .then((json: any) => {
//             const document: String = json.clientProfileData.document
//             console.log("Client: " + document)
//           }
//           )
//       } else {
//         console.log('Network response was not ok.')
//       }
//     })
//     .catch((err: any) => console.error('There has been a problem with your fetch operation: ' + err));

//   // fetch(url, options)
//   //   .then((res: any) => res.json())
//   //   .then((json: any) => {
//   //     return json.value
//   //   })
//   //   .catch((err: any) => console.error('error:' + err));

//   await console.log()

//   await next()

// }