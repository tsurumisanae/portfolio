import { AbsoluteFill, useCurrentFrame, interpolate, Img } from "remotion";
import heroAttackImage from "../../public/hero_attack.png";

export const Scene4_NaniwamanSaves: React.FC = () => {
    const frame = useCurrentFrame();

    // 画像のフェードイン
    const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 光のフラッシュ効果
    const flashIntensity = interpolate(frame, [60, 90, 120], [0, 1, 0.3]);

    // セリフ1（ナニワマン）
    const dialogue1Opacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateRight: "clamp",
    });

    // セリフ2（悪役）
    const dialogue2Opacity = interpolate(frame, [140, 170], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 明るくなる演出
    const brightness = interpolate(frame, [180, 240], [1, 1.3], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill>
            {/* 背景画像 */}
            <Img
                src={heroAttackImage}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: imageOpacity,
                    filter: `brightness(${brightness})`,
                }}
            />

            {/* 光のフラッシュオーバーレイ */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: `rgba(255, 255, 255, ${flashIntensity * 0.6})`,
                }}
            />

            {/* セリフ1: ナニワマン */}
            <div
                style={{
                    position: "absolute",
                    top: "120px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: dialogue1Opacity,
                    backgroundColor: "rgba(255, 215, 0, 0.95)",
                    padding: "30px 50px",
                    borderRadius: "15px",
                    border: "4px solid #fff",
                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
                }}
            >
                <p
                    style={{
                        fontSize: "52px",
                        color: "#1a1a2e",
                        margin: 0,
                        fontWeight: "900",
                        textShadow: "2px 2px 0 #fff",
                    }}
                >
                    待て！ナニワの光をくらえ！
                </p>
            </div>

            {/* セリフ2: 悪役 */}
            <div
                style={{
                    position: "absolute",
                    bottom: "120px",
                    right: "100px",
                    opacity: dialogue2Opacity,
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    padding: "30px 45px",
                    borderRadius: "15px",
                    border: "3px solid #ff0000",
                }}
            >
                <p
                    style={{
                        fontSize: "46px",
                        color: "#fff",
                        margin: 0,
                        fontWeight: "700",
                    }}
                >
                    うわぁああああああ！
                    <br />
                    ま、眩しすぎるー！
                </p>
            </div>
        </AbsoluteFill>
    );
};
