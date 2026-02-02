import { Composition } from "remotion";
import { NaniwamanVideo } from "./NaniwamanVideo";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="NaniwamanHero"
                component={NaniwamanVideo}
                durationInFrames={3600} // 2分 (30fps * 120秒)
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
