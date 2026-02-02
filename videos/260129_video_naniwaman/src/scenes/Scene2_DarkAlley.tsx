import { AbsoluteFill, useCurrentFrame, interpolate, Img } from "remotion";
import darkAlleyImage from "../../public/dark_alley.png";

export const Scene2_DarkAlley: React.FC = () => {
    const frame = useCurrentFrame();

    // 画像のフェードイン
    const imageOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    // セリフの表示
    const dialogueOpacity = interpolate(frame, [80, 110], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 暗闇の強調
    const darknessOverlay = interpolate(frame, [0, 60], [0.2, 0.4], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill>
            {/* 背景画像 */}
            <Img
                src={darkAlleyImage}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: imageOpacity,
                }}
            />

            {/* 暗闇のオーバーレイ */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: `rgba(0, 0, 0, ${darknessOverlay})`,
                }}
            />

            {/* セリフ */}
            <div
                style={{
                    position: "absolute",
                    bottom: "150px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: dialogueOpacity,
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    padding: "30px 50px",
                    borderRadius: "15px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                }}
            >
                <p
                    style={{
                        fontSize: "48px",
                        color: "#fff",
                        margin: 0,
                        fontWeight: "600",
                    }}
                >
                    お母さん、怖いよ……
                </p>
            </div>
        </AbsoluteFill>
    );
};
