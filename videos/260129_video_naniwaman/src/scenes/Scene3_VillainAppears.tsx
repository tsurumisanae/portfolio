import { AbsoluteFill, useCurrentFrame, interpolate, Img } from "remotion";
import villainImage from "../../public/villain.png";

export const Scene3_VillainAppears: React.FC = () => {
    const frame = useCurrentFrame();

    // 画像のズームイン（脅威を強調）
    const imageScale = interpolate(frame, [0, 60], [1, 1.1], {
        extrapolateRight: "clamp",
    });

    // セリフの表示
    const dialogueOpacity = interpolate(frame, [70, 100], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 赤い不気味なオーバーレイ
    const redOverlay = interpolate(
        frame % 40,
        [0, 20, 40],
        [0.1, 0.3, 0.1]
    );

    return (
        <AbsoluteFill>
            {/* 背景画像 */}
            <Img
                src={villainImage}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${imageScale})`,
                }}
            />

            {/* 赤い不気味なオーバーレイ */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: `rgba(139, 0, 0, ${redOverlay})`,
                }}
            />

            {/* セリフ */}
            <div
                style={{
                    position: "absolute",
                    bottom: "120px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: dialogueOpacity,
                    backgroundColor: "rgba(139, 0, 0, 0.95)",
                    padding: "30px 50px",
                    borderRadius: "15px",
                    border: "3px solid #8b0000",
                    maxWidth: "1400px",
                }}
            >
                <p
                    style={{
                        fontSize: "46px",
                        color: "#fff",
                        margin: 0,
                        fontWeight: "700",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                        textAlign: "center",
                    }}
                >
                    ヒッヒッヒ……暗いところは俺たちの遊び場だ。襲ってやるぞ！
                </p>
            </div>
        </AbsoluteFill>
    );
};
