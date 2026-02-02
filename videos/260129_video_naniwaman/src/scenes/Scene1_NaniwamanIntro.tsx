import { AbsoluteFill, useCurrentFrame, interpolate, Img } from "remotion";
import heroImage from "../../public/hero_pose.png";

export const Scene1_NaniwamanIntro: React.FC = () => {
    const frame = useCurrentFrame();

    // 画像のズームイン
    const imageScale = interpolate(frame, [0, 60], [1.2, 1], {
        extrapolateRight: "clamp",
    });

    // 画像の明るさ
    const imageBrightness = interpolate(frame, [0, 30], [0.3, 1], {
        extrapolateRight: "clamp",
    });

    // テキストのフェードイン
    const text1Opacity = interpolate(frame, [60, 90], [0, 1], {
        extrapolateRight: "clamp",
    });

    const text2Opacity = interpolate(frame, [150, 180], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 光のパルス効果
    const glowPulse = interpolate(
        frame % 60,
        [0, 30, 60],
        [0.6, 1, 0.6]
    );

    return (
        <AbsoluteFill>
            {/* 背景画像 */}
            <Img
                src={heroImage}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${imageScale})`,
                    filter: `brightness(${imageBrightness})`,
                }}
            />

            {/* 光のオーバーレイ */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: `radial-gradient(circle at 50% 40%, rgba(255, 215, 0, ${glowPulse * 0.3}), transparent 60%)`,
                }}
            />

            {/* セリフ1 */}
            <div
                style={{
                    position: "absolute",
                    top: "120px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: text1Opacity,
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                    padding: "30px 60px",
                    borderRadius: "20px",
                    maxWidth: "1300px",
                    textAlign: "center",
                    border: "3px solid rgba(255, 215, 0, 0.8)",
                }}
            >
                <p
                    style={{
                        fontSize: "52px",
                        fontWeight: "bold",
                        color: "#ffd700",
                        margin: 0,
                        lineHeight: 1.6,
                        textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
                    }}
                >
                    やおの夜が暗いのは許さない！
                    <br />
                    光のヒーロー、ナニワマンだ！
                </p>
            </div>

            {/* セリフ2 */}
            <div
                style={{
                    position: "absolute",
                    bottom: "100px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: text2Opacity,
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                    padding: "35px 60px",
                    borderRadius: "20px",
                    maxWidth: "1500px",
                    textAlign: "center",
                    border: "3px solid rgba(255, 255, 255, 0.6)",
                }}
            >
                <p
                    style={{
                        fontSize: "42px",
                        fontWeight: "600",
                        color: "#fff",
                        margin: 0,
                        lineHeight: 1.7,
                    }}
                >
                    僕の使命は、やお市・ひがしおおさか市を世界で一番輝かせること。
                    <br />
                    そして、暗闇に潜む犯罪をなくし、誰もが安全・安心に暮らせる街をつくることだ！
                </p>
            </div>
        </AbsoluteFill>
    );
};
