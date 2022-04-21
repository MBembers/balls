/**
 * rotates board by 15 degrees
 */
export function rotate(
  target: Object,
  name: string,
  descriptor: PropertyDescriptor
) {
  let oryg = descriptor.value;
  descriptor.value = function (...args: any[]) {
    this.rotate += 15;
    let result = oryg.apply(this, args);
    return result;
  };
}
