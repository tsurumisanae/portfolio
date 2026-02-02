import { AbsoluteFill, useCurrentFrame, interpolate, Img } from "remotion";
import cityAerialImage from "../../public/city_aerial.png";

export const Scene7_CityAerial: React.FC = () => {
    const frame = useCurrentFrame();

    // カメラのゆっくりしたズームイン
    const imageScale = interpolate(frame, [0, 240], [1.2, 1], {
        extrapolateRight: "clamp",
    });

    // 画像の明るさ
    const brightness = interpolate(frame, [0, 60], [0.9, 1.1], {
        extrapolateRight: "clamp",
    });

    // テキストのフェードイン
    const textOpacity = interpolate(frame, [60, 100], [0, 1], {
        extrapolateRight: "clamp",
    });

    // キラキラエフェクト
    const sparkle = interpolate(
        frame % 60,
        [0, 30, 60],
        [0.5, 1, 0.5]
    );

    return (
        <AbsoluteFill>
            {/* 背景画像 */}
            <Img
                src={cityAerialImage}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${imageScale})`,
                    filter: `brightness(${brightness})`,
                }}
            />

            {/* 温かみのあるオーバーレイ */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: `radial-gradient(circle at 50% 50%, rgba(255, 215, 0, ${sparkle * 0.15}), transparent 70%)`,
                }}
            />

            {/* テキストオーバーレイ */}
            <div
                style={{
                    position: "absolute",
                    top: "100px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: textOpacity,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    padding: "35px 60px",
                    borderRadius: "20px",
                    border: "4px solid #ffd700",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                }}
            >
                <p
                    style={{
                        fontSize: "48px",
                        color: "#ffd700",
                        margin: 0,
                        fontWeight: "800",
                        textAlign: "center",
                        lineHeight: 1.5,
                        textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
                    }}
                >
                    平和で明るい
                    <br />
                    やお・ひがしおおさかの街並み
                </p>
            </div>
        </AbsoluteFill>
    );
};
