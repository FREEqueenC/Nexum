import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, TrendingUp, AlertTriangle, ArrowLeft } from 'lucide-react';
import TrustScoreRing from '../components/TrustScoreRing';

const TrustScoreExplainer = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Back Navigation */}
            <button
                onClick={() => navigate('/')}
                style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'transparent', border: 'none',
                    color: 'var(--color-text-muted)', marginBottom: '2rem',
                    cursor: 'pointer', fontSize: '0.9rem'
                }}
            >
                <ArrowLeft size={18} /> Back to Dashboard
            </button>

            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    How <span style={{ color: 'var(--color-success)', fontStyle: 'italic' }}>Trust</span> Works
                </h1>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                    Nexum is built on relationships, not just algorithms. We look at your whole story, giving you multiple ways to prove your reliability.
                </p>
            </header>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

                {/* 1. The Score Visual */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <TrustScoreRing score={75} size={160} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>The Community Trust Score</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        Starts at 50 or your Credit Score equivalent. Grows up to 100 as you participate in the community.
                    </p>
                </div>

                {/* 2. Ways to Build */}
                <div className="glass-panel">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
                        <TrendingUp size={24} /> Ways to Build Score
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ minWidth: '24px', height: '24px', background: 'rgba(74, 222, 128, 0.2)', borderRadius: '50%', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>1</div>
                            <div>
                                <strong style={{ color: 'var(--color-text-main)' }}>Connect Traditional Credit</strong>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                    Have a credit score? Link it for an instant boost. We use it as a floor, never a ceiling.
                                </p>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ minWidth: '24px', height: '24px', background: 'rgba(74, 222, 128, 0.2)', borderRadius: '50%', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>2</div>
                            <div>
                                <strong style={{ color: 'var(--color-text-main)' }}>Verify History</strong>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                    Show us you pay rent, utilities, or phone bills on time. Consistent habits matter more than perfect history.
                                </p>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ minWidth: '24px', height: '24px', background: 'rgba(74, 222, 128, 0.2)', borderRadius: '50%', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>3</div>
                            <div>
                                <strong style={{ color: 'var(--color-text-main)' }}>Proactive Grace</strong>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                    Can't pay on time? Tell us *before* the due date. We reward communication with points, not penalties.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* 3. What Hurts */}
                <div className="glass-panel" style={{ border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--color-error)' }}>
                        <AlertTriangle size={24} /> What Lowers Score
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ minWidth: '24px', height: '24px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', color: 'var(--color-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>!</div>
                            <div>
                                <strong style={{ color: 'var(--color-text-main)' }}>Ghosting</strong>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                    Missing a payment is okay. Missing a payment and *ignoring us* breaks trust. Ghosting drops your score significantly.
                                </p>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ minWidth: '24px', height: '24px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', color: 'var(--color-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>!</div>
                            <div>
                                <strong style={{ color: 'var(--color-text-main)' }}>Broken Promises</strong>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                    Repeatedly revising grace dates without following through signals instability.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <div style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 78, 59, 0.1) 100%)',
                    borderRadius: '1rem', padding: '2rem', maxWidth: '800px', margin: '0 auto', border: '1px solid rgba(74, 222, 128, 0.2)'
                }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-success)', marginBottom: '1rem' }}>
                        Ready to prove yourself?
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                        You don't need perfect credit to be trusted here. You just need to show up.
                    </p>
                    <button className="btn-primary" onClick={() => navigate('/')}>
                        Start Building Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrustScoreExplainer;
