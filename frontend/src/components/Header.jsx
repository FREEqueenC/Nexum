import React from 'react';

const Header = ({ user }) => {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 0',
            background: 'transparent',
            marginBottom: '2rem'
        }}>
            {/* Left Side: Brand Identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Logo Icon with Neon Glow */}
                <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: '#4ade80',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(74,222,128,0.4)'
                }}>
                    <span style={{
                        color: '#040d0a',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        fontStyle: 'italic', // Added italic
                        fontFamily: 'var(--font-heading)'
                    }}>N</span>
                </div>
                {/* Main Title */}
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '-0.025em',
                    color: 'white',
                    fontFamily: 'var(--font-serif)' // Changed to serif
                }}>Nexum</h1>
            </div>

            {/* Right Side: User Profile Zone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                <div style={{ textAlign: 'right' }}>
                    <p style={{
                        fontSize: '0.625rem', // 10px
                        color: '#6b7280', // gray-500
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        margin: 0
                    }}>Verified User</p>
                    <p style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#4ade80',
                        margin: 0
                    }}>{user?.name.split(' ')[0] || 'Member'}</p>
                </div>
                {/* Profile Circle with Neon Ring */}
                <div style={{
                    width: '2.75rem', // w-11
                    height: '2.75rem', // h-11
                    borderRadius: '50%',
                    border: '2px solid rgba(74, 222, 128, 0.3)', // border-[#4ade80]/30
                    padding: '2px', // p-0.5
                    boxSizing: 'border-box'
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: '#0d2e23',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        <span style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: 'bold' }}>
                            {user?.name ? user.name[0].toUpperCase() : 'A'}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
