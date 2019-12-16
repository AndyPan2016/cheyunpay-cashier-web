/**
 * 所有接口服务
 * @author AndyPan
 * @createdate 2019年9月25日10:34:12
 * @lastupdatedate 2019年9月25日10:34:15
 * @remark 所有服务统一入口
 */

// transfer服务
let { transferService } = Services.require(Services.transferService)
// 公共服务
let { commonService, oneCodePayService } = Services.require(Services.commonService)
// 提现服务
let { withdrawalService } = Services.require(Services.withdrawalService)
// payPswService
let { payPswService } = Services.require(Services.payPswService)
// 充值
let { rechargeService } = Services.require(Services.rechargeService)
// 转账服务
let { transferAccountsService } = Services.require(Services.transferAccountsService)
// 摆牌支付
let { placeCardPayService } = Services.require(Services.placeCardPayService)
// 交易支付
let { tradepayService } = Services.require(Services.tradepayService)

export const TransferService = transferService
export const CommonService = commonService
export const OneCodePayService = oneCodePayService
export const WithdrawalService = withdrawalService
export const PayPswService = payPswService
export const RechargeService = rechargeService
export const TransferAccountsService = transferAccountsService
export const PlaceCardPayService = placeCardPayService
export const TradepayService = tradepayService
