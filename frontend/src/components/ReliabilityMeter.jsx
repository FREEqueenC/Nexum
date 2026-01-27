import React from 'react';

const ReliabilityMeter = ({ essentialSpend = 0, verifiedHistory = 0, proactiveComm = 0 }) => {
    const metrics = [
        { label: 'Essential Spend', value: essentialSpend, color: 'var(--color-primary-light)' },
        { label: 'Verified History', value: verifiedHistory, color: 'var(--color-secondary)' },
        { label: 'Proactive Comm.', value: proactiveComm, color: '#38BDF8' } // Sky blue for comms
    ];

    return (
        <div className="glass-panel">
            <h3 style={{ marginBottom: '1rem' }}>Reliability Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {metrics.map((m) => (
                    <div key={m.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                            <span>{m.label}</span>
                            <span style={{ fontWeight: '600' }}>{Number(m.value).toFixed(0)}%</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${Math.min(100, Math.max(0, m.value))}%`,
                                height: '100%',
                                background: m.color,
                                borderRadius: '4px',
                                transition: 'width 1s ease-in-out'
                            }}></div>
                        </div>
                    </div>
                ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
                Higher scores in "Essential Spend" unlock larger limits for auto repairs and childcare.
            </p>
        </div>
    );
};

export default ReliabilityMeter;
