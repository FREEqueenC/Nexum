import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TrustScoreRing from '../components/TrustScoreRing';
import TransactionFeed from '../components/TransactionFeed';
import ReliabilityMeter from '../components/ReliabilityMeter';
import NewRequestModal from '../components/NewRequestModal';
import RequestGraceModal from '../components/RequestGraceModal';
import Header from '../components/Header';
import { api } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [trustData, setTrustData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal States
    const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
    const [isGraceOpen, setIsGraceOpen] = useState(false);

    // Hardcoded User ID for demo purposes
    const USER_ID = 1;

    // Extract loader logic to reuse
    const loadDashboardData = async () => {
        try {
            // Only show full screen loader if we have no data yet
            if (!user) setLoading(true);

            const [userData, trustRes, txRes] = await Promise.all([
                api.fetchUser(USER_ID),
                api.fetchTrustScore(USER_ID),
                api.fetchTransactions(USER_ID)
            ]);

            setUser(userData);
            setTrustData(trustRes);

            const formattedTxs = txRes.map(tx => ({
                id: tx.id,
                message: 'Connected to Payviah Database',
                merchant: tx.merchant_name,
                category: tx.category,
                amount: parseFloat(tx.amount),
                stabilityRating: tx.stability_rating
            }));
            setTransactions(formattedTxs);

        } catch (err) {
            console.error("Dashboard Load Error:", err);
            setError("Failed to load community data. Ensure the server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
                <div style={{
                    width: '40px', height: '40px',
                    border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--color-primary-light)',
                    borderRadius: '50%', margin: '0 auto 1rem', animation: 'spin 1s linear infinite'
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color: 'var(--color-text-muted)' }}>Connecting to Payviah Network...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container" style={{ paddingTop: '8rem', textAlign: 'center', color: 'var(--color-error)' }}>
                <h2>Connection Issue</h2>
                <p style={{ margin: '1rem 0' }}>{error}</p>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    DEBUG: Trying to connect to: {import.meta.env.VITE_API_URL || '(Local Proxy)'}
                </div>
                <button className="btn-primary" onClick={() => window.location.reload()} style={{ marginTop: '1rem' }}>Retry Connection</button>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                background: 'var(--color-primary)',
                color: 'white',
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '0.25rem',
                zIndex: '1000'
            }}>
                IN PRODUCTION DEMO
            </div>

            <Header user={user} />

            <div style={{ marginBottom: '3rem', marginTop: '1rem' }}>
                <p style={{ color: 'var(--color-text-main)', fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', lineHeight: '1.4' }}>
                    Payviah is <span style={{ color: 'var(--color-success)' }}>community-rooted stability infrastructure</span>.
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '600px', lineHeight: '1.6' }}>
                    We provide instant micro-installments for the essentials that keep you working—like car repairs, childcare, and professional grooming—using a behavioral <strong>'Trust Score'</strong> instead of a credit score.
                </p>
            </div>

            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Community Trust Score</h2>
                <div style={{ cursor: 'default' }}>
                    <TrustScoreRing score={parseInt(trustData?.community_trust_score || 0)} size={240} />
                </div>
                <p style={{ marginTop: '1.5rem', color: 'var(--color-primary-light)', fontWeight: '500' }}>
                    By <span style={{ textDecoration: 'underline' }}>paying efficiently</span>, you're building real stability.
                </p>
                <Link
                    to="/trust-score-explainer"
                    style={{
                        marginTop: '1.5rem',
                        color: 'var(--color-background-end)',
                        backgroundColor: 'var(--color-primary-light)',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'transform 0.2s',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '2rem',
                        boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    What is a Trust Score? →
                </Link>
            </div>

            <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                <TransactionFeed transactions={transactions} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <ReliabilityMeter
                        essentialSpend={parseFloat(trustData?.reliability_index || 0)}
                        verifiedHistory={40}
                        proactiveComm={trustData?.proactive_score || 0}
                    />

                    <div className="glass-panel">
                        <h3>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                            <button className="btn-primary" onClick={() => setIsNewRequestOpen(true)}>
                                New Request
                            </button>
                            <button style={{
                                background: 'transparent', border: '1px solid var(--color-text-muted)',
                                color: 'var(--color-text-main)', padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer'
                            }} onClick={() => setIsGraceOpen(true)}>
                                Request Grace
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <NewRequestModal
                isOpen={isNewRequestOpen}
                onClose={() => setIsNewRequestOpen(false)}
                userId={USER_ID}
                onSuccess={loadDashboardData}
            />

            <RequestGraceModal
                isOpen={isGraceOpen}
                onClose={() => setIsGraceOpen(false)}
                userId={USER_ID}
                onSuccess={loadDashboardData}
            />
        </div>
    );
};

export default Dashboard;
