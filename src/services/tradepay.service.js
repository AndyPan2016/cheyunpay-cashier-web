/**
 * 交易支付 接口服务
 * @author AndyPan
 * @createdate 2019年10月13日21:05:32
 * @lastupdatedate 2019年10月13日21:05:35
 * @remark
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'tradePayApply', remark: '交易申请' },
  { service: 'tradePayConfirm', remark: '交易确认' }
]

export const tradepayService = StructureService(serviceGroups, 'cashier/service/tradePay/')
