import { AbsoluteFill, Sequence, Audio, Img, staticFile } from 'remotion';
import { Intro } from './Intro';
import { NewsCard } from './NewsCard';
import { Outro } from './Outro';
import { newsData } from '../newsData';
import React from 'react';

export const NewsVideo: React.FC = () => {
    // Upbeat track (SoundHelix Example)
    const bgmSource = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";

    const getBackgroundConfig = (index: number) => {
        switch (index) {
            case 0: return { src: "bg_ai_news.png" }; // AI
            case 1: return { src: "bg_chip_news.png" }; // TPU (Chip)
            case 2: return { src: "bg_social.png" }; // Social
            case 3: return { src: "bg_cpu.png" }; // CPU
            case 4: return { src: "bg_memory_news.png" }; // Memory
            default: return { src: "bg_ai_news.png" };
        }
    };

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <Audio src={bgmSource} volume={0.25} loop />

            <Sequence from={0} durationInFrames={90}>
                <AbsoluteFill>
                    <Img
                        src={staticFile("bg_ai_news.png")}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
                    />
                </AbsoluteFill>
                <Intro />
            </Sequence>

            {newsData.map((item, index) => {
                const bg = getBackgroundConfig(index);
                return (
                    <Sequence
                        key={index}
                        from={90 + index * 150}
                        durationInFrames={150}
                    >
                        <AbsoluteFill>
                            <Img
                                src={staticFile(bg.src)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.3
                                }}
                            />
                        </AbsoluteFill>
                        <NewsCard item={item} index={index} />
                    </Sequence>
                );
            })}

            <Sequence from={90 + newsData.length * 150} durationInFrames={90}>
                <AbsoluteFill>
                    <Img
                        src={staticFile("bg_social.png")}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
                    />
                </AbsoluteFill>
                <Outro />
            </Sequence>
        </AbsoluteFill>
    );
};
