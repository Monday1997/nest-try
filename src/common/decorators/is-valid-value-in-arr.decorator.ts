import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValueInArr(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsValueInArr',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;

          for (const key in value) {
            if (!relatedPropertyName.includes(value[key])) {
              return false;
            }
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `动态属性${args.property},必须在传入数组${args.constraints}`;
        },
      },
    });
  };
}
