import videoParameter from '../../src/parameters/video';

describe('Video Transform Parameters', () => {
  describe('angle', () => {
    it('accepts a number', () => {
      expect(videoParameter('angle', 90)).toBe('a_90');
      expect(videoParameter('angle', -20)).toBe('a_-20');
    });
    it('accepts a numeric string', () => {
      expect(videoParameter('angle', '10')).toBe('a_10');
      expect(videoParameter('angle', '-20')).toBe('a_-20');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('angle', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('aspectRatio', () => {
    it('accepts a number', () => {
      expect(videoParameter('aspectRatio', 1.5)).toBe('ar_1.5');
    });
    it('accepts valid string values', () => {
      expect(videoParameter('aspectRatio', '1.5')).toBe('ar_1.5');
      expect(videoParameter('aspectRatio', '16:9')).toBe('ar_16:9');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('aspectRatio', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('aspectRatio', '7:')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('background', () => {
    it('accepts a color', () => {
      expect(videoParameter('background', 'blue')).toBe('b_blue');
      expect(videoParameter('background', '#3020ff')).toBe('b_rgb:3020ff');
      expect(videoParameter('background', '#3020ff22')).toBe('b_rgb:3020ff22');
      expect(videoParameter('background', 'rgb:3020ff')).toBe('b_rgb:3020ff');
      expect(videoParameter('background', 'rgb:3020ff22')).toBe('b_rgb:3020ff22');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('background', 'auto:bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('background', '#3020f')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('border', () => {
    it('accepts a fully formed width_style_color string', () => {
      expect(videoParameter('border', '4px_solid_black')).toBe('bo_4px_solid_black');
      expect(videoParameter('border', '4px_solid_#2040fa')).toBe('bo_4px_solid_rgb:2040fa');
      expect(videoParameter('border', '4px_solid_rgb:2040fa')).toBe('bo_4px_solid_rgb:2040fa');
      expect(videoParameter('border', '4px_solid_rgb:2040faf0')).toBe('bo_4px_solid_rgb:2040faf0');
    });
    it('accepts a object with color and optional width', () => {
      expect(videoParameter('border', { color: 'red' })).toBe('bo_1px_solid_red');
      expect(videoParameter('border', { color: '#3020ff' })).toBe('bo_1px_solid_rgb:3020ff');
      expect(videoParameter('border', { color: '#3020ff22' })).toBe('bo_1px_solid_rgb:3020ff22');
      expect(videoParameter('border', { color: 'rgb:3020ff' })).toBe('bo_1px_solid_rgb:3020ff');
      expect(videoParameter('border', { color: 'rgb:3020ff22' })).toBe('bo_1px_solid_rgb:3020ff22');
      expect(videoParameter('border', { color: 'red', width: 3 })).toBe('bo_3px_solid_red');
      expect(videoParameter('border', { color: '#3020ff', width: '2px' })).toBe(
        'bo_2px_solid_rgb:3020ff',
      );
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('border', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('border', { width: 1 })).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('border', { color: '#3020f' })).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('border', { color: '#3020ff2' })).toThrowErrorMatchingSnapshot();
    });
  });

  describe('color', () => {
    it('accepts a color string', () => {
      expect(videoParameter('color', 'green')).toBe('co_green');
      expect(videoParameter('color', '#204')).toBe('co_rgb:204');
      expect(videoParameter('color', '#204f')).toBe('co_rgb:204f');
      expect(videoParameter('color', '#2040fa')).toBe('co_rgb:2040fa');
      expect(videoParameter('color', 'rgb:2040fa')).toBe('co_rgb:2040fa');
      expect(videoParameter('color', 'rgb:2040faf0')).toBe('co_rgb:2040faf0');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('color', '#30')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('color', '#3020f')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('color', '#3020ff2')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('color', '#3020ff2ff')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('crop', () => {
    it('accepts valid string values', () => {
      expect(videoParameter('crop', 'scale')).toBe('c_scale');
      expect(videoParameter('crop', 'fill')).toBe('c_fill');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('crop', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('crop', 300)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('delay', () => {
    it('accepts a positive number', () => {
      expect(videoParameter('delay', 30)).toBe('dl_30');
    });
    it('accepts a numeric string', () => {
      expect(videoParameter('delay', '30')).toBe('dl_30');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('delay', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('delay', '-10')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('delay', -10)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('dpr', () => {
    it('accepts a positive number', () => {
      expect(videoParameter('dpr', 3)).toBe('dpr_3');
    });
    it('accepts a numeric string', () => {
      expect(videoParameter('dpr', '2.0')).toBe('dpr_2.0');
    });
    it('accepts the value `auto`', () => {
      expect(videoParameter('dpr', 'auto')).toBe('dpr_auto');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('dpr', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('dpr', -1)).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('dpr', 0)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('effects', () => {
    it('accepts any value', () => {
      expect(videoParameter('effects', 'accelerate')).toBe('e_accelerate');
      expect(videoParameter('effects', 'vignette')).toBe('e_vignette');
    });
  });

  describe('flags', () => {
    it('accepts a valid value', () => {
      expect(videoParameter('flags', 'awebp')).toBe('fl_awebp');
      expect(videoParameter('flags', 'animated')).toBe('fl_animated');
    });
    it('accepts an array of valid values', () => {
      expect(videoParameter('flags', ['awebp', 'animated'])).toBe('fl_awebp.animated');
    });
    it('accepts a string of `.` separated values', () => {
      expect(videoParameter('flags', 'awebp.animated')).toBe('fl_awebp.animated');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('flags', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('flags', ['any_format', 'bad'])).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('flags', 'attachment.bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('gravity', () => {
    it('accepts valid string values', () => {
      expect(videoParameter('gravity', 'north_east')).toBe('g_north_east');
      expect(videoParameter('gravity', 'south_west')).toBe('g_south_west');
    });
    it('accepts `center`', () => {
      expect(videoParameter('gravity', 'center')).toBe('g_center');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('gravity', 'bad:auto')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('gravity', 'auto-bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('height', () => {
    it('accepts a number', () => {
      expect(videoParameter('height', 300)).toBe('h_300');
    });
    it('accepts a numeric string', () => {
      expect(videoParameter('height', '300')).toBe('h_300');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('height', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('overlay', () => {
    it('accepts any string as public id', () => {
      expect(videoParameter('overlay', 'badge')).toBe('l_badge');
      expect(videoParameter('overlay', 'red_button.jpg')).toBe('l_red_button.jpg');
      expect(videoParameter('overlay', 'text:Arial_50:Smile!')).toBe('l_text:Arial_50:Smile!');
      expect(videoParameter('overlay', 'text:default_style:Hello+World')).toBe(
        'l_text:default_style:Hello+World',
      );
    });
    it('accepts an object with `text` and a `publicId`', () => {
      expect(
        videoParameter('overlay', {
          text: 'Hello World',
          publicId: 'default_style',
        }),
      ).toBe('l_text:default_style:Hello%20World');
    });
    it('accepts an object with `text` and text caption options', () => {
      expect(
        videoParameter('overlay', {
          text: 'Hello World',
          fontFamily: 'Times New Roman',
          fontSize: '16',
        }),
      ).toBe('l_text:Times%20New%20Roman_16:Hello%20World');
      expect(
        videoParameter('overlay', {
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
        videoParameter('overlay', {
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
        videoParameter('overlay', { text: 'No fontFamily', fontSize: 12 }),
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        videoParameter('overlay', {
          text: 'No fontSize',
          fontFamily: 'Arial',
        }),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('quality', () => {
    it('accepts a number between 1 an 100 inclusive', () => {
      expect(videoParameter('quality', 1)).toBe('q_1');
      expect(videoParameter('quality', 60)).toBe('q_60');
      expect(videoParameter('quality', 100)).toBe('q_100');
    });
    it('accepts a numeric string', () => {
      expect(videoParameter('quality', '50')).toBe('q_50');
    });
    it('accepts a percentage and chroma sub-sampling', () => {
      expect(videoParameter('quality', '60:420')).toBe('q_60:420');
    });
    it('accepts `auto`', () => {
      expect(videoParameter('quality', 'auto')).toBe('q_auto');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('quality', 0)).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('quality', 105)).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('quality', '105')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('quality', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('quality', 'auto:bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('radius', () => {
    it('accepts a number', () => {
      expect(videoParameter('radius', 30)).toBe('r_30');
    });
    it('accepts a numeric string', () => {
      expect(videoParameter('radius', '30')).toBe('r_30');
    });
    it('accepts a string of the form x[:y[:z[:u]]]', () => {
      expect(videoParameter('radius', '20:0')).toBe('r_20:0');
      expect(videoParameter('radius', '20:0:40')).toBe('r_20:0:40');
      expect(videoParameter('radius', '20:0:40:40')).toBe('r_20:0:40:40');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('radius', 'bad')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('radius', '20:0:40:40:90')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('width', () => {
    it('accepts a number', () => {
      expect(videoParameter('width', 300)).toBe('w_300');
    });
    it('accepts a numeric string', () => {
      expect(videoParameter('width', '300')).toBe('w_300');
    });
    it('accepts `auto`', () => {
      expect(videoParameter('width', 'auto')).toBe('w_auto');
    });
    it('accepts a string starting with `auto:`', () => {
      expect(videoParameter('width', 'auto:50')).toBe('w_auto:50');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('width', 'bad:auto')).toThrowErrorMatchingSnapshot();
      expect(() => videoParameter('width', 'auto-bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('x', () => {
    it('accepts a number', () => {
      expect(videoParameter('x', 100)).toBe('x_100');
    });
    it('accepts a numeric string', () => {
      expect(videoParameter('x', '100')).toBe('x_100');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('x', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('y', () => {
    it('accepts a number', () => {
      expect(videoParameter('y', 100)).toBe('y_100');
    });
    it('accepts a numeric string', () => {
      expect(videoParameter('y', '100')).toBe('y_100');
    });
    it('throws when invalid', () => {
      expect(() => videoParameter('y', 'bad')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('null value on any parameter', () => {
    it('returns false for easy filtering', () => {
      expect(videoParameter('crop', null)).toBe(false);
    });
  });

  describe('invalid parameters', () => {
    it('throws an error', () => {
      try {
        videoParameter('abc', 'def');
      } catch (error) {
        expect(error.message).toBe(
          "Cloudinary Video :: unknown transform parameter provided: 'abc'",
        );
        return;
      }
      throw new Error('videoParameters should have thrown');
    });
  });
});
