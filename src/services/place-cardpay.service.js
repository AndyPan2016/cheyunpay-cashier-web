/**
 * 摆牌支付 接口服务
 * @author AndyPan
 * @createdate 2019年10月13日19:23:48
 * @lastupdatedate 2019年10月13日19:23:51
 * @remark
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'placeCardPayApply', remark: '摆牌支付' }
]

export const placeCardPayService = StructureService(serviceGroups, 'cashier/service/placeCardPay/')
