/**
 * POS 接口服务
 * @author AndyPan
 * @createdate 2019年9月25日10:35:38
 * @lastupdatedate 2019年9月25日10:35:41
 * @remark POS
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'withdrawChargeInfo', remark: '提现手续费查询' },
  { service: 'withdrawConfirm', remark: '提现确认' },
  { service: 'withdrawQueryInfo', remark: '提现信息查询' }
]

export const withdrawalService = StructureService(serviceGroups, 'cashier/service/withdraw/')
