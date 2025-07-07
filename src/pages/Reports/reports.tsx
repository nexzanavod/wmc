import { useState, useEffect, Suspense, lazy } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const FacebookReports = lazy(() => import("./facebookReports/facebookReports"));

const reportTypes = [
  { value: "facebook", label: "Facebook Report" },
  { value: "analytics", label: "Analytics Report" },
  { value: "console", label: "Console Report" },
];

const analyticsOptions = [
  { id: "analytics1", name: "Analytics Option 1" },
  { id: "analytics2", name: "Analytics Option 2" },
];
const consoleOptions = [
  { id: "console1", name: "Console Option 1" },
  { id: "console2", name: "Console Option 2" },
];
const months = [
  { value: "2025-01", label: "January 2025" },
  { value: "2025-02", label: "February 2025" },
  { value: "2025-03", label: "March 2025" },
  { value: "2025-04", label: "April 2025" },
  { value: "2025-05", label: "May 2025" },
  { value: "2025-06", label: "June 2025" },
  { value: "2025-07", label: "July 2025" },
  { value: "2025-08", label: "August 2025" },
  { value: "2025-09", label: "September 2025" },
  { value: "2025-10", label: "October 2025" },
  { value: "2025-11", label: "November 2025" },
  { value: "2025-12", label: "December 2025" },
];

export default function Reports() {
  const [facebookPages, setFacebookPages] = useState<Array<{ fbId: string; name: string }>>([]);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('facebookPages');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setFacebookPages(parsed);
      } catch {}
    }
  }, []);

  const handleToggleReport = (type: string) => {
    setSelectedOptions((prev) => ({ ...prev, [type]: "" }));
    setSelectedReports((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGenerateReport = () => {
    setShowPreview(true);
  };

  // Calculate start and end dates from selected month
  const getDateRangeFromMonth = (monthValue: string) => {
    if (!monthValue) return { startDate: "", endDate: "", displayRange: "" };
    
    const year = monthValue.split('-')[0];
    const month = monthValue.split('-')[1];
    
    // Create start date (first day of month)
    const startDate = `${year}-${month}-01`;
    
    // Create end date (last day of month)
    const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
    const endDate = `${year}-${month}-${lastDay.toString().padStart(2, '0')}`;
    
    // Create display range
    const displayRange = `${startDate} - ${endDate}`;
    
    return { startDate, endDate, displayRange };
  };

  return (
    <>
      <PageMeta
        title="Reports | TailAdmin - Next.js Admin Dashboard Template"
        description="Reports. View and analyze your Facebook page reports and insights."
      />
      <PageBreadcrumb pageTitle="Reports" />
      <div className="flex flex-col mt-8 gap-6">
        {/* Select Reports Box - top */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 w-full dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-4">Select Reports</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {reportTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-150 ${selectedReports.includes(type.value)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"}`}
                onClick={() => handleToggleReport(type.value)}
                disabled={type.value === "analytics" || type.value === "console"}
              >
                {type.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedReports.map((type) => (
              <div key={type} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {type === "facebook" && "Facebook Page"}
                  {type === "analytics" && "Analytics Option"}
                  {type === "console" && "Console Option"}
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 mb-2"
                  value={selectedOptions[type] || ""}
                  onChange={e => setSelectedOptions((prev) => ({ ...prev, [type]: e.target.value }))}
                >
                  <option value="">Select...</option>
                  {(selectedReports.includes('facebook') ? facebookPages : selectedReports.includes('analytics') ? analyticsOptions : consoleOptions).map(opt => {
                    const key = 'fbId' in opt ? opt.fbId : opt.id;
                    return (
                      <option key={key} value={key}>{opt.name}</option>
                    );
                  })}
                </select>
              </div>
            ))}
            
            {/* Month Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Month</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
              >
                <option value="">Select month...</option>
                {months.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            className="mt-6 w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            disabled={selectedReports.length === 0 || Object.values(selectedOptions).some(v => !v) || !selectedMonth}
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
        </div>
        
        {/* Preview Box - bottom, full width */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 w-full dark:border-gray-800 dark:bg-gray-900 overflow-auto">
          {showPreview && selectedReports.includes("facebook") && selectedOptions.facebook && selectedMonth ? (
            <div className="w-full">
              <Suspense fallback={<span>Loading preview...</span>}>
                {(() => {
                  const { startDate, endDate, displayRange } = getDateRangeFromMonth(selectedMonth);
                  const pageId = selectedOptions.facebook;
                  // When finding the page name
                  const pageName = facebookPages.find(p => p.fbId === pageId)?.name || "";
                  return (
                    <FacebookReports
                      facebookId={pageId}
                      pageName={pageName}
                      dateRange={displayRange}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  );
                })()}
              </Suspense>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <span className="text-gray-400">Select a Facebook page and month to generate report preview</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}