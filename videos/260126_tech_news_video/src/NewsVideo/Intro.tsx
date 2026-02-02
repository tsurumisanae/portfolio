import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { videoMetadata } from '../newsData';
import React from 'react';

export const Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: { mass: 0.5 },
    });

    return (
        <AbsoluteFill style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Helvetica, Arial, sans-serif',
        }}>
            <div style={{ transform: `scale(${scale})`, textAlign: 'center' }}>
                <h1 style={{
                    fontSize: 100,
                    margin: 0,
                    textShadow: '0 4px 10px rgba(0,0,0,0.6), 0 0 20px rgba(255,0,255,0.5)'
                }}>{videoMetadata.title}</h1>
                <p style={{
                    fontSize: 40,
                    color: '#ecf0f1',
                    marginTop: 20,
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>{videoMetadata.date}</p>
            </div>
        </AbsoluteFill>
    );
};
