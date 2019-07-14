import videoTransformations from '../src/videoTransformations';

describe('Video Transformations', () => {
  describe('angle', () => {
    it('accepts a number', () => {
      expect(videoTransformations('angle', 90)).toBe('a_90');
      expect(videoTransformations('angle', -20)).toBe('a_-20');
    });
    it('accepts a numeric string', () => {
      expect(videoTransformations('angle', '10')).toBe('a_10');
      expect(videoTransformations('angle', '-20')).toBe('a_-20');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('angle', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('aspectRatio', () => {
    it('accepts a number', () => {
      expect(videoTransformations('aspectRatio', 1.5)).toBe('ar_1.5');
    });
    it('accepts valid string values', () => {
      expect(videoTransformations('aspectRatio', '1.5')).toBe('ar_1.5');
      expect(videoTransformations('aspectRatio', '16:9')).toBe('ar_16:9');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('aspectRatio', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('aspectRatio', '7:')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('background', () => {
    it('accepts a color', () => {
      expect(videoTransformations('background', 'blue')).toBe('b_blue');
      expect(videoTransformations('background', '#3020ff')).toBe('b_rgb:3020ff');
      expect(videoTransformations('background', '#3020ff22')).toBe('b_rgb:3020ff22');
      expect(videoTransformations('background', 'rgb:3020ff')).toBe('b_rgb:3020ff');
      expect(videoTransformations('background', 'rgb:3020ff22')).toBe('b_rgb:3020ff22');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('background', 'auto:bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('background', '#3020f')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('border', () => {
    it('accepts a fully formed width_style_color string', () => {
      expect(videoTransformations('border', '4px_solid_black')).toBe('bo_4px_solid_black');
      expect(videoTransformations('border', '4px_solid_#2040fa')).toBe('bo_4px_solid_rgb:2040fa');
      expect(videoTransformations('border', '4px_solid_rgb:2040fa')).toBe(
        'bo_4px_solid_rgb:2040fa',
      );
      expect(videoTransformations('border', '4px_solid_rgb:2040faf0')).toBe(
        'bo_4px_solid_rgb:2040faf0',
      );
    });
    it('accepts a object with color and optional width', () => {
      expect(videoTransformations('border', { color: 'red' })).toBe('bo_1px_solid_red');
      expect(videoTransformations('border', { color: '#3020ff' })).toBe('bo_1px_solid_rgb:3020ff');
      expect(videoTransformations('border', { color: '#3020ff22' })).toBe(
        'bo_1px_solid_rgb:3020ff22',
      );
      expect(videoTransformations('border', { color: 'rgb:3020ff' })).toBe(
        'bo_1px_solid_rgb:3020ff',
      );
      expect(videoTransformations('border', { color: 'rgb:3020ff22' })).toBe(
        'bo_1px_solid_rgb:3020ff22',
      );
      expect(videoTransformations('border', { color: 'red', width: 3 })).toBe('bo_3px_solid_red');
      expect(videoTransformations('border', { color: '#3020ff', width: '2px' })).toBe(
        'bo_2px_solid_rgb:3020ff',
      );
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('border', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('border', { width: 1 })).toThrowErrorMatchingSnapshot();
      expect(() =>
        videoTransformations('border', { color: '#3020f' }),
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        videoTransformations('border', { color: '#3020ff2' }),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('color', () => {
    it('accepts a color string', () => {
      expect(videoTransformations('color', 'green')).toBe('co_green');
      expect(videoTransformations('color', '#204')).toBe('co_rgb:204');
      expect(videoTransformations('color', '#204f')).toBe('co_rgb:204f');
      expect(videoTransformations('color', '#2040fa')).toBe('co_rgb:2040fa');
      expect(videoTransformations('color', 'rgb:2040fa')).toBe('co_rgb:2040fa');
      expect(videoTransformations('color', 'rgb:2040faf0')).toBe('co_rgb:2040faf0');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('color', '#30')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('color', '#3020f')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('color', '#3020ff2')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('color', '#3020ff2ff')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('crop', () => {
    it('accepts valid string values', () => {
      expect(videoTransformations('crop', 'scale')).toBe('c_scale');
      expect(videoTransformations('crop', 'fill')).toBe('c_fill');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('crop', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('crop', 300)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('delay', () => {
    it('accepts a positive number', () => {
      expect(videoTransformations('delay', 30)).toBe('dl_30');
    });
    it('accepts a numeric string', () => {
      expect(videoTransformations('delay', '30')).toBe('dl_30');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('delay', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('delay', '-10')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('delay', -10)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('dpr', () => {
    it('accepts a positive number', () => {
      expect(videoTransformations('dpr', 3)).toBe('dpr_3');
    });
    it('accepts a numeric string', () => {
      expect(videoTransformations('dpr', '2.0')).toBe('dpr_2.0');
    });
    it('accepts the value `auto`', () => {
      expect(videoTransformations('dpr', 'auto')).toBe('dpr_auto');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('dpr', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('dpr', -1)).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('dpr', 0)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('effects', () => {
    it('accepts any value', () => {
      expect(videoTransformations('effects', 'accelerate')).toBe('e_accelerate');
      expect(videoTransformations('effects', 'vignette')).toBe('e_vignette');
    });
  });

  describe('flags', () => {
    it('accepts a valid value', () => {
      expect(videoTransformations('flags', 'awebp')).toBe('fl_awebp');
      expect(videoTransformations('flags', 'animated')).toBe('fl_animated');
    });
    it('accepts an array of valid values', () => {
      expect(videoTransformations('flags', ['awebp', 'animated'])).toBe('fl_awebp.animated');
    });
    it('accepts a string of `.` separated values', () => {
      expect(videoTransformations('flags', 'awebp.animated')).toBe('fl_awebp.animated');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('flags', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() =>
        videoTransformations('flags', ['any_format', 'bad']),
      ).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('flags', 'attachment.bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('gravity', () => {
    it('accepts valid string values', () => {
      expect(videoTransformations('gravity', 'north_east')).toBe('g_north_east');
      expect(videoTransformations('gravity', 'south_west')).toBe('g_south_west');
    });
    it('accepts `center`', () => {
      expect(videoTransformations('gravity', 'center')).toBe('g_center');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('gravity', 'bad:auto')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('gravity', 'auto-bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('height', () => {
    it('accepts a number', () => {
      expect(videoTransformations('height', 300)).toBe('h_300');
    });
    it('accepts a numeric string', () => {
      expect(videoTransformations('height', '300')).toBe('h_300');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('height', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('overlay', () => {
    it('accepts any string as public id', () => {
      expect(videoTransformations('overlay', 'badge')).toBe('l_badge');
      expect(videoTransformations('overlay', 'red_button.jpg')).toBe('l_red_button.jpg');
      expect(videoTransformations('overlay', 'text:Arial_50:Smile!')).toBe(
        'l_text:Arial_50:Smile!',
      );
      expect(videoTransformations('overlay', 'text:default_style:Hello+World')).toBe(
        'l_text:default_style:Hello+World',
      );
    });
    it('accepts an object with `text` and a `publicId`', () => {
      expect(
        videoTransformations('overlay', {
          text: 'Hello World',
          publicId: 'default_style',
        }),
      ).toBe('l_text:default_style:Hello%20World');
    });
    it('accepts an object with `text` and text caption options', () => {
      expect(
        videoTransformations('overlay', {
          text: 'Hello World',
          fontFamily: 'Times New Roman',
          fontSize: '16',
        }),
      ).toBe('l_text:Times%20New%20Roman_16:Hello%20World');
      expect(
        videoTransformations('overlay', {
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
        videoTransformations('overlay', {
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
        videoTransformations('overlay', { text: 'No fontFamily', fontSize: 12 }),
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        videoTransformations('overlay', {
          text: 'No fontSize',
          fontFamily: 'Arial',
        }),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('quality', () => {
    it('accepts a number between 1 an 100 inclusive', () => {
      expect(videoTransformations('quality', 1)).toBe('q_1');
      expect(videoTransformations('quality', 60)).toBe('q_60');
      expect(videoTransformations('quality', 100)).toBe('q_100');
    });
    it('accepts a numeric string', () => {
      expect(videoTransformations('quality', '50')).toBe('q_50');
    });
    it('accepts a percentage and chroma sub-sampling', () => {
      expect(videoTransformations('quality', '60:420')).toBe('q_60:420');
    });
    it('accepts `auto`', () => {
      expect(videoTransformations('quality', 'auto')).toBe('q_auto');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('quality', 0)).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('quality', 105)).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('quality', '105')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('quality', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('quality', 'auto:bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('radius', () => {
    it('accepts a number', () => {
      expect(videoTransformations('radius', 30)).toBe('r_30');
    });
    it('accepts a numeric string', () => {
      expect(videoTransformations('radius', '30')).toBe('r_30');
    });
    it('accepts a string of the form x[:y[:z[:u]]]', () => {
      expect(videoTransformations('radius', '20:0')).toBe('r_20:0');
      expect(videoTransformations('radius', '20:0:40')).toBe('r_20:0:40');
      expect(videoTransformations('radius', '20:0:40:40')).toBe('r_20:0:40:40');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('radius', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('radius', '20:0:40:40:90')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('width', () => {
    it('accepts a number', () => {
      expect(videoTransformations('width', 300)).toBe('w_300');
    });
    it('accepts a numeric string', () => {
      expect(videoTransformations('width', '300')).toBe('w_300');
    });
    it('accepts `auto`', () => {
      expect(videoTransformations('width', 'auto')).toBe('w_auto');
    });
    it('accepts a string starting with `auto:`', () => {
      expect(videoTransformations('width', 'auto:50')).toBe('w_auto:50');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('width', 'bad:auto')).toThrowErrorMatchingSnapshot();
      expect(() => videoTransformations('width', 'auto-bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('x', () => {
    it('accepts a number', () => {
      expect(videoTransformations('x', 100)).toBe('x_100');
    });
    it('accepts a numeric string', () => {
      expect(videoTransformations('x', '100')).toBe('x_100');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('x', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('y', () => {
    it('accepts a number', () => {
      expect(videoTransformations('y', 100)).toBe('y_100');
    });
    it('accepts a numeric string', () => {
      expect(videoTransformations('y', '100')).toBe('y_100');
    });
    it('throws when invalid', () => {
      expect(() => videoTransformations('y', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('null value on any parameter', () => {
    it('returns false for easy filtering', () => {
      expect(videoTransformations('crop', null)).toBe(false);
    });
  });

  describe('invalid transformations', () => {
    it('throws an error', () => {
      try {
        videoTransformations('abc', 'def');
      } catch (error) {
        expect(error.message).toBe(
          "Cloudinary Video :: unknown transform parameter provided: 'abc'",
        );
        return;
      }
      throw new Error('videoTransformations should have thrown');
    });
  });
});
