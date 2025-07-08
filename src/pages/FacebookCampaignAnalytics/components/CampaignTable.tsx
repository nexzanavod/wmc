import { Link } from "react-router";

interface Campaign {
  id: string;
  name: string;
  status: string;
  amount_spent: string;
  impressions: string;
  reach: string;
  clicks: string;
  cost_per_result: string | null;
  enddate: string;
}

interface CampaignTableProps {
  campaigns: Campaign[];
  selectedPage?: string;
  startDate?: string;
  endDate?: string;
}

export default function CampaignTable({ campaigns, selectedPage, startDate, endDate }: CampaignTableProps) {
  // Helper function to generate the URL with query parameters
  const generateAdUrl = (campaignId: string) => {
    const baseUrl = `/facebook-campaign-analytics/ads/${campaignId}`;
    const params = new URLSearchParams();
    
    if (selectedPage) {
      params.append('page', selectedPage);
    }
    
    if (startDate && endDate) {
      params.append('startDate', startDate);
      params.append('endDate', endDate);
    }
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
          Campaign Details ({campaigns.length} campaigns)
        </h2>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700" style={{ minWidth: '800px' }}>
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-0" style={{ width: '25%' }}>Campaign</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ width: '8%' }}>Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ width: '10%' }}>Spent</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ width: '12%' }}>Impressions</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ width: '10%' }}>Reach</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ width: '8%' }}>Clicks</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ width: '12%' }}>Cost/Result</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ width: '15%' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate" title={campaign.name}>
                      {campaign.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">End: {campaign.enddate}</div>
                  </td>
                  <td className="px-3 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                      campaign.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : campaign.status === 'PAUSED'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-white font-medium whitespace-nowrap">{campaign.amount_spent}</td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">{parseInt(campaign.impressions).toLocaleString()}</td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">{parseInt(campaign.reach).toLocaleString()}</td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">{parseInt(campaign.clicks).toLocaleString()}</td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">{campaign.cost_per_result || 'N/A'}</td>
                  <td className="px-3 py-4">
                    <Link
                      to={generateAdUrl(campaign.id)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30 transition-colors duration-200 whitespace-nowrap"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Ads
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
