/**
 * POS 接口服务
 * @author AndyPan
 * @createdate 2019年9月25日10:35:38
 * @lastupdatedate 2019年9月25日10:35:41
 * @remark POS
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'authOneCodePayRedirect', remark: '认证一码付收银台跳转' },
  { service: 'authPlaceCardPayRedirect', remark: '认证摆牌支付收银台跳转' },
  { service: 'authRechargeRedirect', remark: '认证充值收银台跳转', header: { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } } },
  { service: 'authTradePayRedirect', remark: '认证交易收银台跳转', header: { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } } },
  { service: 'authTransferAccountRedirect', remark: '认证转账收银台跳转', header: { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } } },
  { service: 'authWithdrawRedirect', remark: '认证提现收银台跳转', header: { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } } }
]

let oneCodePayServiceGroups = [
  { service: 'aggregatePayConfirm', remark: '聚合支付确认(微信公众号、支付宝服务窗' }
]

export const commonService = StructureService(serviceGroups, 'cashier/common/')
export const oneCodePayService = StructureService(oneCodePayServiceGroups, 'cashier/service/oneCodePay/')
