import imageTransformations from '../../src/transformations/image';

describe('Image Transformations', () => {
  describe('angle', () => {
    it('accepts a number', () => {
      expect(imageTransformations('angle', 90)).toBe('a_90');
      expect(imageTransformations('angle', -20)).toBe('a_-20');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('angle', '10')).toBe('a_10');
      expect(imageTransformations('angle', '-20')).toBe('a_-20');
    });
    it('accepts valid modes', () => {
      expect(imageTransformations('angle', 'auto_right')).toBe('a_auto_right');
      expect(imageTransformations('angle', 'vflip')).toBe('a_vflip');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('angle', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('aspectRatio', () => {
    it('accepts a number', () => {
      expect(imageTransformations('aspectRatio', 1.5)).toBe('ar_1.5');
    });
    it('accepts valid string values', () => {
      expect(imageTransformations('aspectRatio', '1.5')).toBe('ar_1.5');
      expect(imageTransformations('aspectRatio', '16:9')).toBe('ar_16:9');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('aspectRatio', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('aspectRatio', '7:')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('background', () => {
    it('accepts a color', () => {
      expect(imageTransformations('background', 'blue')).toBe('b_blue');
      expect(imageTransformations('background', '#3020ff')).toBe('b_rgb:3020ff');
      expect(imageTransformations('background', '#3020ff22')).toBe('b_rgb:3020ff22');
      expect(imageTransformations('background', 'rgb:3020ff')).toBe('b_rgb:3020ff');
      expect(imageTransformations('background', 'rgb:3020ff22')).toBe('b_rgb:3020ff22');
    });
    it('accepts valid `auto:mode` strings', () => {
      expect(imageTransformations('background', 'auto:border')).toBe('b_auto:border');
      expect(imageTransformations('background', 'auto:border_contrast')).toBe(
        'b_auto:border_contrast',
      );
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('background', 'auto:bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('background', '#3020f')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('border', () => {
    it('accepts a fully formed width_style_color string', () => {
      expect(imageTransformations('border', '4px_solid_black')).toBe('bo_4px_solid_black');
      expect(imageTransformations('border', '4px_solid_#2040fa')).toBe('bo_4px_solid_rgb:2040fa');
      expect(imageTransformations('border', '4px_solid_rgb:2040fa')).toBe(
        'bo_4px_solid_rgb:2040fa',
      );
      expect(imageTransformations('border', '4px_solid_rgb:2040faf0')).toBe(
        'bo_4px_solid_rgb:2040faf0',
      );
    });
    it('accepts a object with color and optional width', () => {
      expect(imageTransformations('border', { color: 'red' })).toBe('bo_1px_solid_red');
      expect(imageTransformations('border', { color: '#3020ff' })).toBe('bo_1px_solid_rgb:3020ff');
      expect(imageTransformations('border', { color: '#3020ff22' })).toBe(
        'bo_1px_solid_rgb:3020ff22',
      );
      expect(imageTransformations('border', { color: 'rgb:3020ff' })).toBe(
        'bo_1px_solid_rgb:3020ff',
      );
      expect(imageTransformations('border', { color: 'rgb:3020ff22' })).toBe(
        'bo_1px_solid_rgb:3020ff22',
      );
      expect(imageTransformations('border', { color: 'red', width: 3 })).toBe('bo_3px_solid_red');
      expect(imageTransformations('border', { color: '#3020ff', width: '2px' })).toBe(
        'bo_2px_solid_rgb:3020ff',
      );
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('border', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('border', { width: 1 })).toThrowErrorMatchingSnapshot();
      expect(() =>
        imageTransformations('border', { color: '#3020f' }),
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        imageTransformations('border', { color: '#3020ff2' }),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('color', () => {
    it('accepts a color string', () => {
      expect(imageTransformations('color', 'green')).toBe('co_green');
      expect(imageTransformations('color', '#204')).toBe('co_rgb:204');
      expect(imageTransformations('color', '#204f')).toBe('co_rgb:204f');
      expect(imageTransformations('color', '#2040fa')).toBe('co_rgb:2040fa');
      expect(imageTransformations('color', 'rgb:2040fa')).toBe('co_rgb:2040fa');
      expect(imageTransformations('color', 'rgb:2040faf0')).toBe('co_rgb:2040faf0');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('color', '#30')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('color', '#3020f')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('color', '#3020ff2')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('color', '#3020ff2ff')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('colorSpace', () => {
    it('accepts predefined values', () => {
      expect(imageTransformations('colorSpace', 'srgb')).toBe('cs_srgb');
      expect(imageTransformations('colorSpace', 'tinysrgb')).toBe('cs_tinysrgb');
      expect(imageTransformations('colorSpace', 'no_cmyk')).toBe('cs_no_cmyk');
    });
    it('accepts `cs_icc:(public_id)` values', () => {
      expect(imageTransformations('colorSpace', 'icc:some_id.icc')).toBe('cs_icc:some_id.icc');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('colorSpace', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() =>
        imageTransformations('colorSpace', 'bad:some_id'),
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        imageTransformations('colorSpace', 'cs_icc:no_extension'),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('crop', () => {
    it('accepts valid string values', () => {
      expect(imageTransformations('crop', 'scale')).toBe('c_scale');
      expect(imageTransformations('crop', 'fill')).toBe('c_fill');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('crop', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('crop', 300)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('defaultImage', () => {
    it('accepts any public id with a file extension', () => {
      expect(imageTransformations('defaultImage', 'image_1.jpg')).toBe('d_image_1.jpg');
      expect(imageTransformations('defaultImage', 'image+a-char.png')).toBe('d_image+a-char.png');
    });
    it('throws when invalid', () => {
      expect(() =>
        imageTransformations('defaultImage', 'noExtension'),
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        imageTransformations('defaultImage', 'badExtension.abc'),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('delay', () => {
    it('accepts a positive number', () => {
      expect(imageTransformations('delay', 30)).toBe('dl_30');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('delay', '30')).toBe('dl_30');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('delay', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('delay', '-10')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('delay', -10)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('density', () => {
    it('accepts a positive number up to 300', () => {
      expect(imageTransformations('density', 10)).toBe('dn_10');
      expect(imageTransformations('density', 300)).toBe('dn_300');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('density', '20')).toBe('dn_20');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('density', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('density', 301)).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('density', -1)).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('density', 0)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('dpr', () => {
    it('accepts a positive number', () => {
      expect(imageTransformations('dpr', 3)).toBe('dpr_3');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('dpr', '2.0')).toBe('dpr_2.0');
    });
    it('accepts the value `auto`', () => {
      expect(imageTransformations('dpr', 'auto')).toBe('dpr_auto');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('dpr', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('dpr', -1)).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('dpr', 0)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('effect', () => {
    it('accepts any value', () => {
      expect(imageTransformations('effect', 'hue:40')).toBe('e_hue:40');
      expect(imageTransformations('effect', 'negate')).toBe('e_negate');
    });
  });

  describe('flags', () => {
    it('accepts a valid value', () => {
      expect(imageTransformations('flags', 'any_format')).toBe('fl_any_format');
      expect(imageTransformations('flags', 'attachment')).toBe('fl_attachment');
    });
    it('accepts an array of valid values', () => {
      expect(imageTransformations('flags', ['clip_evenodd', 'cutter', 'force_strip'])).toBe(
        'fl_clip_evenodd.cutter.force_strip',
      );
    });
    it('accepts a string of `.` separated values', () => {
      expect(imageTransformations('flags', 'layer_apply.lossy.no_overflow')).toBe(
        'fl_layer_apply.lossy.no_overflow',
      );
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('density', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() =>
        imageTransformations('density', ['any_format', 'bad']),
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        imageTransformations('density', 'attachment.bad'),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('fetchFormat', () => {
    it('accepts valid file formats', () => {
      expect(imageTransformations('fetchFormat', 'jpg')).toBe('f_jpg');
      expect(imageTransformations('fetchFormat', 'png')).toBe('f_png');
    });
    it('accepts `auto`', () => {
      expect(imageTransformations('fetchFormat', 'auto')).toBe('f_auto');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('fetchFormat', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('gravity', () => {
    it('accepts valid string values', () => {
      expect(imageTransformations('gravity', 'south_west')).toBe('g_south_west');
      expect(imageTransformations('gravity', 'custom:face')).toBe('g_custom:face');
    });
    it('accepts `auto`', () => {
      expect(imageTransformations('gravity', 'auto')).toBe('g_auto');
    });
    it('accepts a string starting with `auto:`', () => {
      expect(imageTransformations('gravity', 'auto:50')).toBe('g_auto:50');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('gravity', 'bad:auto')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('gravity', 'auto-bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('height', () => {
    it('accepts a number', () => {
      expect(imageTransformations('height', 300)).toBe('h_300');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('height', '300')).toBe('h_300');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('height', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('quality', () => {
    it('accepts a number between 1 an 100 inclusive', () => {
      expect(imageTransformations('quality', 1)).toBe('q_1');
      expect(imageTransformations('quality', 60)).toBe('q_60');
      expect(imageTransformations('quality', 100)).toBe('q_100');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('quality', '50')).toBe('q_50');
    });
    it('accepts a percentage and chroma sub-sampling', () => {
      expect(imageTransformations('quality', '60:420')).toBe('q_60:420');
    });
    it('accepts `auto`, auto variants and `jpegmini`', () => {
      expect(imageTransformations('quality', 'auto')).toBe('q_auto');
      expect(imageTransformations('quality', 'auto:best')).toBe('q_auto:best');
      expect(imageTransformations('quality', 'jpegmini')).toBe('q_jpegmini');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('quality', 0)).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('quality', 105)).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('quality', '105')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('quality', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('quality', 'auto:bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('opacity', () => {
    it('accepts a number between 0 and 100', () => {
      expect(imageTransformations('opacity', 0)).toBe('o_0');
      expect(imageTransformations('opacity', 30)).toBe('o_30');
      expect(imageTransformations('opacity', 100)).toBe('o_100');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('opacity', '0')).toBe('o_0');
      expect(imageTransformations('opacity', '30')).toBe('o_30');
      expect(imageTransformations('opacity', '100')).toBe('o_100');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('opacity', -1)).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('opacity', 101)).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('opacity', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('overlay', () => {
    it('accepts any string as public id', () => {
      expect(imageTransformations('overlay', 'badge')).toBe('l_badge');
      expect(imageTransformations('overlay', 'red_button.jpg')).toBe('l_red_button.jpg');
      expect(imageTransformations('overlay', 'text:Arial_50:Smile!')).toBe(
        'l_text:Arial_50:Smile!',
      );
      expect(imageTransformations('overlay', 'text:default_style:Hello+World')).toBe(
        'l_text:default_style:Hello+World',
      );
    });
    it('accepts an object with `text` and a `publicId`', () => {
      expect(
        imageTransformations('overlay', {
          text: 'Hello World',
          publicId: 'default_style',
        }),
      ).toBe('l_text:default_style:Hello%20World');
    });
    it('accepts an object with `text` and text caption options', () => {
      expect(
        imageTransformations('overlay', {
          text: 'Hello World',
          fontFamily: 'Times New Roman',
          fontSize: '16',
        }),
      ).toBe('l_text:Times%20New%20Roman_16:Hello%20World');
      expect(
        imageTransformations('overlay', {
          text: 'Flowers',
          fontFamily: 'verdana',
          fontSize: 18,
          fontWeight: 'bold',
          fontStyle: 'italic',
          textDecoration: 'underline',
          textAlign: 'center',
          stroke: 'stroke',
          letterSpacing: 4,
          lineSpacing: 3.3,
        }),
      ).toBe(
        'l_text:verdana_18_bold_italic_underline_center_stroke_letter_spacing_4_line_spacing_3.3:Flowers',
      );
      expect(
        imageTransformations('overlay', {
          text: 'Bananas',
          fontFamily: 'Arial',
          fontSize: 12,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          stroke: 'none',
          letterSpacing: 2,
          lineSpacing: 1.5,
        }),
      ).toBe('l_text:Arial_12_left_letter_spacing_2_line_spacing_1.5:Bananas');
    });
    it('throws when invalid', () => {
      expect(() =>
        imageTransformations('overlay', { text: 'No fontFamily', fontSize: 12 }),
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        imageTransformations('overlay', {
          text: 'No fontSize',
          fontFamily: 'Arial',
        }),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('page', () => {
    it('accepts a positive number', () => {
      expect(imageTransformations('page', 3)).toBe('pg_3');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('page', '20')).toBe('pg_20');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('page', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('page', -1)).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('page', 0)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('radius', () => {
    it('accepts a number', () => {
      expect(imageTransformations('radius', 30)).toBe('r_30');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('radius', '30')).toBe('r_30');
    });
    it('accepts a string of the form x[:y[:z[:u]]]', () => {
      expect(imageTransformations('radius', '20:0')).toBe('r_20:0');
      expect(imageTransformations('radius', '20:0:40')).toBe('r_20:0:40');
      expect(imageTransformations('radius', '20:0:40:40')).toBe('r_20:0:40:40');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('radius', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('radius', '20:0:40:40:90')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('underlay', () => {
    it('accepts any string as public id', () => {
      expect(imageTransformations('underlay', 'badge')).toBe('u_badge');
      expect(imageTransformations('underlay', 'red_button.jpg')).toBe('u_red_button.jpg');
      expect(imageTransformations('underlay', 'text:Arial_50:Smile!')).toBe(
        'u_text:Arial_50:Smile!',
      );
      expect(imageTransformations('underlay', 'text:default_style:Hello+World')).toBe(
        'u_text:default_style:Hello+World',
      );
    });
    it('accepts an object with `text` and a `publicId`', () => {
      expect(
        imageTransformations('underlay', {
          text: 'Hello World',
          publicId: 'default_style',
        }),
      ).toBe('u_text:default_style:Hello%20World');
    });
    it('accepts an object with `text` and text caption options', () => {
      expect(
        imageTransformations('underlay', {
          text: 'Hello World',
          fontFamily: 'Times New Roman',
          fontSize: '16',
        }),
      ).toBe('u_text:Times%20New%20Roman_16:Hello%20World');
      expect(
        imageTransformations('underlay', {
          text: 'Flowers',
          fontFamily: 'verdana',
          fontSize: 18,
          fontWeight: 'bold',
          fontStyle: 'italic',
          textDecoration: 'underline',
          textAlign: 'center',
          stroke: 'stroke',
          letterSpacing: 4,
          lineSpacing: 3.3,
        }),
      ).toBe(
        'u_text:verdana_18_bold_italic_underline_center_stroke_letter_spacing_4_line_spacing_3.3:Flowers',
      );
      expect(
        imageTransformations('underlay', {
          text: 'Bananas',
          fontFamily: 'Arial',
          fontSize: 12,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          stroke: 'none',
          letterSpacing: 2,
          lineSpacing: 1.5,
        }),
      ).toBe('u_text:Arial_12_left_letter_spacing_2_line_spacing_1.5:Bananas');
    });
    it('throws when invalid', () => {
      expect(() =>
        imageTransformations('underlay', { text: 'No fontFamily', fontSize: 12 }),
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        imageTransformations('underlay', {
          text: 'No fontSize',
          fontFamily: 'Arial',
        }),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('width', () => {
    it('accepts a number', () => {
      expect(imageTransformations('width', 300)).toBe('w_300');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('width', '300')).toBe('w_300');
    });
    it('accepts `auto`', () => {
      expect(imageTransformations('width', 'auto')).toBe('w_auto');
    });
    it('accepts a string starting with `auto:`', () => {
      expect(imageTransformations('width', 'auto:50')).toBe('w_auto:50');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('width', 'bad:auto')).toThrowErrorMatchingSnapshot();
      expect(() => imageTransformations('width', 'auto-bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('x', () => {
    it('accepts a number', () => {
      expect(imageTransformations('x', 100)).toBe('x_100');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('x', '100')).toBe('x_100');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('x', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('y', () => {
    it('accepts a number', () => {
      expect(imageTransformations('y', 100)).toBe('y_100');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('y', '100')).toBe('y_100');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('y', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('zoom', () => {
    it('accepts a number', () => {
      expect(imageTransformations('zoom', 30)).toBe('z_30');
    });
    it('accepts a numeric string', () => {
      expect(imageTransformations('zoom', '30')).toBe('z_30');
    });
    it('throws when invalid', () => {
      expect(() => imageTransformations('zoom', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('null value on any parameter', () => {
    it('returns false for easy filtering', () => {
      expect(imageTransformations('crop', null)).toBe(false);
    });
  });

  describe('invalid parameter', () => {
    it('throws an error', () => {
      try {
        imageTransformations('abc', 'def');
      } catch (error) {
        expect(error.message).toBe(
          "Cloudinary Image :: unknown transform parameter provided: 'abc'",
        );
        return;
      }
      throw new Error('imageTransformations should have thrown');
    });
  });
});
