interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo';
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  const gradientClasses = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600', 
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-600',
    red: 'bg-gradient-to-r from-red-500 to-red-600',
    indigo: 'bg-gradient-to-r from-indigo-500 to-indigo-600'
  };

  const iconBgClasses = {
    blue: 'bg-blue-400/30',
    green: 'bg-green-400/30', 
    purple: 'bg-purple-400/30',
    orange: 'bg-orange-400/30',
    red: 'bg-red-400/30',
    indigo: 'bg-indigo-400/30'
  };

  return (
    <div className={`rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${gradientClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-white/80 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${iconBgClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
