import FacebookFilter from "../../components/common/FacebookFilter";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import StatCard from "./components/StatCard";
import { getFacebookCardsData } from "./api/action";
import OverTimeChart from "./components/OverTimeChart";
import BarOverTimeChart from "./components/BarOverTimeChart";
import GroupedBarChart from "./components/GroupedBarChart";
import DailyMetricsTable from "./components/DailyMetricsTable";


const cardIcons = {
  impression: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  engagement: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  reach: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
    </svg>
  ),
  follow: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
};

export default function FacebookAnalytics() {
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardData, setCardData] = useState<{
    impression_count: number;
    engagement_count: number;
    reach: number;
    follow_count: number;
    impressions_over_time?: { date: string; value: number }[];
    reach_over_time?: { date: string; value: number }[];
    follows_over_time?: { date: string; value: number }[];
    engagement_and_follows_over_time?: { date: string; engagement: number; follows: number }[];
    daily_metrics?: { date: string; impression: number; engagement: number; reach: number; follow: number }[];
  } | null>(null);

  console.log("Selected Page:", selectedRange);

  function handleApply(page: string, range: DateRange | undefined) {
    setSelectedPage(page);
    setSelectedRange(range);
    if (page && range?.from && range?.to) {
      setLoading(true);
      setError(null);
      setCardData(null);
      // Format date as YYYY-MM-DD in local time
      const pad = (n: number) => n.toString().padStart(2, '0');
      const formatLocalDate = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
      const startDate = formatLocalDate(range.from);
      const endDate = formatLocalDate(range.to);
      getFacebookCardsData(page, startDate, endDate).then(res => {
        if (res.success) {
          setCardData({
            impression_count: res.impression_count ?? 0,
            engagement_count: res.engagement_count ?? 0,
            reach: res.reach ?? 0,
            follow_count: res.follow_count ?? 0,
            impressions_over_time: res.impressions_over_time ?? [],
            reach_over_time: res.reach_over_time ?? [],
            follows_over_time: res.follows_over_time ?? [],
            engagement_and_follows_over_time: res.engagement_and_follows_over_time ?? [],
            daily_metrics: res.daily_metrics ?? [],
          });
          setError(null);
        } else {
          setError("No data found");
          setCardData(null);
        }
      }).catch(e => {
        setError(e.message || "Failed to fetch data");
        setCardData(null);
      }).finally(() => setLoading(false));
    }
  }

  return (
    <>
      <PageMeta
        title="Facebook Analytics Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="Facebook Analytics. Monitor your Facebook pages performance, engagement, and insights."
      />
      <PageBreadcrumb pageTitle="Facebook Analytics" />
      <FacebookFilter
        initialPage={selectedPage}
        initialRange={selectedRange}
        onApply={handleApply}
        loading={loading}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Impressions"
          value={cardData ? cardData.impression_count : loading ? "..." : 0}
          icon={cardIcons.impression}
          color="blue"
        />
        <StatCard
          title="Engagements"
          value={cardData ? cardData.engagement_count : loading ? "..." : 0}
          icon={cardIcons.engagement}
          color="green"
        />
        <StatCard
          title="Reach"
          value={cardData ? cardData.reach : loading ? "..." : 0}
          icon={cardIcons.reach}
          color="purple"
        />
        <StatCard
          title="Follows"
          value={cardData ? cardData.follow_count : loading ? "..." : 0}
          icon={cardIcons.follow}
          color="yellow"
        />
      </div>
      {/* Impressions Over Time Line Chart */}
      {cardData?.impressions_over_time && cardData.impressions_over_time.length > 0 && (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-4 dark:text-white/90">Impressions Over Time</h3>
          <OverTimeChart data={cardData.impressions_over_time} color="#2563eb" label="Impressions" />
        </div>
      )}
      {/* Reach Over Time Line Chart */}
      {cardData?.reach_over_time && cardData.reach_over_time.length > 0 && (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-4 dark:text-white/90">Reach Over Time</h3>
          <OverTimeChart data={cardData.reach_over_time} color="#22c55e" label="Reach" />
        </div>
      )}
      {/* Follows Over Time Bar Chart and Grouped Bar Chart Side by Side  */}
      {cardData?.follows_over_time && cardData.follows_over_time.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-xl font-semibold mb-6">Follows Over Time</h3>
            <BarOverTimeChart data={cardData.follows_over_time} color="#f59e42" label="Follows" />
          </div>
          {cardData.engagement_and_follows_over_time && cardData.engagement_and_follows_over_time.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-xl font-semibold mb-6">Engagement & Follows (Grouped Bar)</h3>
              <GroupedBarChart data={cardData.engagement_and_follows_over_time} horizontal />
            </div>
          )}
        </div>
      )}
      {/* Daily Metrics Table */}
      {cardData?.daily_metrics && cardData.daily_metrics.length > 0 && (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-4">Daily Metrics</h3>
          <DailyMetricsTable data={cardData.daily_metrics} />
        </div>
      )}
      {error && <div className="mt-6 text-red-500 text-center">{error}</div>}
    </>
  );
}
