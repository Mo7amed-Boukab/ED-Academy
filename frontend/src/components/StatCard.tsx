import React from 'react';

type LucideIcon = React.ComponentType<{
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
}>;

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: string;
    trendLabel?: string;
}

export const StatCard = ({ icon: Icon, title, value, trendLabel }: StatCardProps) => {
    return (
        <div className="bg-white border border-gray-200 rounded p-4 flex flex-col items-start justify-between min-h-[160px]">
            <div className="p-3 bg-gray-50 rounded mb-4">
                <Icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
            </div>

            <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                {trendLabel && (
                    <p className="text-xs text-gray-400 font-normal">{trendLabel}</p>
                )}
            </div>
        </div>
    );
};
