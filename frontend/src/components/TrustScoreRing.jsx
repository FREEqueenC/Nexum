import React from 'react';

const TrustScoreRing = ({ score, size = 200, strokeWidth = 12 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    // Color logic based on score
    const getColor = (s) => {
        if (s >= 80) return 'var(--color-primary-light)'; // Green/Teal
        if (s >= 50) return 'var(--color-secondary)'; // Gold
        return 'var(--color-error)'; // Red
    };

    const strokeColor = getColor(score);

    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
                height={size}
                width={size}
                style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
            >
                {/* Background Circle */}
                <circle
                    stroke="var(--color-surface)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress Circle with Glow */}
                <circle
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{
                        strokeDashoffset,
                        transition: 'stroke-dashoffset 1s ease-in-out',
                        filter: `drop-shadow(0 0 8px ${strokeColor})` // Glow effect
                    }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            {/* Centered Text */}
            <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{
                    fontSize: size / 4,
                    fontWeight: '700',
                    color: 'var(--color-text-main)',
                    lineHeight: 1
                }}>
                    {score}
                </div>
                <div style={{
                    fontSize: size / 14,
                    color: 'var(--color-text-muted)',
                    marginTop: '0.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    Trust Score
                </div>
            </div>
        </div>
    );
};

export default TrustScoreRing;
