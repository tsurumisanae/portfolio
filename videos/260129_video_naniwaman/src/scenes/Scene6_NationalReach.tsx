import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Scene6_NationalReach: React.FC = () => {
    const frame = useCurrentFrame();

    // 日本地図のフェードイン
    const mapOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 光の点が広がるアニメーション
    const lightSpread = interpolate(frame, [40, 120], [0, 1], {
        extrapolateRight: "clamp",
    });

    // セリフの表示
    const dialogueOpacity = interpolate(frame, [80, 110], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* 日本地図のシルエット */}
            <div
                style={{
                    opacity: mapOpacity,
                    position: "relative",
                    width: "600px",
                    height: "800px",
                }}
            >
                {/* 簡略化された日本地図 */}
                <svg
                    width="600"
                    height="800"
                    viewBox="0 0 600 800"
                    style={{
                        filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))",
                    }}
                >
                    <path
                        d="M 300 100 L 350 150 L 380 200 L 400 300 L 420 400 L 400 500 L 380 600 L 350 700 L 300 750 L 250 700 L 220 600 L 200 500 L 180 400 L 200 300 L 220 200 L 250 150 Z"
                        fill="rgba(255, 215, 0, 0.3)"
                        stroke="#ffd700"
                        strokeWidth="3"
                    />
                </svg>

                {/* 光る点（全国の看板） */}
                {[
                    { x: 300, y: 200 }, // 東京
                    { x: 250, y: 300 }, // 大阪（やお・ひがしおおさか）
                    { x: 350, y: 350 }, // 名古屋
                    { x: 280, y: 450 }, // 広島
                    { x: 220, y: 550 }, // 福岡
                    { x: 380, y: 150 }, // 仙台
                    { x: 420, y: 80 },  // 札幌
                ].map((point, index) => (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left: `${point.x}px`,
                            top: `${point.y}px`,
                            width: "20px",
                            height: "20px",
                            backgroundColor: "#ffd700",
                            borderRadius: "50%",
                            opacity: lightSpread,
                            boxShadow: `0 0 ${30 * lightSpread}px rgba(255, 215, 0, ${lightSpread})`,
                            transform: `scale(${lightSpread})`,
                        }}
                    />
                ))}

                {/* 大阪の点を強調 */}
                <div
                    style={{
                        position: "absolute",
                        left: "250px",
                        top: "300px",
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#ffd700",
                        borderRadius: "50%",
                        opacity: lightSpread,
                        boxShadow: `0 0 ${60 * lightSpread}px rgba(255, 215, 0, ${lightSpread})`,
                        border: "3px solid #fff",
                        transform: `scale(${lightSpread})`,
                    }}
                />
            </div>

            {/* ナニワマン（小さく表示） */}
            <div
                style={{
                    position: "absolute",
                    bottom: "250px",
                    right: "150px",
                    opacity: mapOpacity,
                }}
            >
                <div
                    style={{
                        width: "120px",
                        height: "180px",
                        background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
                        borderRadius: "60px 60px 0 0",
                        border: "4px solid #fff",
                        boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#ffd700",
                            borderRadius: "50%",
                            border: "3px solid #fff",
                        }}
                    />
                </div>
            </div>

            {/* セリフ */}
            <div
                style={{
                    position: "absolute",
                    bottom: "80px",
                    opacity: dialogueOpacity,
                    backgroundColor: "rgba(255, 215, 0, 0.95)",
                    padding: "30px 50px",
                    borderRadius: "20px",
                    border: "4px solid #fff",
                    maxWidth: "1600px",
                }}
            >
                <p
                    style={{
                        fontSize: "38px",
                        color: "#1a1a2e",
                        margin: 0,
                        fontWeight: "700",
                        lineHeight: 1.5,
                        textAlign: "center",
                    }}
                >
                    ナニワマンは、やおだけじゃない。全国の街を明るくしているんだ。
                    <br />
                    君たちの家の近くにあるあの看板も、実は僕たちが光らせて、安全な街を作っているかもしれないぞ！
                </p>
            </div>
        </AbsoluteFill>
    );
};
