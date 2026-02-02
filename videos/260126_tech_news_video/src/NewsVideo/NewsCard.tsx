import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { NewsItem } from '../newsData';
import React from 'react';

export const NewsCard: React.FC<{ item: NewsItem; index: number }> = ({ item, index }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: {
            damping: 200,
        },
    });

    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const translateY = interpolate(entrance, [0, 1], [height, 0]);

    // Fade out at the end
    const duration = 150; // hardcoded frame duration
    const exitOpacity = interpolate(frame, [duration - 20, duration], [1, 0], { extrapolateLeft: 'clamp' });

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Helvetica, Arial, sans-serif',
                opacity: exitOpacity,
            }}
        >
            <div style={{
                textAlign: 'center',
                transform: `translateY(${translateY}px)`,
                padding: 80,
                maxWidth: '80%',
                opacity,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 30,
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}>
                <div style={{
                    fontSize: 40,
                    color: '#e74c3c',
                    marginBottom: 20,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: '0.1em',
                }}>
                    {item.category}
                </div>
                <div style={{
                    fontSize: 80,
                    fontWeight: 'bold',
                    marginBottom: 40,
                    color: '#2c3e50',
                    lineHeight: 1.1,
                }}>
                    {item.title}
                </div>
                <div style={{
                    fontSize: 40,
                    color: '#555',
                    lineHeight: 1.4,
                }}>
                    {item.description}
                </div>
            </div>
            {/* Simple progress bar */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 10,
                backgroundColor: '#3498db',
                width: `${(frame / duration) * 100}%`
            }} />
        </AbsoluteFill>
    );
};
