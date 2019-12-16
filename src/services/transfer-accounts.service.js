/**
 * POS 接口服务
 * @author AndyPan
 * @createdate 2019年9月25日10:35:38
 * @lastupdatedate 2019年9月25日10:35:41
 * @remark POS
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'transferConfirm', remark: '转账确认' },
  { service: 'transferHisQuery', remark: '转账记录' },
  { service: 'transferQueryInfo', remark: '转账信息查询' }
]

export const transferAccountsService = StructureService(serviceGroups, 'cashier/service/transfer/')
