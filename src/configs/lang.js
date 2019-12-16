/**
 * 文本及状态配置
 * @author AndyPan
 * @createdate 2019年8月26日14:47:39
 * @lastupdatedate 2019年8月26日14:47:44
 * @remark 通用提示文本等
 */

export default {
  // 空文本
  placeholderText: '无',
  // 技术支持
  technicalSupport: '重庆车云数字科技有限公司提供技术支持',
  // 中转页跳转状态
  transferPageStatus: {
    'ONE_CODE_PAY': { key: 'ONE_CODE_PAY', text: '一码付' },
    'PLACE_CARD_PAY': { key: 'PLACE_CARD_PAY', text: '摆牌' },
    'RECHARGE': { key: 'RECHARGE', text: '充值' },
    'TRADE_PAY': { key: 'TRADE_PAY', text: '交易支付' },
    'TRANSFER_ACCOUNT': { key: 'TRANSFER_ACCOUNT', text: '转账' },
    'WITHDRAW': { key: 'WITHDRAW', text: '提现' }
  },
  // 业务类型(非交易类验证需传)
  businessType: {
    register: { key: 'REGISTER', text: '用户注册' },
    setPassword: { key: 'SET_PASSWORD', text: '设置密码' },
    resetLoginPassword: { key: 'RESET_LOGIN_PASSWORD', text: '重置登录密码' },
    resetPayPassword: { key: 'RESET_PAY_PASSWORD', text: '重置支付密码' },
    resetMobileNo: { key: 'RESET_MOBILE_NO', text: '重置手机号码' },
    bindBankCard: { key: 'BIND_BANK_CARD', text: '绑定银行卡' }
  },
  // 卡种
  bankCardType: {
    'ALL': { key: 'ALL', text: '所有卡种' },
    'DEBIT_CREDIT': { key: 'DEBIT_CREDIT', text: '借贷一体' },
    'PREPAID': { key: 'PREPAID', text: '预付费卡' },
    'SEMI_CREDIT': { key: 'SEMI_CREDIT', text: '准贷记卡' },
    'DEBIT_CARD': { key: 'DEBIT_CARD', text: '借记卡' },
    'CREDIT_CARD': { key: 'CREDIT_CARD', text: '贷记卡' },
    'COMPANY_CARD': { key: 'COMPANY_CARD', text: '企业账户' }
  },
  tradeStatus: {
    success: { key: 'success', result: '提现成功', remark: '尊敬的用户，您的提现已成功' },
    failure: { key: 'fail', result: '提现失败', remark: '抱歉，尊敬的用户，您的提现失败' },
    processing: { key: 'wait', result: '提现处理中', remark: '尊敬的用户，您的提现已受理' }
  },
  transferAccountStatus: {
    success: { key: 'success', result: '转账成功', remark: '尊敬的用户，您的转账已成功' },
    failure: { key: 'fail', result: '转账失败', remark: '抱歉，尊敬的用户，您的转账失败' },
    processing: { key: 'wait', result: '转账处理中', remark: '尊敬的用户，您的转账已受理' }
  },
  transactionTradeStatus: {
    success: { key: 'success', result: '交易成功', remark: '尊敬的用户，您的交易已成功' },
    failure: { key: 'fail', result: '交易失败', remark: '抱歉，尊敬的用户，您的交易失败' },
    processing: { key: 'wait', result: '交易处理中', remark: '尊敬的用户，您的交易已受理' }
  }
}
