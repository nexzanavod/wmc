import { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface FacebookFilterProps {
  initialPage?: string;
  initialRange?: DateRange;
  onApply: (selectedPage: string, range: DateRange | undefined) => void;
  loading?: boolean;
}

// Get Facebook pages from localStorage
const getFacebookPages = () => {
  try {
    const stored = localStorage.getItem("facebookPages");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading Facebook pages from localStorage:", error);
    return [];
  }
};

function formatDateRange(range: DateRange | undefined) {
  if (!range?.from) return "Select date range";
  if (!range.to) return range.from.toLocaleDateString();
  return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
}

export default function FacebookFilter({ initialPage = "facebook1", initialRange, onApply, loading }: FacebookFilterProps) {
  const [facebookPages, setFacebookPages] = useState<Array<{ fbId: string; name: string }>>([]);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Load Facebook pages from localStorage on component mount
  useEffect(() => {
    const pages = getFacebookPages();
    setFacebookPages(pages);
  }, []);

  // Reset all state when Apply is clicked
  const handleApply = () => {
    setIsPageDropdownOpen(false);
    setIsDatePickerOpen(false);
    // Reset state to force re-render and clear any previous selection
    setTimeout(() => {
      onApply(selectedPage, range);
    }, 0);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] mb-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {/* Facebook Page Dropdown */}
        <div className="relative max-w-xs w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facebook Page</label>
          <button
            onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
            className="inline-flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <span>{facebookPages.find(page => page.fbId === selectedPage)?.name || "Select Page"}</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${isPageDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isPageDropdownOpen && (
            <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 z-20">
              <div className="py-1">
                {facebookPages.map((page) => (
                  <button
                    key={page.fbId}
                    onClick={() => {
                      setSelectedPage(page.fbId);
                      setIsPageDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedPage === page.fbId ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    {page.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Date Range Picker */}
        <div className="relative max-w-xs w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="inline-flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <span>{formatDateRange(range)}</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${isDatePickerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDatePickerOpen && (
            <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 z-30 p-4">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={1}
                className="dark:text-white"
                classNames={{
                  day_selected: "bg-blue-600 text-white hover:bg-blue-700",
                  day_range_middle: "bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-400",
                  day_range_start: "bg-blue-600 text-white",
                  day_range_end: "bg-blue-600 text-white",
                  day: "hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",
                  head_cell: "text-gray-500 dark:text-gray-400 font-medium",
                  caption: "text-gray-900 dark:text-white font-semibold",
                  nav_button: "hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",
                  table: "border-collapse border-spacing-0"
                }}
                style={{ display: 'block' }}
              />
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setRange(undefined)}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsDatePickerOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Apply Button */}
        <div className="flex items-end">
          <button
            className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
            onClick={handleApply}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {loading ? 'Loading...' : 'Apply'}
          </button>
        </div>
      </div>
      {/* Selected Filters as Badges */}
      <div className="flex flex-wrap items-center gap-3 mt-6">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Filters:</span>
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
          {facebookPages.find(page => page.fbId === selectedPage)?.name}
        </span>
        {range?.from && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            {formatDateRange(range)}
          </span>
        )}
      </div>
    </div>
  );
}
