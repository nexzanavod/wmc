import { RefObject } from "react";
import OverTimeChart from "../../../FacebookAnalytics/components/OverTimeChart";

interface FacebookReportPage2Props {
  pageRef: RefObject<HTMLDivElement | null>;
  pageData?: any;
}

export default function FacebookReportPage2({ pageRef, pageData }: FacebookReportPage2Props) {
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
          <h2 className="text-xl font-semibold mb-8">Facebook Page Insights</h2>
          {/* Metrics Row */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Impressions */}
            <div className="bg-[#e8f0fe] rounded-xl p-6 flex flex-col items-center">
              <span className="text-blue-500 text-3xl font-bold mb-1">{pageData?.impression_count ?? '--'}</span>
              <span className="text-gray-500 text-base">Impressions</span>
            </div>
            {/* Reach */}
            <div className="bg-[#e6f9f0] rounded-xl p-6 flex flex-col items-center">
              <span className="text-green-500 text-3xl font-bold mb-1">{pageData?.reach ?? '--'}</span>
              <span className="text-gray-500 text-base">Reach</span>
            </div>
            {/* Engagement */}
            <div className="bg-[#fff7ed] rounded-xl p-6 flex flex-col items-center">
              <span className="text-orange-500 text-3xl font-bold mb-1">{pageData?.engagement_count ?? '--'}</span>
              <span className="text-gray-500 text-base">Engagement</span>
            </div>
            {/* Followers */}
            <div className="bg-[#f3e8ff] rounded-xl p-6 flex flex-col items-center">
              <span className="text-purple-500 text-3xl font-bold mb-1">{pageData?.follow_count ?? '--'}</span>
              <span className="text-gray-500 text-base">Followers</span>
            </div>
          </div>
        </div>
        {/* Chart Placeholders */}
        <div className="flex-1 flex flex-col gap-6 justify-center">
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-2">
            <div className="font-semibold text-base mb-1">Impressions Over Time</div>
               <OverTimeChart data={pageData.impressions_over_time} color="#2563eb" label="Impressions" />
          </div>
        </div>
        {/* Footer */}
        <div className="text-center mt-6">
          <div className="font-bold text-lg">Wingman Creative</div>
          <div className="text-xs text-gray-500">Report Date: Jul 04, 2025</div>
        </div>
      </div>
    </div>
  );
}
