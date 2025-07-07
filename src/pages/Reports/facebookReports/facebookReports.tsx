import { useRef, useEffect, useState } from "react";
import FacebookReportPage1 from "./facebookRportPages/FacebookReportPage1";
import FacebookReportPage2 from "./facebookRportPages/FacebookReportPage2";
import { downloadPdfFromElements } from "../../../utils/pdfUtils";
import FacebookReportPage3 from "./facebookRportPages/FacebookReportPage3";
import FacebookReportPage4 from "./facebookRportPages/FacebookReportPage4";
import FacebookReportPage4SubPage from "./facebookRportPages/FacebookReportPage4SubPage";
import { getFacebookCardsData } from "../../FacebookAnalytics/api/action";

interface FacebookReportsProps {
  facebookId: string;
  pageName: string;
  dateRange: string;
  startDate?: string;
  endDate?: string;
}

// Function to chunk array into smaller arrays
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function FacebookReports({ facebookId, pageName, dateRange, startDate, endDate }: FacebookReportsProps) {
  const pageOneRef = useRef<HTMLDivElement>(null);
  const pageTwoRef = useRef<HTMLDivElement>(null);
  const pageThreeRef = useRef<HTMLDivElement>(null);
  const pageFourRef = useRef<HTMLDivElement>(null);
  const pageFourSubRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>([]);

  // Add state for cardData and error
  const [pageData, setPageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Calculate page 4 sub-pages based on daily metrics data
  const dailyMetricsChunks = pageData?.daily_metrics ? chunkArray(pageData.daily_metrics, 10) : []; // 10 rows per page
  const needsSubPages = dailyMetricsChunks.length > 1;

  const handleDownloadPdf = () => {
    const baseElements = [pageOneRef.current, pageTwoRef.current, pageThreeRef.current].filter(Boolean);
    
    if (needsSubPages) {
      // Add all sub-pages to PDF
      const subPageElements = pageFourSubRefs.current.map(ref => ref?.current).filter(Boolean);
      const allElements = [...baseElements, ...subPageElements] as HTMLElement[];
      const fileName = startDate && endDate 
        ? `${facebookId}_Facebook_Report_${startDate}_to_${endDate}.pdf`
        : `${facebookId}_Facebook_Report.pdf`;
      downloadPdfFromElements(allElements, fileName);
    } else {
      // Use single page 4
      const allElements = [...baseElements, pageFourRef.current].filter(Boolean) as HTMLElement[];
      const fileName = startDate && endDate 
        ? `${facebookId}_Facebook_Report_${startDate}_to_${endDate}.pdf`
        : `${facebookId}_Facebook_Report.pdf`;
      downloadPdfFromElements(allElements, fileName);
    }
  };

  // Initialize sub-page refs when chunks change
  useEffect(() => {
    pageFourSubRefs.current = dailyMetricsChunks.map(() => ({ current: null }));
  }, [dailyMetricsChunks.length]);

  // Fetch data on mount or when dates change
  useEffect(() => {
    const page = facebookId;
    if (startDate && endDate && facebookId) {
      setLoading(true);
      getFacebookCardsData(page, startDate, endDate).then(res => {
        if (res.success) {
          const data = {
            impression_count: res.impression_count ?? 0,
            engagement_count: res.engagement_count ?? 0,
            reach: res.reach ?? 0,
            follow_count: res.follow_count ?? 0,
            impressions_over_time: res.impressions_over_time ?? [],
            reach_over_time: res.reach_over_time ?? [],
            follows_over_time: res.follows_over_time ?? [],
            engagement_and_follows_over_time: res.engagement_and_follows_over_time ?? [],
            daily_metrics: res.daily_metrics ?? [],
          };
          setPageData(data);
          setError(null);
          setLoading(false);
          console.log("Fetched page data:", data);
        } else {
          setError("Failed to fetch data");
          setLoading(false);
        }
      }).catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
    }
  }, [startDate, endDate, facebookId]);

  return (
    <div className="w-full">
      {loading && (
        <div className="text-center text-blue-500 font-semibold my-4">Loading data...</div>
      )}
      <FacebookReportPage1 company={pageName} dateRange={dateRange} pageRef={pageOneRef} />
      {pageData && (
        <>
          <FacebookReportPage2 pageRef={pageTwoRef} pageData={pageData} />
          <FacebookReportPage3 pageRef={pageThreeRef} pageData={pageData} />
          {needsSubPages ? (
            // Render multiple sub-pages
            dailyMetricsChunks.map((chunk, index) => {
              // Ensure ref exists for this index
              if (!pageFourSubRefs.current[index]) {
                pageFourSubRefs.current[index] = { current: null };
              }
              return (
                <FacebookReportPage4SubPage
                  key={index}
                  pageRef={pageFourSubRefs.current[index]}
                  pageData={chunk}
                  pageNumber={index + 1}
                  totalPages={dailyMetricsChunks.length}
                />
              );
            })
          ) : (
            // Render single page 4
            <FacebookReportPage4 pageRef={pageFourRef} pageData={pageData} />
          )}
        </>
      )}
      <div className="flex justify-center mt-6 print:hidden">
        <button
          className="py-3 px-8 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-lg"
          onClick={handleDownloadPdf}
        >
          Download PDF
        </button>
      </div>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
}
