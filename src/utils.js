// @flow
const invariantFor = type => (
  condition: boolean,
  parameter: string,
  value: string,
  message: string,
  source: string = `/${
    type === 'Image ' ? 'image_transformations' : 'video_manipulation_and_delivery'
  }`,
) => {
  if (!condition) {
    const nextValue = typeof value === 'string' ? `'${value}'` : value;
    const nextSource = source ? `http://cloudinary.com/documentation${source}` : null;

    throw new Error(
      `Cloudinary ${type}:: ${parameter} ${message}, received: ${nextValue}${
        nextSource ? ` - see ${nextSource}` : ''
      }`,
    );
  }
};

export const invariant = invariantFor('');
export const invariantImage = invariantFor('Image ');
export const invariantVideo = invariantFor('Video ');

export const getObjectType = (value: any): string =>
  Object.prototype.toString.call(value).slice(8, -1);

export const includes = (needle: string, haystack: Array<any>) => haystack.indexOf(needle) > -1;
export const isNumber = (value: number | string) =>
  typeof value === 'number' || !Number.isNaN(Number(value));

export const isPlainObject = (value: any): boolean => {
  let prototype;

  // eslint-disable-next-line no-return-assign
  return (
    getObjectType(value) === 'Object' &&
    ((prototype = Object.getPrototypeOf(value)),
    prototype === null || prototype === Object.getPrototypeOf({}))
  );
};

export const shouldBeOneOf = (possibleValues: Array<string>) =>
  `should be one of ['${possibleValues.join("', '")}']`;
export const startsWith = (needle: string, haystack: string) => haystack.indexOf(needle) === 0;
