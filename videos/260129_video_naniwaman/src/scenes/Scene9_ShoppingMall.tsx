import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Scene9_ShoppingMall: React.FC = () => {
    const frame = useCurrentFrame();

    // ショッピングモールのフェードイン
    const mallOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    // ナニワマンの登場
    const heroScale = interpolate(frame, [40, 80], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 子どもたちの登場
    const childrenOpacity = interpolate(frame, [100, 140], [0, 1], {
        extrapolateRight: "clamp",
    });

    // セリフ1
    const dialogue1Opacity = interpolate(frame, [180, 210], [0, 1], {
        extrapolateRight: "clamp",
    });

    // セリフ2
    const dialogue2Opacity = interpolate(frame, [300, 330], [0, 1], {
        extrapolateRight: "clamp",
    });

    // キラキラエフェクト
    const sparkle = interpolate(
        frame % 40,
        [0, 20, 40],
        [0.3, 1, 0.3]
    );

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(180deg, #87ceeb 0%, #b0e0e6 50%, #98d8e8 100%)",
                position: "relative",
            }}
        >
            {/* 太陽 */}
            <div
                style={{
                    position: "absolute",
                    top: "80px",
                    right: "150px",
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#ffd700",
                    borderRadius: "50%",
                    boxShadow: "0 0 80px rgba(255, 215, 0, 0.8)",
                }}
            />

            {/* ショッピングモール */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: mallOpacity,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* 建物 */}
                <div
                    style={{
                        width: "1200px",
                        height: "500px",
                        backgroundColor: "#fff",
                        borderRadius: "20px 20px 0 0",
                        position: "relative",
                        boxShadow: "0 -10px 50px rgba(0, 0, 0, 0.2)",
                        border: "5px solid #e0e0e0",
                    }}
                >
                    {/* 看板「ARIO やお」 */}
                    <div
                        style={{
                            position: "absolute",
                            top: "50px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "#e74c3c",
                            padding: "30px 80px",
                            borderRadius: "15px",
                            border: "5px solid #fff",
                            boxShadow: `0 0 ${60 * sparkle}px rgba(255, 215, 0, ${sparkle})`,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "72px",
                                color: "#fff",
                                margin: 0,
                                fontWeight: "900",
                                letterSpacing: "4px",
                            }}
                        >
                            ARIO やお
                        </p>
                    </div>

                    {/* 窓 */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "50px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "grid",
                            gridTemplateColumns: "repeat(6, 1fr)",
                            gap: "30px",
                            width: "900px",
                        }}
                    >
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: "120px",
                                    height: "150px",
                                    backgroundColor: "#87ceeb",
                                    border: "4px solid #3498db",
                                    borderRadius: "5px",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ナニワマン（中央でポーズ） */}
            <div
                style={{
                    position: "absolute",
                    bottom: "250px",
                    left: "50%",
                    transform: `translateX(-50%) scale(${heroScale})`,
                    zIndex: 5,
                }}
            >
                <div
                    style={{
                        width: "250px",
                        height: "380px",
                        background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
                        borderRadius: "125px 125px 0 0",
                        position: "relative",
                        border: "8px solid #fff",
                        boxShadow: "0 0 80px rgba(255, 215, 0, 0.9)",
                    }}
                >
                    {/* 頭 */}
                    <div
                        style={{
                            position: "absolute",
                            top: "40px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "120px",
                            height: "120px",
                            backgroundColor: "#ffd700",
                            borderRadius: "50%",
                            border: "6px solid #fff",
                        }}
                    >
                        {/* 目 */}
                        <div
                            style={{
                                position: "absolute",
                                top: "45px",
                                left: "25px",
                                width: "25px",
                                height: "25px",
                                backgroundColor: "#1a1a2e",
                                borderRadius: "50%",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                top: "45px",
                                right: "25px",
                                width: "25px",
                                height: "25px",
                                backgroundColor: "#1a1a2e",
                                borderRadius: "50%",
                            }}
                        />

                        {/* 笑顔 */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "25px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "60px",
                                height: "30px",
                                borderBottom: "5px solid #1a1a2e",
                                borderRadius: "0 0 60px 60px",
                            }}
                        />
                    </div>

                    {/* 腕（ポーズ） */}
                    <div
                        style={{
                            position: "absolute",
                            top: "180px",
                            left: "-80px",
                            width: "120px",
                            height: "30px",
                            backgroundColor: "#ffd700",
                            borderRadius: "15px",
                            transform: "rotate(-45deg)",
                            border: "4px solid #fff",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "180px",
                            right: "-80px",
                            width: "120px",
                            height: "30px",
                            backgroundColor: "#ffd700",
                            borderRadius: "15px",
                            transform: "rotate(45deg)",
                            border: "4px solid #fff",
                        }}
                    />
                </div>
            </div>

            {/* 子どもたち */}
            <div
                style={{
                    position: "absolute",
                    bottom: "180px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "60px",
                    opacity: childrenOpacity,
                    zIndex: 4,
                }}
            >
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: "80px",
                            height: "140px",
                            background: `linear-gradient(180deg, ${["#ff69b4", "#87ceeb", "#98d8e8", "#ffd700", "#ff6b9d"][i]
                                } 0%, ${["#ff1493", "#4682b4", "#5f9ea0", "#ffed4e", "#ff1493"][i]
                                } 100%)`,
                            borderRadius: "40px 40px 0 0",
                            position: "relative",
                            border: "3px solid #fff",
                            transform: i % 2 === 0 ? "translateY(-10px)" : "translateY(10px)",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "15px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                border: "2px solid #333",
                            }}
                        >
                            {/* 笑顔 */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    left: "10px",
                                    width: "6px",
                                    height: "6px",
                                    backgroundColor: "#333",
                                    borderRadius: "50%",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    right: "10px",
                                    width: "6px",
                                    height: "6px",
                                    backgroundColor: "#333",
                                    borderRadius: "50%",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "8px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "20px",
                                    height: "10px",
                                    borderBottom: "2px solid #333",
                                    borderRadius: "0 0 20px 20px",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* セリフ1 */}
            <div
                style={{
                    position: "absolute",
                    top: "120px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: dialogue1Opacity,
                    backgroundColor: "rgba(255, 215, 0, 0.95)",
                    padding: "30px 50px",
                    borderRadius: "20px",
                    border: "4px solid #fff",
                    maxWidth: "1500px",
                    zIndex: 10,
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
                    ものづくりは、誰かの心を、そして未来をパッと明るくする仕事だ。
                    <br />
                    みんなも僕と一緒に、この街を輝かせないか？
                </p>
            </div>

            {/* セリフ2 */}
            <div
                style={{
                    position: "absolute",
                    bottom: "80px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: dialogue2Opacity,
                    backgroundColor: "rgba(255, 215, 0, 0.95)",
                    padding: "25px 40px",
                    borderRadius: "15px",
                    border: "4px solid #fff",
                    zIndex: 10,
                }}
            >
                <p
                    style={{
                        fontSize: "44px",
                        color: "#1a1a2e",
                        margin: 0,
                        fontWeight: "800",
                        textAlign: "center",
                    }}
                >
                    次はアリオやおで会おう！待ってるぞ！
                </p>
            </div>
        </AbsoluteFill>
    );
};
