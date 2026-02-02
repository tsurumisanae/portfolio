import { AbsoluteFill, useCurrentFrame, interpolate, Img, Sequence } from "remotion";
import factoryWorkersImage from "../../public/factory_workers.png";
import ledCloseupImage from "../../public/led_closeup.png";
import factoryDesignImage from "../../public/factory_design.png";

export const Scene8_Factory: React.FC = () => {
    const frame = useCurrentFrame();

    // シーン切り替え（前半：設計、後半：製造）
    const isDesignPhase = frame < 300;

    // ナレーションテキスト
    const narrationOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 設計フェーズのテキスト
    const designTextOpacity = interpolate(frame, [60, 90], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 製造フェーズへの切り替え
    const manufacturingOpacity = interpolate(frame, [290, 320], [0, 1], {
        extrapolateRight: "clamp",
    });

    // 製造テキスト
    const manufacturingTextOpacity = interpolate(frame, [350, 380], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{ backgroundColor: "#2c3e50" }}>
            {/* ナレーション */}
            <div
                style={{
                    position: "absolute",
                    top: "80px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: narrationOpacity,
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    padding: "30px 60px",
                    borderRadius: "15px",
                    border: "3px solid #ffd700",
                    zIndex: 10,
                    maxWidth: "1500px",
                }}
            >
                <p
                    style={{
                        fontSize: "42px",
                        color: "#ffd700",
                        margin: 0,
                        fontWeight: "700",
                        textAlign: "center",
                    }}
                >
                    ナニワマンの力の源……それは看板照明の『ものづくり』にあります。
                </p>
            </div>

            {/* 設計フェーズ */}
            {isDesignPhase && (
                <>
                    <Img
                        src={factoryDesignImage}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />

                    {/* 設計テキスト */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "100px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            opacity: designTextOpacity,
                            backgroundColor: "rgba(52, 152, 219, 0.95)",
                            padding: "35px 60px",
                            borderRadius: "20px",
                            border: "4px solid #fff",
                            maxWidth: "1500px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "38px",
                                color: "#fff",
                                margin: 0,
                                fontWeight: "700",
                                lineHeight: 1.6,
                                textAlign: "center",
                            }}
                        >
                            どうすれば一番目立つか？ どうすれば街が安全になるか？
                            <br />
                            0.1ミリの光にこだわるクリエイティブな設計作業。
                        </p>
                    </div>
                </>
            )}

            {/* 製造フェーズ */}
            {!isDesignPhase && (
                <>
                    {/* 工場作業の画像 */}
                    <Sequence from={0} durationInFrames={150}>
                        <Img
                            src={factoryWorkersImage}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                opacity: manufacturingOpacity,
                            }}
                        />
                    </Sequence>

                    {/* LEDクローズアップ */}
                    <Sequence from={150} durationInFrames={150}>
                        <Img
                            src={ledCloseupImage}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Sequence>

                    {/* 製造テキスト */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "100px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            opacity: manufacturingTextOpacity,
                            backgroundColor: "rgba(231, 76, 60, 0.95)",
                            padding: "35px 60px",
                            borderRadius: "20px",
                            border: "4px solid #fff",
                            maxWidth: "1500px",
                            zIndex: 10,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "38px",
                                color: "#fff",
                                margin: 0,
                                fontWeight: "700",
                                lineHeight: 1.6,
                                textAlign: "center",
                            }}
                        >
                            鉄を切り、複雑な電気を通す。
                            <br />
                            熟練の職人が魅せる、これぞニッポンのカッコいい技！
                        </p>
                    </div>
                </>
            )}
        </AbsoluteFill>
    );
};
