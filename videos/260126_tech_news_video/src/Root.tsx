import { Composition } from 'remotion';
import { NewsVideo } from './NewsVideo/NewsVideo';
import { newsData } from './newsData';


export const RemotionRoot: React.FC = () => {
  // 90 frames for Intro, 150 frames per news item, 90 frames for Outro
  const totalFrames = 90 + newsData.length * 150 + 90;

  return (
    <>
      <Composition
        id="NewsVideo"
        component={NewsVideo}
        durationInFrames={totalFrames}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
