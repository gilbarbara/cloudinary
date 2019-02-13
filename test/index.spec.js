import cloudinary from '../src/index';

describe('cloudinary', () => {
  const cl = cloudinary({ cloudName: 'test' });

  it('should exports a function ready for configuration', () => {
    const rawUrl = cl('any.file', { resourceType: 'raw' });
    expect(rawUrl).toBe('https://res.cloudinary.com/test/raw/upload/v1/any.file');

    const imageUrl = cl('simple.png', { height: 140, zoom: 1.2 });
    expect(imageUrl).toBe('https://res.cloudinary.com/test/image/upload/h_140,z_1.2/v1/simple.png');

    const fetchUrl = cl('https://example.com/simple.png', {
      height: 500,
      crop: 'fill',
      type: 'fetch',
    });
    expect(fetchUrl).toBe(
      'https://res.cloudinary.com/test/image/fetch/h_500,c_fill/v1/https://example.com/simple.png',
    );

    const videoUrl = cl(
      { id: 'simple', extension: 'mp4' },
      {
        height: 500,
        crop: 'fill',
        resourceType: 'video',
      },
    );
    expect(videoUrl).toBe(
      'https://res.cloudinary.com/test/video/upload/h_500,c_fill/v1/simple.mp4',
    );
  });

  it('should handle errors', () => {
    expect(() =>
      cl('bad', {
        resourceType: 'any',
        width: 300,
      }),
    ).toThrowError(/^Cloudinary :: resourceType should be one of/);

    expect(() =>
      cl('bad', {
        resourceType: 'image',
        bit_rate: 100,
        width: 300,
      }),
    ).toThrowError("Cloudinary Image :: unknown transform parameter provided: 'bit_rate'");

    expect(() =>
      cl('bad', {
        resourceType: 'video',
        fetchFormat: 'auto',
        width: 300,
      }),
    ).toThrowError("Cloudinary Video :: unknown transform parameter provided: 'fetchFormat'");
  });
});
