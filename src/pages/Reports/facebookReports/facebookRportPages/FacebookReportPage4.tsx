import { RefObject } from "react";
import DailyMetricsTable from "../../../FacebookAnalytics/components/DailyMetricsTable";

interface FacebookReportPage4Props {
  pageRef: RefObject<HTMLDivElement | null>;
  pageData?: any;
}

export default function FacebookReportPage4({ pageRef, pageData }: FacebookReportPage4Props) {
  return (
    <div
      ref={pageRef}
      className="w-full relative overflow-hidden font-sans flex flex-col justify-between print:border-0 print:rounded-none print:shadow-none"
      style={{ width: '842px', height: '595px', background: '#fff' }}
    >
      {/* Left vertical gradient line (hex colors only) */}
      <div
        className="absolute left-0 top-0 h-full w-4 z-10"
        style={{
          background: 'linear-gradient(180deg, #FF6A3A 0%, #FFB86C 100%)',
          borderRadius: '0 12px 12px 0',
        }}
      />
      {/* Right orange quarter circle (hex colors only) */}
      <div
        className="absolute right-0 top-0 h-[320px] w-[320px] z-10"
        style={{
          background: 'radial-gradient(circle at left bottom, #FFB86C 0%, #FF6A3A 100%)',
          borderTopRightRadius: '100%',
          borderBottomRightRadius: '0',
          borderBottomLeftRadius: '100%',
          borderTopLeftRadius: '0',
        }}
      />
      {/* Main Content */}
      <div className="relative z-20 flex flex-col h-full px-12 py-10">
        <div>
          <h1 className="text-5xl font-extrabold mb-2">Social Media Insights</h1>
          <h2 className="text-xl font-semibold mb-8">Facebook Page Insights - Page 4</h2>
        </div>
        {/* Content Placeholder */}
        <div className="flex-1 flex flex-col gap-6 justify-center">
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-2">
            <div className="font-semibold text-base mb-1">Daily Metrics</div>
            {pageData?.daily_metrics && pageData.daily_metrics.length > 0 ? (
              <DailyMetricsTable data={pageData.daily_metrics} disablePagination={true} />
            ) : (
              <div className="text-gray-400 text-center">No daily metrics data available.</div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="text-center mt-6">
          <div className="font-bold text-lg">Wingman Creative</div>
          <div className="text-xs text-gray-500">Report Date: Jul 06, 2025</div>
        </div>
      </div>
    </div>
  );
}
