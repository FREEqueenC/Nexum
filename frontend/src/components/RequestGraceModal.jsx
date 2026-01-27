import React, { useState } from 'react';
import { X, HeartHandshake, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const RequestGraceModal = ({ isOpen, onClose, onSuccess, userId }) => {
    const [reason, setReason] = useState('Unexpected Bill');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // { status, message, bonus }

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const res = await api.requestGrace({
                user_id: userId,
                reason: reason
            });
            setResult(res);
            if (res.status === 'approved') {
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 2000);
            }
        } catch (err) {
            setResult({ status: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)'
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        background: 'none', border: 'none', color: 'var(--color-text-muted)'
                    }}
                >
                    <X size={24} />
                </button>

                {!result ? (
                    <>
                        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <HeartHandshake color="var(--color-secondary)" />
                            Request Grace
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            Life happens. Communicating early builds trust. Tell us what's going on, and we'll pause your next payment.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>
                                    Reason for Delay
                                </label>
                                <select
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    style={{
                                        width: '100%', padding: '0.75rem',
                                        background: 'var(--color-surface)', border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'var(--color-text-main)', borderRadius: '0.5rem'
                                    }}
                                >
                                    <option value="Unexpected Bill">Unexpected Bill</option>
                                    <option value="Income Gap">Income Gap/Hours Cut</option>
                                    <option value="Family Emergency">Family Emergency</option>
                                    <option value="Health Issue">Health Issue</option>
                                </select>
                            </div>

                            <div style={{ background: 'rgba(233, 196, 106, 0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(233, 196, 106, 0.3)' }}>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
                                    <strong>Pro-Tip:</strong> Requesting grace <em>before</em> a due date increases your Reliability Score.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={loading}
                                style={{ marginTop: '0.5rem' }}
                            >
                                {loading ? 'Checking Eligibility...' : 'Submit Request'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        {result.status === 'approved' ? (
                            <>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                                <h3 style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }}>Grace Granted!</h3>
                                <p style={{ marginBottom: '1rem' }}>{result.message}</p>
                                {result.bonus && (
                                    <div style={{
                                        display: 'inline-block', padding: '0.25rem 0.75rem',
                                        background: 'rgba(16, 185, 129, 0.2)', color: 'var(--color-success)',
                                        borderRadius: '999px', fontWeight: 'bold'
                                    }}>
                                        {result.bonus}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <AlertCircle size={48} color="var(--color-warning)" style={{ margin: '0 auto 1rem' }} />
                                <h3>Request Under Review</h3>
                                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>{result.message}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestGraceModal;
