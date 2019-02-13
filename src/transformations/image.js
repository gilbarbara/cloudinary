import {
  invariantImage as invariant,
  isNumber,
  startsWith,
  includes,
  shouldBeOneOf,
} from '../utils';
// http://cloudinary.com/documentation/image_transformations#adding_image_borders
// A color name or rgb: followed by an rgb[a] or rrggbb[aa] hex value
const colorRegex = /^(?:[a-z]+$|rgb:(?:[0-9a-f]{3,4}$|[0-9a-f]{6}$|[0-9a-f]{8}$))/i;

// http://cloudinary.com/documentation/image_transformations#rotating_images
const angleOptions = ['auto_right', 'auto_left', 'ignore', 'vflip', 'hflip'];

// http://cloudinary.com/documentation/image_transformations#setting_background_color
const backgroundOptions = [
  'auto:border',
  'auto:predominant',
  'auto:border_contrast',
  'auto:predominant_contrast',
];

// http://cloudinary.com/documentation/image_transformations#resizing_and_cropping_images
const cropOptions = [
  'scale',
  'fit',
  'limit',
  'mfit',
  'fill',
  'lfill',
  'pad',
  'lpad',
  'mpad',
  'crop',
  'thumb',
  'imagga_crop',
  'imagga_scale',
];

const flagOptions = [
  'any_format',
  'attachment',
  'apng',
  'awebp',
  'clip',
  'clip_evenodd',
  'cutter',
  'force_strip',
  'ignore_aspect_ratio',
  'immutable_cache',
  'keep_attribution',
  'keep_iptc',
  'layer_apply',
  'lossy',
  'no_overflow',
  'preserve_transparency',
  'png8',
  'png24',
  'png32',
  'progressive',
  'progressive:semi',
  'progressive:steep',
  'progressive:none',
  'rasterize',
  'region_relative',
  'relative',
  'strip_profile',
  'text_no_trim',
  'tiff8_lwz',
  'tiled',
];

// http://cloudinary.com/documentation/image_transformations#fetch_format
const formatOptions = [
  'ai',
  'arw',
  'auto',
  'bmp',
  'cr2',
  'djvu',
  'eps',
  'eps3',
  'ept',
  'flif',
  'gif',
  'heic',
  'heif',
  'hdp',
  'ico',
  'j2k',
  'jp2',
  'jpc',
  'jpe',
  'jpeg',
  'jpg',
  'jxr',
  'pdf',
  'png',
  'ps',
  'psd',
  'svg',
  'tga',
  'tif',
  'tiff',
  'wdp',
  'webp',
];

// http://cloudinary.com/documentation/image_transformations#automatic_cropping
const gravityOptions = [
  'adv_eyes',
  'adv_face',
  'adv_faces',
  'auto',
  'body',
  'center',
  'custom',
  'custom:adv_face',
  'custom:adv_faces',
  'custom:face',
  'custom:faces',
  'east',
  'face',
  'face:auto',
  'face:center',
  'faces',
  'faces:auto',
  'faces:center',
  'liquid',
  'north',
  'north_east',
  'north_west',
  'ocr_text',
  'south',
  'south_east',
  'south_west',
  'west',
  'xy_center',
];

// http://cloudinary.com/documentation/image_transformations#automatic_quality_and_encoding_settings
const qualityOptions = ['auto', 'auto:best', 'auto:good', 'auto:eco', 'auto:low', 'jpegmini'];

const urlParameters = {
  angle: 'a_',
  aspectRatio: 'ar_',
  background: 'b_',
  border: 'bo_',
  color: 'co_',
  crop: 'c_',
  defaultImage: 'd_',
  density: 'dn_',
  dpr: 'dpr_',
  effect: 'e_',
  fetchFormat: 'f_',
  flags: 'fl_',
  gravity: 'g_',
  height: 'h_',
  opacity: 'o_',
  overlay: 'l_',
  page: 'pg_',
  quality: 'q_',
  radius: 'r_',
  underlay: 'u_',
  width: 'w_',
  x: 'x_',
  y: 'y_',
  zoom: 'z_',
};

