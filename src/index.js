import urlBuilder from './urlBuilder';
import imageTransformations from './transformations/image';
import videoTransformations from './transformations/video';

export default urlBuilder({
  image: imageTransformations,
  video: videoTransformations,
});
