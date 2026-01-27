import React from 'react';
import { Wrench, Heart, Scissors, ShoppingBag } from 'lucide-react';

const CategoryBadge = ({ category }) => {
    const getStyle = (cat) => {
        switch (cat) {
            case 'Auto Repair':
                return {
                    color: '#38BDF8', // Sky Blue
                    bg: 'rgba(56, 189, 248, 0.15)',
                    icon: Wrench
                };
            case 'Childcare':
                return {
                    color: '#F472B6', // Pink
                    bg: 'rgba(244, 114, 182, 0.15)',
                    icon: Heart
                };
            case 'Grooming':
                return {
                    color: '#FACC15', // Yellow
                    bg: 'rgba(250, 204, 21, 0.15)',
                    icon: Scissors
                };
            default:
                return {
                    color: '#94A3B8', // Slate
                    bg: 'rgba(148, 163, 184, 0.15)',
                    icon: ShoppingBag
                };
        }
    };

    const { color, bg, icon: Icon } = getStyle(category);

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            backgroundColor: bg,
            color: color,
            fontSize: '0.875rem',
            fontWeight: '500',
            border: `1px solid ${color}40`
        }}>
            <Icon size={14} />
            <span>{category}</span>
        </div>
    );
};

export default CategoryBadge;
