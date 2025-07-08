interface AdCardProps {
  ad: {
    id: string;
    name: string;
    impressions: string;
    reach: string;
    spend: string;
    clicks: string;
    cpm: string;
    ctr: string;
    cpc: string;
    actions: Array<{
      action_type: string;
      value: string;
    }>;
    date_start: string;
    date_stop: string;
    creative: {
      title: string;
      message: string;
      image_url: string;
    };
  };
}

export default function AdCard({ ad }: AdCardProps) {
  // Helper function to format action types for display
  const formatActionType = (actionType: string) => {
    return actionType
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace('Onsite Conversion ', '')
      .replace('Lead Grouped', 'Leads')
      .replace('Post ', '');
  };

  // Get key actions for display
  const keyActions = ad.actions.filter(action => 
    ['lead', 'link_click', 'post_engagement', 'comment', 'post_reaction'].includes(action.action_type)
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
      {/* Ad Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {ad.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {ad.date_start} to {ad.date_stop}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ad ID</p>
            <p className="text-xs font-mono text-gray-600 dark:text-gray-300">
              {ad.id}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Creative Content */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Creative Content
              </h4>
              
              {/* Ad Image */}
              {ad.creative.image_url && (
                <div className="mb-4">
                  <img
                    src={ad.creative.image_url}
                    alt={ad.creative.title}
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {/* Ad Title */}
              <div className="mb-3">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {ad.creative.title}
                </h5>
              </div>
              
              {/* Ad Message */}
              <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {ad.creative.message ? ad.creative.message.split('\n').map((line, index) => (
                  <p key={index} className={index > 0 ? 'mt-2' : ''}>
                    {line}
                  </p>
                )) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No message content available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Performance Metrics
            </h4>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  Impressions
                </p>
                <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  {parseInt(ad.impressions).toLocaleString()}
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Reach
                </p>
                <p className="text-lg font-semibold text-green-900 dark:text-green-100">
                  {parseInt(ad.reach).toLocaleString()}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  Clicks
                </p>
                <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                  {parseInt(ad.clicks).toLocaleString()}
                </p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                  Spend
                </p>
                <p className="text-lg font-semibold text-orange-900 dark:text-orange-100">
                  ${parseFloat(ad.spend).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">CPM</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  ${parseFloat(ad.cpm).toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">CTR</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {parseFloat(ad.ctr).toFixed(2)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">CPC</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  ${parseFloat(ad.cpc).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Actions */}
            {keyActions.length > 0 && (
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Key Actions
                </h5>
                <div className="space-y-2">
                  {keyActions.map((action, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {formatActionType(action.action_type)}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {parseInt(action.value).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
