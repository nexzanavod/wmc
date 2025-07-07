import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string; // e.g. 'blue', 'green', 'purple', 'yellow'
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  green: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
};

export default function StatCard({ title, value, icon, color = "blue" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] flex items-center gap-4 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorMap[color] || colorMap.blue}`}>
        {icon}
      </div>
      <div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</div>
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
      </div>
    </div>
  );
}
