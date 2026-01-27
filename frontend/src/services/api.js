// Use environment variable for API URL (Vercel) or fallback to proxy (local)
const ENV_URL = import.meta.env.VITE_API_URL;
// Ensure we always target the /api prefix, whether local or production
export const API_BASE = ENV_URL ? `${ENV_URL.replace(/\/$/, '')}/api` : '/api';

export const api = {
    fetchUser: async (userId) => {
        try {
            const res = await fetch(`${API_BASE}/users/${userId}`);
            if (!res.ok) throw new Error('User not found');
            return await res.json();
        } catch (error) {
            console.error('API Error (fetchUser):', error);
            throw error;
        }
    },

    fetchTrustScore: async (userId) => {
        try {
            const res = await fetch(`${API_BASE}/users/${userId}/trust-score`);
            if (!res.ok) throw new Error('Failed to fetch score');
            return await res.json();
        } catch (error) {
            console.error('API Error (fetchTrustScore):', error);
            throw error;
        }
    },

    fetchTransactions: async (userId) => {
        try {
            const res = await fetch(`${API_BASE}/transactions/user/${userId}`);
            if (!res.ok) throw new Error('Failed to fetch transactions');
            return await res.json();
        } catch (error) {
            console.error('API Error (fetchTransactions):', error);
            throw error;
        }
    },

    createTransaction: async (data) => {
        try {
            const res = await fetch(`${API_BASE}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create transaction');
            return await res.json();
        } catch (error) {
            console.error('API Error (createTransaction):', error);
            throw error;
        }
    },

    requestGrace: async (data) => {
        try {
            const res = await fetch(`${API_BASE}/notifications/request-grace`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to request grace');
            return await res.json();
        } catch (error) {
            console.error('API Error (requestGrace):', error);
            throw error;
        }
    }
};
