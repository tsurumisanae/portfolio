import { AbsoluteFill, useCurrentFrame, interpolate, Img } from "remotion";
import heroFamilyImage from "../../public/hero_family.png";

export const Scene5_Gratitude: React.FC = () => {
    const frame = useCurrentFrame();

    // 画像のフェードイン
    const imageOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 明るさの調整
    const brightness = interpolate(frame, [0, 60], [0.8, 1.1], {
        extrapolateRight: "clamp",
    });

    // セリフ1: 親子
    const dialogue1Opacity = interpolate(frame, [40, 70], [0, 1], {
        extrapolateRight: "clamp",
    });

    // セリフ2: ナニワマン
    const dialogue2Opacity = interpolate(frame, [120, 150], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill>
            {/* 背景画像 */}
            <Img
                src={heroFamilyImage}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: imageOpacity,
                    filter: `brightness(${brightness})`,
                }}
            />

            {/* 温かみのあるオーバーレイ */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(180deg, transparent 0%, rgba(255, 215, 0, 0.1) 100%)",
                }}
            />

            {/* セリフ1: 親子 */}
            <div
                style={{
                    position: "absolute",
                    top: "100px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: dialogue1Opacity,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    padding: "30px 50px",
                    borderRadius: "15px",
                    border: "4px solid #4a90e2",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                }}
            >
                <p
                    style={{
                        fontSize: "52px",
                        color: "#1a1a2e",
                        margin: 0,
                        fontWeight: "800",
                    }}
                >
                    ありがとう！ナニワマン！
                </p>
            </div>

            {/* セリフ2: ナニワマン */}
            <div
                style={{
                    position: "absolute",
                    bottom: "80px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: dialogue2Opacity,
                    backgroundColor: "rgba(255, 215, 0, 0.95)",
                    padding: "35px 60px",
                    borderRadius: "20px",
                    border: "4px solid #fff",
                    maxWidth: "1600px",
                    boxShadow: "0 10px 40px rgba(255, 215, 0, 0.5)",
                }}
            >
                <p
                    style={{
                        fontSize: "38px",
                        color: "#1a1a2e",
                        margin: 0,
                        fontWeight: "700",
                        lineHeight: 1.6,
                        textAlign: "center",
                    }}
                >
                    大丈夫かい？ 僕たちは君たちを守るため、日々、暗くて危険なところはないかパトロールしているんだ。
                    <br />
                    暗いところがあれば、僕たちがすぐに助けに行くよ！
                </p>
            </div>
        </AbsoluteFill>
    );
};
