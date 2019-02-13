import {
  invariantVideo as invariant,
  isNumber,
  startsWith,
  includes,
  shouldBeOneOf,
} from '../utils';

// http://cloudinary.com/documentation/image_transformation_reference#color_parameter
// A color name or rgb: followed by an rgb[a] or rrggbb[aa] hex value
const colorRegex = /^(?:[a-z]+$|rgb:(?:[0-9a-f]{3,4}$|[0-9a-f]{6}$|[0-9a-f]{8}$))/i;

// https://cloudinary.com/documentation/video_manipulation_and_delivery#resizing_and_cropping_videos
const cropOptions = ['scale', 'fit', 'limit', 'fill', 'pad', 'lpad', 'crop'];

const effectOptions = [
  'accelerate',
  'brightness',
  'contrast',
  'fade',
  'gamma',
  'loop',
  'noise',
  'preview',
  'reverse',
  'saturation',
  'vignette',
  'volume',
];

const flagOptions = ['awebp', 'animated', 'waveform'];

// https://cloudinary.com/documentation/video_manipulation_and_delivery#video_settings
const formatOptions = [
  '3g2',
  '3gp',
  'avi',
  'flv',
  'm3u8',
  'm2ts',
  'mov',
  'mkv',
  'mp4',
  'mpeg',
  'mpd',
  'ogv',
  'webm',
  'wmv',
];

// https://cloudinary.com/documentation/video_manipulation_and_delivery#gravity
const gravityOptions = [
  'north_east',
  'north',
  'north_west',
  'west',
  'south_west',
  'south',
  'south_east',
  'east',
  'center',
];

const urlParameters = {
  angle: 'a_',
  aspectRatio: 'ar_',
  audio_codec: 'ac_',
  audio_frequency: 'af_',
  background: 'b_',
  bit_rate: 'br_',
  border: 'bo_',
  color: 'co_',
  crop: 'c_',
  delay: 'dl_',
  dpr: 'dpr_',
  down_scale: 'dl_',
  duration: 'du_',
  effects: 'e_',
  end_offset: 'eo_',
  flags: 'fl_',
  gravity: 'g_',
  height: 'h_',
  overlay: 'l_',
  quality: 'q_',
  radius: 'r_',
  start_offset: 'so_',
  video_codec: 'vc_',
  video_sample: 'vs_',
  width: 'w_',
  x: 'x_',
  y: 'y_',
};

const validate = {
  angle: value => invariant(isNumber(value), 'angle', value, `a number`),
  aspectRatio: value =>
    invariant(
      isNumber(value) || value.match(/^\d+:\d+$/),
      'aspectRatio',
      value,
      'should be a number or have the form x:y',
    ),
  background: value => invariant(value.match(colorRegex), 'background', value, `a color`),
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
  delay: value =>
    invariant(isNumber(value) && value >= 0, 'delay', value, 'must be a positive number'),
  dpr: value =>
    invariant(
      value === 'auto' || (isNumber(value) && value > 0),
      'dpr',
      value,
      'should be `auto` or a number greater than 0',
    ),
  effects: value =>
    invariant(
      value.split('.').every(effect => includes(effect, effectOptions)),
      'effects',
      JSON.stringify(value),
      `${shouldBeOneOf(effectOptions)}, an array of options or '.' separated options`,
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
  overlay: () => {},
  quality: value =>
    invariant(
      (isNumber(value) && +value >= 1 && +value <= 100) ||
        (typeof value === 'string' && value.match(/^\d+:\d+$/)) ||
        value === 'auto',
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
      '/video_manipulation_and_delivery#adding_text_captions',
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
      '/video_manipulation_and_delivery#adding_text_captions',
    );
  },
  width: value =>
    invariant(
      isNumber(value) || value === 'auto' || startsWith('auto:', value),
      'width',
      value,
      "should be a number, 'auto', or a string starting with 'auto:'",
    ),
  x: value => invariant(isNumber(value), 'x', value, 'should be a number'),
  y: value => invariant(isNumber(value), 'y', value, 'should be a number'),
};

export default function compileVideoParameter(parameter, value) {
  if (value === null) {
    return false;
  }

  let nextValue = value;

  // eslint-disable-next-line default-case
  switch (parameter) {
    case 'flags':
      nextValue = Array.isArray(value) ? value.join('.') : value;
      break;

    case 'overlay':
      if (typeof value === 'object') {
        let stringStyle = value.publicId;

        if (!stringStyle) {
          /* istanbul ignore else */
          if (process.env.NODE_ENV !== 'production') {
            validate.textCaptionStyles(value);
          }

          const { letterSpacing, lineSpacing } = value;

          stringStyle = [
            encodeURIComponent(value.fontFamily),
            value.fontSize,
            value.fontWeight,
            value.fontStyle,
            value.textDecoration,
            value.textAlign,
            value.stroke,
            letterSpacing ? `letter_spacing_${letterSpacing}` : 0,
            lineSpacing ? `line_spacing_${lineSpacing}` : 0,
          ]
            .filter(option => option && option !== 'normal' && option !== 'none')
            .join('_');
        }

        nextValue = `text:${stringStyle}:${encodeURIComponent(value.text)}`;
      }
      break;

    case 'border':
      if (typeof nextValue === 'object') {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
          validate.borderObjectColor(value);
        }

        if (
          typeof value.width !== 'string' ||
          value.width.substr(value.width.length - 2, 2) !== 'px'
        ) {
          nextValue.width = `${value.width || 1}px`;
        }

        nextValue = `${value.width}_solid_${value.color}`;
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
      throw new Error(`Cloudinary Video :: unknown transform parameter provided: '${parameter}'`);
    }

    validate[parameter](nextValue);
  }

  return urlParameters[parameter] + nextValue;
}
