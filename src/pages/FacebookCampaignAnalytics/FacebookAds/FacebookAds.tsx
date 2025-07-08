import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import { getFacebookAdsData } from "../api/action";
import AdsOverview from "./components/AdsOverview";
import AdCard from "./components/AdCard";

export default function FacebookAds() {
  const { adId } = useParams<{ adId: string }>();
  const [searchParams] = useSearchParams();
  const [adsData, setAdsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get URL parameters
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  useEffect(() => {
    const fetchAdsData = async () => {
      if (!adId || !startDate || !endDate) {
        setError("Missing required parameters: adId, startDate, or endDate");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getFacebookAdsData(adId, startDate, endDate);
        setAdsData(data);
        console.log("Fetched ads data:", data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch ads data");
        console.error("Error fetching ads data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdsData();
  }, [adId, startDate, endDate]);

  return (
    <>
      <PageMeta
        title="Facebook Analytics Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="Facebook Analytics. Monitor your Facebook pages performance, engagement, and insights."
      />
      <PageBreadcrumb pageTitle="Facebook Ads Analytics" />

      {/* Back to Campaign Analytics */}
      <div className="mb-6">
        <Link 
          to="/facebook-campaign-analytics"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Campaign Analytics
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white/90">
              Loading Ads Data...
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Please wait while we fetch your ads analytics.
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Ads Data Display */}
      {adsData && (
        <div className="space-y-6">
          {/* Overview Section */}
          <AdsOverview adsData={adsData} />

          {/* Individual Ads */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Individual Ads Performance
            </h2>
            <div className="space-y-6">
              {adsData.ads.map((ad: any) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!adsData && !loading && !error && (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white/90">
              No Ads Data Available
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Unable to load ads data for the specified parameters.
            </p>
          </div>
        </div>
      )}
    </>
  );
}