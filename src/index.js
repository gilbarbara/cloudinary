import urlBuilder from './urlBuilder';
import imageTransformations from './imageTransformations';
import videoTransformations from './videoTransformations';

export default urlBuilder({
  image: imageTransformations,
  video: videoTransformations,
});
