import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptor/serialize.interceptor';

interface classDto {
  new (...args: any[]): any;
}

/**
 * 序列化参数
 * @param dto 相关的dto类
 * @param flag  是否只展示我们允许展示的（默认为false展示所有）
 */
export function Serialize(dto: classDto, flag: boolean = false) {
  return UseInterceptors(new SerializeInterceptor(dto, flag));
}
/**
 * 序列化参数--只展示我们允许展示的
 * @param dto 相关的dto类
 */
export function SerializeStrict(dto: classDto) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
