
export default function Logger(contextName: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(
        `Context: ${contextName}; Method ${propertyKey} was called with arguments:`,
        args,
      );
      const result = originalMethod.apply(this, args);
      console.log(
        `Context: ${contextName}; Method ${propertyKey} returned:`,
        result,
      );
      return result;
    };

    return descriptor;
  };
}
