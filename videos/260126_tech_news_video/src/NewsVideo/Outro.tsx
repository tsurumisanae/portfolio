import { AbsoluteFill } from 'remotion';
import React from 'react';

export const Outro: React.FC = () => {
    return (
        <AbsoluteFill style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Helvetica, Arial, sans-serif',
            textShadow: '0 4px 10px rgba(0,0,0,0.6)'
        }}>
            <h1 style={{ fontSize: 80 }}>ご視聴ありがとうございました</h1>
        </AbsoluteFill>
    );
};
