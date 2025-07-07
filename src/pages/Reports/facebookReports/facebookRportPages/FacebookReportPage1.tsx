import { RefObject } from "react";

interface FacebookReportPage1Props {
  company: string;
  dateRange: string;
  pageRef: RefObject<HTMLDivElement | null>;
}

const FacebookIcon = () => (
  <svg width="24" height="24" fill="#1877F3" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
);
const MetaIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="12" ry="12" fill="#E1306C"/><path d="M16.5 15c-1.5-3-4.5-3-6 0M7.5 9c1.5 3 4.5 3 6 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
);

export default function FacebookReportPage1({ company, dateRange, pageRef }: FacebookReportPage1Props) {
  return (
    <div
      ref={pageRef}
      className="w-full bg-white relative overflow-hidden mb-8 font-sans border border-gray-200 rounded-lg shadow-lg print:border-0 print:rounded-none print:shadow-none"
      style={{ width: '842px', height: '595px' }}
    >
      {/* Top-right orange quarter circle */}
      <div className="absolute top-0 right-0">
        <div 
          className="w-48 h-48 rounded-bl-full" 
          style={{ background: 'linear-gradient(to bottom right, #fdba74, #f97316)' }}
        />
      </div>
      {/* Bottom-left pink quarter circle */}
      <div className="absolute bottom-0 left-0">
        <div 
          className="w-36 h-36 rounded-tr-full" 
          style={{ background: 'linear-gradient(to bottom right, #f9a8d4, #ec4899)' }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-12">
        <div className="flex-1 flex flex-col justify-start pt-8">
          <h1 className="text-5xl font-bold mt-8 mb-6">Social Media Insights</h1>
          <div className="text-xl text-gray-500 mb-8">{dateRange}</div>
          <div className="mb-3 font-bold text-3xl">{company}</div>
          <div className="mb-6 text-xl">{company}</div>
          <div className="flex flex-row items-center gap-6 mb-8">
            <span><FacebookIcon /></span>
            <span><MetaIcon /></span>
          </div>
        </div>
        {/* Bottom branding */}
        <div className="flex justify-center items-end pb-8">
          <div className="text-3xl font-bold">Wingman Creative</div>
        </div>
      </div>
    </div>
  );
}
