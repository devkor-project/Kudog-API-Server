interface ServiceResult<T = undefined> {
  data?: T;
}
export type mailAuthCodeType = 'signup' | 'findPwd';

export default ServiceResult;
