/**
 * 状态字段配置
 * @author AndyPan
 * @createdate 2019年8月26日14:50:33
 * @lastupdatedate 2019年8月26日14:50:37
 * @remark 全局静态字段名称
 */

export default {
  // partnerId
  PARTNERID: 'partnerId',
  // 用户信息
  USERINFO: 'userInfo',
  // 用户编号
  USERNO: 'userNo',
  // 当前账户ID
  ACCOUNTNO: 'accountNo',
  // 会员信息
  MEMBERINFO: 'memberInfo',
  // 业务回调地址
  BUSINESSRETURNURL: 'businessReturnUrl',
  // 交易支付认证返回数据
  TRANSACTIONPAYSTORE: 'transactionPayStore',
  // 是否已经从中转页进入到收银台内页(如果已经进入，后退到中转页时就直接再后退，不再进行中转页的其他逻辑，防止后退到中转页持续中转页的逻辑)
  ISENTRTYINSIDEPAGE: 'isEntrtyInsidePage'
}
