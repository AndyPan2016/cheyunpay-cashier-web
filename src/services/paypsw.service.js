/**
 * business 接口服务
 * @author AndyPan
 * @createdate 2019年10月12日13:45:29
 * @lastupdatedate 2019年10月12日13:45:33
 * @remark
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'checkCertNo', remark: '身份证号码校验' },
  { service: 'checkSmsCaptcha', remark: '短信验证码校验' },
  { service: 'resetPayPassword', remark: '支付密码重置' },
  { service: 'sendSmsCode', remark: '发送短信验证码' },
  { service: 'setLoginInfo', remark: '设置登录信息' },
  { service: 'toResetPayPsw', remark: 'toResetPayPsw' }
]

export const payPswService = StructureService(serviceGroups, 'cashier/service/payPsw/')
