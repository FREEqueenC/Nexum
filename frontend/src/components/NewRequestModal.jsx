import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { api } from '../services/api';

const NewRequestModal = ({ isOpen, onClose, onSuccess, userId }) => {
    const [amount, setAmount] = useState('');
    const [merchant, setMerchant] = useState('');
    const [category, setCategory] = useState('Auto Repair');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.createTransaction({
                user_id: userId,
                merchant_id: 1, // Mocking merchant lookup for MVP (1 = Auto Repair, etc logic later)
                amount: parseFloat(amount),
                stability_rating: 9 // Mocking AI logic for now (Essential categories = high stability)
            });
            onSuccess();
            onClose();
            // Reset form
            setAmount('');
            setMerchant('');
            setCategory('Auto Repair');
        } catch (err) {
            alert('Failed to create request. Please try again.');
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

                <h2 style={{ marginBottom: '1.5rem' }}>New Request</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>
                            Using BNPL for
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                width: '100%', padding: '0.75rem',
                                background: 'var(--color-surface)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'var(--color-text-main)', borderRadius: '0.5rem'
                            }}
                        >
                            <option value="Auto Repair">🔧 Auto Repair (Essential)</option>
                            <option value="Childcare">👶 Childcare (Essential)</option>
                            <option value="Grooming">✂️ Grooming (Essential)</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>
                            Merchant Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. North County Auto"
                            value={merchant}
                            onChange={(e) => setMerchant(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '0.75rem',
                                background: 'var(--color-surface)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'var(--color-text-main)', borderRadius: '0.5rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>
                            Amount ($)
                        </label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="0.01"
                            step="0.01"
                            style={{
                                width: '100%', padding: '0.75rem',
                                background: 'var(--color-surface)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'var(--color-text-main)', borderRadius: '0.5rem'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        {loading ? 'Processing...' : <><Check size={18} /> Submit Request</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewRequestModal;