const validate = {
  angle: value =>
    invariant(
      isNumber(value) || includes(value, angleOptions),
      'angle',
      value,
      `${shouldBeOneOf(angleOptions)} or a number`,
    ),
  aspectRatio: value =>
    invariant(
      isNumber(value) || value.match(/^\d+:\d+$/),
      'aspectRatio',
      value,
      'should be a number or have the form x:y',
    ),
  background: value =>
    invariant(
      typeof value === 'string' && (includes(value, backgroundOptions) || value.match(colorRegex)),
      'background',
      value,
      `${shouldBeOneOf(backgroundOptions)} or a color`,
    ),
  border: value =>
    invariant(
      value.match(new RegExp(`^\\d+px_solid_${colorRegex.toString().replace(/[/^i]/g, '')}$`, 'i')),
      'border',
      value,
      "should be an object with 'width' & 'color' or a string of the form 'width_style_color'",
    ),
  borderObjectColor: value =>
    invariant(
      'color' in value,
      'border',
      JSON.stringify(value),
      "should contain a 'color' property when provided as an object",
    ),
  color: value =>
    invariant(
      value.match(colorRegex),
      'color',
      value,
      'must be a named color, short #rgb[a] or long #rrggbb[aa] hex value',
    ),
  crop: value => invariant(includes(value, cropOptions), 'crop', value, shouldBeOneOf(cropOptions)),
  defaultImage: value =>
    invariant(
      value.match(/^[\w+-]+\.[\w]{3,4}$/) &&
        includes(value.substr(value.indexOf('.') + 1), formatOptions),
      'defaultImage',
      value,
      `must include a file extension which ${shouldBeOneOf(formatOptions)}`,
    ),
  density: value =>
    invariant(
      isNumber(value) && value > 0 && value <= 300,
      'density',
      value,
      'should be a number greater than 0 up to 300',
    ),
  dpr: value =>
    invariant(
      value === 'auto' || (isNumber(value) && value > 0),
      'dpr',
      value,
      'should be `auto` or a number greater than 0',
    ),
  effect: () => {},
  fetchFormat: value =>
    invariant(
      includes(value, ['auto', ...formatOptions]),
      'fetchFormat',
      value,
      `${shouldBeOneOf(['auto', ...formatOptions])} or 'auto'`,
    ),
  flags: value =>
    invariant(
      value.split('.').every(flag => includes(flag, flagOptions)),
      'flags',
      JSON.stringify(value),
      `${shouldBeOneOf(flagOptions)}, an array of options or '.' separated options`,
    ),
  gravity: value =>
    invariant(
      includes(value, gravityOptions) || value === 'auto' || startsWith('auto:', value),
      'gravity',
      value,
      `${shouldBeOneOf(gravityOptions)}, 'auto', or a string starting with 'auto:'`,
    ),
  height: value => invariant(isNumber(value), 'height', value, 'should be a number'),
  opacity: value =>
    invariant(
      isNumber(value) && +value >= 0 && +value <= 100,
      'opacity',
      value,
      'should be a number between 0 and 100',
    ),
  overlay: () => {},
  page: value =>
    invariant(isNumber(value) && value > 0, 'page', value, 'should be an integer greater than 0'),
  quality: value =>
    invariant(
      (isNumber(value) && +value >= 1 && +value <= 100) ||
        (typeof value === 'string' && value.match(/^\d+:\d+$/)) ||
        includes(value, qualityOptions),
      'quality',
      value,
      `${shouldBeOneOf(formatOptions)}, a number between 1 and 100, or have the form x:y`,
    ),
  radius: value =>
    invariant(
      isNumber(value) || value === 'max' || value.match(/^\d+(?::\d+){0,3}$/),
      'radius',
      value,
      "should be a number, 'max' or have the form x[:y[:z[:u]]]",
    ),
  textCaptionStyles: value => {
    const {
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      textAlign,
      stroke,
      letterSpacing,
      lineSpacing,
    } = value;
    invariant(
      fontFamily && fontSize && isNumber(fontSize),
      'text caption',
      JSON.stringify(value),
      "required options are 'fontFamily' and 'fontSize'",
      '/image_transformations#adding_text_captions',
    );
    invariant(
      (!fontWeight || includes(fontWeight, ['normal', 'bold'])) &&
        (!fontStyle || includes(fontStyle, ['normal', 'italic'])) &&
        (!textDecoration || includes(textDecoration, ['none', 'underline', 'strikethrough'])) &&
        (!textAlign ||
          includes(textAlign, ['left', 'center', 'right', 'start', 'end', 'justify'])) &&
        (!stroke || includes(stroke, ['none', 'stroke'])) &&
        (!letterSpacing || isNumber(letterSpacing)) &&
        (!lineSpacing || isNumber(lineSpacing)),
      'text caption',
      JSON.stringify(value),
      'options are invalid',
      '/image_transformations#adding_text_captions',
    );
  },
  underlay: () => {},
  width: value =>
    invariant(
      isNumber(value) || value === 'auto' || startsWith('auto:', value),
      'width',
      value,
      "should be a number, 'auto', or a string starting with 'auto:'",
    ),
  x: value => invariant(isNumber(value), 'x', value, 'should be a number'),
  y: value => invariant(isNumber(value), 'y', value, 'should be a number'),
  zoom: value => invariant(isNumber(value), 'zoom', value, 'should be a number'),
};

