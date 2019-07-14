import { videoValidate } from './validators';

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
            videoValidate.textCaptionStyles(value);
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
          videoValidate.borderObjectColor(value);
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
    if (!videoValidate[parameter]) {
      throw new Error(`Cloudinary Video :: unknown transform parameter provided: '${parameter}'`);
    }

    videoValidate[parameter](nextValue);
  }

  return urlParameters[parameter] + nextValue;
}
