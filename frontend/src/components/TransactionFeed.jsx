import React from 'react';
import CategoryBadge from './CategoryBadge';

const TransactionFeed = ({ transactions }) => {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <p style={{ color: 'var(--color-text-muted)' }}>No recent activity.</p>
            </div>
        );
    }

    return (
        <div className="glass-panel">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Recent Activity
                <span style={{ fontSize: '0.875rem', color: 'var(--color-primary-light)', fontWeight: 'normal' }}>
                    Verified Spend
                </span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {transactions.map((tx) => (
                    <div key={tx.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {/* Date (Simplified) */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                background: 'rgba(255,255,255,0.03)',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                minWidth: '3.5rem'
                            }}>
                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                                    {new Date(tx.date).toLocaleString('default', { month: 'short' })}
                                </span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                    {new Date(tx.date).getDate()}
                                </span>
                            </div>

                            <div>
                                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{tx.merchant}</div>
                                <CategoryBadge category={tx.category} />
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                ${tx.amount.toFixed(2)}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                Stability: <span style={{ color: 'var(--color-success)' }}>{tx.stabilityRating}/10</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionFeed;
