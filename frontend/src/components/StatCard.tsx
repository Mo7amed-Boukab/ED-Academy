import React from "react";

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

export const StatCard = ({
  icon: Icon,
  title,
  value,
  trendLabel,
}: StatCardProps) => {
  return (
    <div className="bg-white border border-gray-200 flex items-center justify-between min-h-[100px] p-5">
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
        {trendLabel && <p className="text-xs text-gray-400">{trendLabel}</p>}
      </div>

      <div className="p-3 bg-[#c41e3a]">
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>
    </div>
  );
};