export default function compileImageParameter(parameter, value) {
  if (value === null) {
    return false;
  }

  let nextValue = value;

  // eslint-disable-next-line default-case
  switch (parameter) {
    case 'flags':
      nextValue = Array.isArray(nextValue) ? nextValue.join('.') : nextValue;
      break;

    case 'overlay':
    case 'underlay':
      if (typeof nextValue === 'object') {
        let stringStyle = nextValue.publicId;

        if (!stringStyle) {
          /* istanbul ignore else */
          if (process.env.NODE_ENV !== 'production') {
            validate.textCaptionStyles(nextValue);
          }

          const { letterSpacing, lineSpacing } = nextValue;
          stringStyle = [
            encodeURIComponent(nextValue.fontFamily),
            nextValue.fontSize,
            nextValue.fontWeight,
            nextValue.fontStyle,
            nextValue.textDecoration,
            nextValue.textAlign,
            nextValue.stroke,
            letterSpacing ? `letter_spacing_${letterSpacing}` : 0,
            lineSpacing ? `line_spacing_${lineSpacing}` : 0,
          ]
            .filter(option => option && option !== 'normal' && option !== 'none')
            .join('_');
        }

        nextValue = `text:${stringStyle}:${encodeURIComponent(nextValue.text)}`;
      }
      break;

    case 'border':
      if (typeof nextValue === 'object') {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
          validate.borderObjectColor(nextValue);
        }

        if (
          typeof nextValue.width !== 'string' ||
          nextValue.width.substr(nextValue.width.length - 2, 2) !== 'px'
        ) {
          nextValue.width = `${nextValue.width || 1}px`;
        }

        nextValue = `${nextValue.width}_solid_${nextValue.color}`;
      }
      nextValue = nextValue.toLowerCase();

    // falls through

    case 'color':
    case 'background':
      nextValue = nextValue.replace('#', 'rgb:');
  }

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    if (!validate[parameter]) {
      throw new Error(`Cloudinary Image :: unknown transform parameter provided: '${parameter}'`);
    }
    validate[parameter](nextValue);
  }

  return urlParameters[parameter] + nextValue;
}
