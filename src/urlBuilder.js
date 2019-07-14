import { invariant, includes, isPlainObject, shouldBeOneOf } from './utils';

const resourceTypes = ['raw', 'image', 'video'];

const typeOptions = [
  'upload',
  'fetch',
  'facebook',
  'twitter',
  'twitter_name',
  'instagram',
  'instagram_name',
  'gplus',
  'gravatar',
];

export const compile = (parameterSet, transform, defaultTransform) => {
  if (!transform || !parameterSet || Object.keys(transform).length === 0) {
    return '';
  }

  const compiled = parameters =>
    Object.keys(parameters)
      .map(param => parameterSet(param, parameters[param]))
      .filter(value => value)
      .join(',');

  return `/${
    Array.isArray(transform)
      ? transform.map(compiled).join('/')
      : compiled({ ...defaultTransform, ...transform })
  }`;
};

const urlBuilder = (parameterSets = {}, baseResourceType = 'image') => ({
  cloudName,
  cdnSubdomain = false,
  cname = 'res.cloudinary.com',
  secure: defaultSecure = true,
  defaults: {
    type: defaultType = 'upload',
    resourceType: defaultResourceType = baseResourceType,
    ...defaultTransform
  } = {},
}) => {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    invariant(
      cloudName,
      'cloudName',
      cloudName,
      'configuration is required',
      '/node_additional_topics#configuration_options',
    );
  }

  const baseUrl = `${cname}/${cloudName}/`;
  let sub = '';

  return (src, options = {}) => {
    const {
      resourceType = defaultResourceType,
      secure = defaultSecure,
      type = defaultType,
      version = '1',
      ...rest
    } = options;
    let transformation = { ...rest };
    let publicId = src;
    let extension = '';

    if (isPlainObject(src)) {
      publicId = src.id;
      extension = `.${src.extension}`;
    }

    if (options.transform) {
      transformation = options.transform;
    } else if (Array.isArray(options)) {
      transformation = options;
    }

    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      invariant(
        !transformation ||
          Object.keys(transformation).length === 0 ||
          includes(resourceType, resourceTypes),
        'resourceType',
        resourceType,
        `${shouldBeOneOf([
          'raw',
          ...Object.keys(parameterSets),
        ])}, fix the resource type or add additional transform parameters to the configuration`,
        null,
      );

      invariant(includes(type, typeOptions), 'type', type, shouldBeOneOf(typeOptions), null);

      invariant(
        !cdnSubdomain || typeof cdnSubdomain === 'function',
        'cdnSubdomain',
        cdnSubdomain,
        'should be a CRC function: `(string) => number`',
        null,
      );
    }

    if (cdnSubdomain) {
      sub = `a${(cdnSubdomain(publicId) % 5) + 1}.`;
    }

    transformation = compile(parameterSets[resourceType], transformation, defaultTransform);

    return `http${
      secure ? 's' : ''
    }://${sub}${baseUrl}${resourceType}/${type}${transformation}/v${version}/${publicId}${extension}`;
  };
};

export default urlBuilder;
