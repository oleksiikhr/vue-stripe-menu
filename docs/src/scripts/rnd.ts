/**
 * The maximum is inclusive and the minimum is inclusive.
 */
export default (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
