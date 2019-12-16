/**
 * business 接口服务
 * @author AndyPan
 * @createdate 2019年10月12日13:45:29
 * @lastupdatedate 2019年10月12日13:45:33
 * @remark
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'recharge', remark: '充值' }
]

export const rechargeService = StructureService(serviceGroups, 'cashier/service/recharge/')
