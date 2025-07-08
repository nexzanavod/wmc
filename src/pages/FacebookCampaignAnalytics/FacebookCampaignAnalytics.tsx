import { useState } from "react";
import { DateRange } from "react-day-picker";
import PageMeta from "../../components/common/PageMeta";
import FacebookFilter from "../../components/common/FacebookFilter";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { getFacebookCampaignData } from "./api/action";
import CampaignOverview from "./components/CampaignOverview";
import CampaignTable from "./components/CampaignTable";
import EmptyState from "./components/EmptyState";

export default function FacebookCampaignAnalytics() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string>("facebook1");
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [campaignData, setCampaignData] = useState<any>(null);

  const handleApply = async (page: string, range: DateRange | undefined) => {
    if (!range?.from || !range?.to) {
      setError("Please select a valid date range");
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedPage(page);
    setSelectedRange(range);
    
    try {
      const startDate = range.from.toISOString().split('T')[0];
      const endDate = range.to.toISOString().split('T')[0];
      
      const data = await getFacebookCampaignData(page, startDate, endDate);
      setCampaignData(data);
      console.log("Fetched campaign analytics for:", { page, range, data });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch campaign data");
      console.error("Error fetching campaign data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Facebook Analytics Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="Facebook Analytics. Monitor your Facebook pages performance, engagement, and insights."
      />
      <PageBreadcrumb pageTitle="Facebook Campaign Analytics" />
              
      <FacebookFilter
        initialPage={selectedPage}
        initialRange={selectedRange}
        onApply={handleApply}
        loading={loading}
      />

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Campaign Data Display */}
      {campaignData && (
        <div className="space-y-6">
          {/* Campaign Overview Cards */}
          {campaignData?.allCampaignData && (
            <CampaignOverview data={campaignData.allCampaignData} />
          )}

          {/* Individual Campaigns Table */}
          {campaignData?.campaigns && (
            <CampaignTable 
              campaigns={campaignData.campaigns} 
              selectedPage={selectedPage}
              startDate={selectedRange?.from?.toISOString().split('T')[0]}
              endDate={selectedRange?.to?.toISOString().split('T')[0]}
            />
          )}
        </div>
      )}

      {/* Empty State */}
      {!campaignData && !loading && <EmptyState />}
    </>
  );
}