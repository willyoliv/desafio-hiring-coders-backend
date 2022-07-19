import { DATA_ENTITY } from '../utils/constants'

export async function readyForHandlingEvent(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  const {
    clients: { oms, masterdata },
  } = ctx

  const orderId = await ctx.body.orderId
  console.info('Dados', orderId)
  const data = await oms.order(orderId)
  // Pegar valores realmente pago pelos produtos menos descontos e não incluindo taxas e frete
  const totalItems = data.totals[0].value
  const discounts = data.totals[1].value
  const amountPaid = totalItems - discounts

  // Removendo os centavos do valor pago
  let amountPaidString = amountPaid.toString()
  amountPaidString = amountPaidString.slice(0, -2)
  const amountNumber = parseInt(amountPaidString)

  // Pegar e-mail e userProfileId do cliente
  const emailClient = data.clientProfileData.email
  const userProfileId = data.clientProfileData.userProfileId

  console.info('Valor total pago desconsiderando taxas e frete: ', amountNumber)
  console.info('E-mail cliente: ', emailClient)
  console.info('userProfileId do cliente: ', userProfileId)
  console.info('Tipo da variavel', typeof amountNumber)

  console.info('Pedido', data)

  const documento = await masterdata.searchDocuments<
    Octopontos
  >({
    dataEntity: DATA_ENTITY,
    fields: ['id', 'userId', 'pontos'],
    where: `userId=${userProfileId}`,
    pagination: { 
      page: 1,
      pageSize: 1
    },
    schema: 'v0'
  })

  if(documento){
    const novoPonto = documento[0].pontos + amountNumber
    await masterdata.createOrUpdateEntireDocument({
      dataEntity: DATA_ENTITY,
      fields: {
        userId: userProfileId,
        pontos: novoPonto,
      },
      id: documento[0].id,
    })
  } else {
    await masterdata.createDocument({
      dataEntity: DATA_ENTITY,
      fields: {userId: userProfileId, pontos: amountNumber},
      schema: 'v0'
    })
  }



  // await masterdata.createDocument({
  //   dataEntity: DATA_ENTITY,
  //   fields: {userId: userProfileId, pontos: 10},
  //   schema: 'v0'
  // })


  // const CPointsList = await masterdata.scrollDocuments<{
  //   id: string 
  //   userId: string 
  //   pontos: number
  // }>({
  //   dataEntity: DATA_ENTITY,
  //   fields: ['id', 'userProfileId', 'pontos'],
  //   schema: 'v0',
  // })

  // console.log('Tentando pegar todos os dados', CPointsList)

  await next()
}


interface Octopontos {
  id: string
  userId: string
  pontos: number
}