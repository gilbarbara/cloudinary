import cloudinary from '../src/index';

describe('cloudinary', () => {
  it('exports a url builder ready for configuration', () => {
    const cl = cloudinary({ cloudName: 'test' });

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

    expect(() =>
      cl('bad', {
        resourceType: 'any',
        width: 300,
      }),
    ).toThrowError(/^Cloudinary :: resourceType should be one of/);
  });
});
