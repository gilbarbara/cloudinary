import {
  includes,
  invariantImage,
  invariantVideo,
  isNumber,
  shouldBeOneOf,
  startsWith,
} from './utils';

// http://cloudinary.com/documentation/image_transformations#rotating_images
const angleOptions = ['auto_right', 'auto_left', 'ignore', 'vflip', 'hflip'];

// http://cloudinary.com/documentation/image_transformations#adding_image_borders
// A color name or rgb: followed by an rgb[a] or rrggbb[aa] hex value
const colorRegex = /^(?:[a-z]+$|rgb:(?:[0-9a-f]{3,4}$|[0-9a-f]{6}$|[0-9a-f]{8}$))/i;

// http://cloudinary.com/documentation/image_transformations#setting_background_color
const backgroundOptions = [
  'auto:border',
  'auto:predominant',
  'auto:border_contrast',
  'auto:predominant_contrast',
];

// http://cloudinary.com/documentation/image_transformations#resizing_and_cropping_images
const imageCropOptions = [
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

// https://cloudinary.com/documentation/video_manipulation_and_delivery#resizing_and_cropping_videos
const videoCropOptions = ['scale', 'fit', 'limit', 'fill', 'pad', 'lpad', 'crop'];

const imageFlagOptions = [
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

const videoFlagOptions = ['awebp', 'animated', 'waveform'];

// http://cloudinary.com/documentation/image_transformations#fetch_format
const imageFormatOptions = [
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

// https://cloudinary.com/documentation/video_manipulation_and_delivery#video_settings
const videoFormatOptions = [
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

// http://cloudinary.com/documentation/image_transformations#automatic_cropping
const imageGravityOptions = [
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

// https://cloudinary.com/documentation/video_manipulation_and_delivery#gravity
const videoGravityOptions = [
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

// http://cloudinary.com/documentation/image_transformations#automatic_quality_and_encoding_settings
const imageQualityOptions = ['auto', 'auto:best', 'auto:good', 'auto:eco', 'auto:low', 'jpegmini'];

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

const commonMethods = type => {
  const cropOptions = type === 'image' ? imageCropOptions : videoCropOptions;
  const flagOptions = type === 'image' ? imageFlagOptions : videoFlagOptions;
  const formatOptions = type === 'image' ? imageFormatOptions : videoFormatOptions;
  const gravityOptions = type === 'image' ? imageGravityOptions : videoGravityOptions;
  const invariant = type === 'image' ? invariantImage : invariantVideo;

  return {
    aspectRatio: value =>
      invariant(
        isNumber(value) || value.match(/^\d+:\d+$/),
        'aspectRatio',
        value,
        'should be a number or have the form x:y',
      ),
    border: value =>
      invariant(
        value.match(
          new RegExp(`^\\d+px_solid_${colorRegex.toString().replace(/[/^i]/g, '')}$`, 'i'),
        ),
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
    crop: value =>
      invariant(includes(value, cropOptions), 'crop', value, shouldBeOneOf(cropOptions)),
    dpr: value =>
      invariant(
        value === 'auto' || (isNumber(value) && value > 0),
        'dpr',
        value,
        'should be `auto` or a number greater than 0',
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
          (type === 'image' ? includes(value, imageQualityOptions) : value === 'auto'),
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
        `/${
          type === 'image' ? 'image_transformations' : 'video_manipulation_and_delivery'
        }#adding_text_captions`,
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
        `/${
          type === 'image' ? 'image_transformations' : 'video_manipulation_and_delivery'
        }#adding_text_captions`,
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
};

export const imageValidate = {
  ...commonMethods('image'),
  angle: value =>
    invariantImage(
      isNumber(value) || includes(value, angleOptions),
      'angle',
      value,
      `${shouldBeOneOf(angleOptions)} or a number`,
    ),
  background: value =>
    invariantImage(
      typeof value === 'string' && (includes(value, backgroundOptions) || value.match(colorRegex)),
      'background',
      value,
      `${shouldBeOneOf(backgroundOptions)} or a color`,
    ),
  defaultImage: value =>
    invariantImage(
      value.match(/^[\w+-]+\.[\w]{3,4}$/) &&
        includes(value.substr(value.indexOf('.') + 1), imageFormatOptions),
      'defaultImage',
      value,
      `must include a file extension which ${shouldBeOneOf(imageFormatOptions)}`,
    ),
  density: value =>
    invariantImage(
      isNumber(value) && value > 0 && value <= 300,
      'density',
      value,
      'should be a number greater than 0 up to 300',
    ),
  effect: () => {},
  fetchFormat: value =>
    invariantImage(
      includes(value, ['auto', ...imageFormatOptions]),
      'fetchFormat',
      value,
      `${shouldBeOneOf(['auto', ...imageFormatOptions])} or 'auto'`,
    ),
  opacity: value =>
    invariantImage(
      isNumber(value) && +value >= 0 && +value <= 100,
      'opacity',
      value,
      'should be a number between 0 and 100',
    ),
  page: value =>
    invariantImage(
      isNumber(value) && value > 0,
      'page',
      value,
      'should be an integer greater than 0',
    ),
  underlay: () => {},
  zoom: value => invariantImage(isNumber(value), 'zoom', value, 'should be a number'),
};

export const videoValidate = {
  ...commonMethods('video'),
  angle: value => invariantVideo(isNumber(value), 'angle', value, `a number`),
  background: value => invariantVideo(value.match(colorRegex), 'background', value, `a color`),
  delay: value =>
    invariantVideo(isNumber(value) && value >= 0, 'delay', value, 'must be a positive number'),
  effects: value =>
    invariantVideo(
      value.split('.').every(effect => includes(effect, effectOptions)),
      'effects',
      JSON.stringify(value),
      `${shouldBeOneOf(effectOptions)}, an array of options or '.' separated options`,
    ),
};
