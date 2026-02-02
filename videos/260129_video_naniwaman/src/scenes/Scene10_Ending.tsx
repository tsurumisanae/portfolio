import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from "remotion";
import naniwaLogoImage from "../../public/naniwa_logo.png";

export const Scene10_Ending: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ロゴのスプリングアニメーション
    const logoScale = spring({
        frame: frame - 60,
        fps,
        config: {
            damping: 100,
        },
    });

    const logoOpacity = interpolate(frame, [60, 100], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 光の輝き
    const glowIntensity = interpolate(
        frame,
        [100, 130, 160, 190, 220],
        [0, 1, 0.5, 1, 0.7]
    );

    // フェードアウト
    const fadeOut = interpolate(frame, [260, 300], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                background: "#000",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* 背景の光エフェクト */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: `radial-gradient(circle at 50% 50%, rgba(74, 144, 226, ${glowIntensity * 0.4}), transparent 60%)`,
                }}
            />

            {/* 光の粒子 */}
            {[...Array(30)].map((_, i) => {
                const angle = (i / 30) * Math.PI * 2;
                const distance = 200 + (frame % 60) * 5;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#4a90e2",
                            borderRadius: "50%",
                            opacity: logoOpacity * 0.6,
                            boxShadow: "0 0 10px rgba(74, 144, 226, 0.8)",
                        }}
                    />
                );
            })}

            {/* NANIWA MAN ロゴ画像 */}
            <div
                style={{
                    transform: `scale(${logoScale})`,
                    opacity: logoOpacity * (1 - fadeOut),
                    position: "relative",
                    filter: `drop-shadow(0 0 ${40 * glowIntensity}px rgba(74, 144, 226, ${glowIntensity}))`,
                }}
            >
                <Img
                    src={naniwaLogoImage}
                    style={{
                        width: "1200px",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </div>

            {/* サブタイトル */}
            <div
                style={{
                    position: "absolute",
                    bottom: "150px",
                    opacity: logoOpacity * (1 - fadeOut),
                }}
            >
                <div
                    style={{
                        padding: "25px 50px",
                        backgroundColor: "rgba(74, 144, 226, 0.2)",
                        borderRadius: "15px",
                        border: "3px solid #4a90e2",
                    }}
                >
                    <p
                        style={{
                            fontSize: "40px",
                            fontWeight: "700",
                            color: "#4a90e2",
                            margin: 0,
                            letterSpacing: "4px",
                            textShadow: `0 0 ${20 * glowIntensity}px rgba(74, 144, 226, ${glowIntensity})`,
                        }}
                    >
                        街を照らす、未来を照らす
                    </p>
                </div>
            </div>

            {/* フェードアウトオーバーレイ */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#000",
                    opacity: fadeOut,
                }}
            />
        </AbsoluteFill>
    );
};
