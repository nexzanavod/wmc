interface AdsOverviewProps {
  adsData: {
    adid: string;
    ads: Array<{
      impressions: string;
      reach: string;
      spend: string;
      clicks: string;
      actions: Array<{
        action_type: string;
        value: string;
      }>;
    }>;
  };
}

export default function AdsOverview({ adsData }: AdsOverviewProps) {
  // Calculate totals
  const totals = adsData.ads.reduce(
    (acc, ad) => {
      acc.impressions += parseInt(ad.impressions);
      acc.reach += parseInt(ad.reach);
      acc.spend += parseFloat(ad.spend);
      acc.clicks += parseInt(ad.clicks);
      
      // Sum up leads from all ads
      ad.actions.forEach(action => {
        if (action.action_type === 'lead') {
          acc.leads += parseInt(action.value);
        }
      });
      
      return acc;
    },
    { impressions: 0, reach: 0, spend: 0, clicks: 0, leads: 0 }
  );

  // Calculate averages
  const avgCTR = totals.clicks > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
  const avgCPC = totals.clicks > 0 ? totals.spend / totals.clicks : 0;
  const avgCPM = totals.impressions > 0 ? (totals.spend / totals.impressions) * 1000 : 0;

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Campaign Overview
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Campaign ID: {adsData.adid} • {adsData.ads.length} Ads
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Total Impressions */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Impressions</p>
              <p className="text-2xl font-bold">
                {totals.impressions.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-400/30 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Reach */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Reach</p>
              <p className="text-2xl font-bold">
                {totals.reach.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-400/30 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Clicks */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Clicks</p>
              <p className="text-2xl font-bold">
                {totals.clicks.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-400/30 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Spend */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Spend</p>
              <p className="text-2xl font-bold">
                ${totals.spend.toFixed(2)}
              </p>
            </div>
            <div className="bg-orange-400/30 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Leads */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-100 text-sm font-medium">Total Leads</p>
              <p className="text-2xl font-bold">
                {totals.leads.toLocaleString()}
              </p>
            </div>
            <div className="bg-rose-400/30 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Average CTR */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Avg CTR</p>
              <p className="text-2xl font-bold">
                {avgCTR.toFixed(2)}%
              </p>
            </div>
            <div className="bg-indigo-400/30 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 p-4 rounded-xl">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average CPM</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              ${avgCPM.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 p-4 rounded-xl">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average CPC</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              ${avgCPC.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 p-4 rounded-xl">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cost per Lead</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              ${totals.leads > 0 ? (totals.spend / totals.leads).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
