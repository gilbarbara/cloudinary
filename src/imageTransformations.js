import { imageValidate } from './validators';

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
            imageValidate.textCaptionStyles(nextValue);
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
          imageValidate.borderObjectColor(nextValue);
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
    if (!imageValidate[parameter]) {
      throw new Error(`Cloudinary Image :: unknown transform parameter provided: '${parameter}'`);
    }
    imageValidate[parameter](nextValue);
  }

  return urlParameters[parameter] + nextValue;
}
