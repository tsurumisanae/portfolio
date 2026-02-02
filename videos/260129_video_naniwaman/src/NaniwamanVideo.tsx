import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_NaniwamanIntro } from "./scenes/Scene1_NaniwamanIntro";
import { Scene2_DarkAlley } from "./scenes/Scene2_DarkAlley";
import { Scene3_VillainAppears } from "./scenes/Scene3_VillainAppears";
import { Scene4_NaniwamanSaves } from "./scenes/Scene4_NaniwamanSaves";
import { Scene5_Gratitude } from "./scenes/Scene5_Gratitude";
import { Scene6_NationalReach } from "./scenes/Scene6_NationalReach";
import { Scene7_CityAerial } from "./scenes/Scene7_CityAerial";
import { Scene8_Factory } from "./scenes/Scene8_Factory";
import { Scene9_ShoppingMall } from "./scenes/Scene9_ShoppingMall";
import { Scene10_Ending } from "./scenes/Scene10_Ending";

export const NaniwamanVideo: React.FC = () => {
    // シーンごとのフレーム数 (30fps)
    const scenes = {
        intro: 300,           // 10秒 - ナニワマン登場と説明
        darkAlley: 180,       // 6秒 - 暗い路地裏で怯える親子
        villainAppears: 150,  // 5秒 - 悪役登場
        heroSaves: 240,       // 8秒 - ナニワマン救出
        gratitude: 300,       // 10秒 - 親子との会話
        nationalReach: 270,   // 9秒 - 全国展開の説明
        cityAerial: 240,      // 8秒 - 街の空撮
        factory: 600,         // 20秒 - 工場シーン（設計・製造）
        shoppingMall: 420,    // 14秒 - ショッピングモール前
        ending: 300,          // 10秒 - エンディング
    };

    let currentFrame = 0;

    return (
        <AbsoluteFill style={{ backgroundColor: "#000" }}>
            {/* Scene 1: ナニワマン登場 */}
            <Sequence from={currentFrame} durationInFrames={scenes.intro}>
                <Scene1_NaniwamanIntro />
            </Sequence>
            {(currentFrame += scenes.intro)}

            {/* Scene 2: 暗い路地裏 */}
            <Sequence from={currentFrame} durationInFrames={scenes.darkAlley}>
                <Scene2_DarkAlley />
            </Sequence>
            {(currentFrame += scenes.darkAlley)}

            {/* Scene 3: 悪役登場 */}
            <Sequence from={currentFrame} durationInFrames={scenes.villainAppears}>
                <Scene3_VillainAppears />
            </Sequence>
            {(currentFrame += scenes.villainAppears)}

            {/* Scene 4: ナニワマン救出 */}
            <Sequence from={currentFrame} durationInFrames={scenes.heroSaves}>
                <Scene4_NaniwamanSaves />
            </Sequence>
            {(currentFrame += scenes.heroSaves)}

            {/* Scene 5: 感謝の言葉 */}
            <Sequence from={currentFrame} durationInFrames={scenes.gratitude}>
                <Scene5_Gratitude />
            </Sequence>
            {(currentFrame += scenes.gratitude)}

            {/* Scene 6: 全国展開 */}
            <Sequence from={currentFrame} durationInFrames={scenes.nationalReach}>
                <Scene6_NationalReach />
            </Sequence>
            {(currentFrame += scenes.nationalReach)}

            {/* Scene 7: 街の空撮 */}
            <Sequence from={currentFrame} durationInFrames={scenes.cityAerial}>
                <Scene7_CityAerial />
            </Sequence>
            {(currentFrame += scenes.cityAerial)}

            {/* Scene 8: 工場シーン */}
            <Sequence from={currentFrame} durationInFrames={scenes.factory}>
                <Scene8_Factory />
            </Sequence>
            {(currentFrame += scenes.factory)}

            {/* Scene 9: ショッピングモール */}
            <Sequence from={currentFrame} durationInFrames={scenes.shoppingMall}>
                <Scene9_ShoppingMall />
            </Sequence>
            {(currentFrame += scenes.shoppingMall)}

            {/* Scene 10: エンディング */}
            <Sequence from={currentFrame} durationInFrames={scenes.ending}>
                <Scene10_Ending />
            </Sequence>
        </AbsoluteFill>
    );
};
