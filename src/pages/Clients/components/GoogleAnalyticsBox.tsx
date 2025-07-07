export default function GoogleAnalyticsBox() {
  return (
    <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center">
      <h4 className="font-semibold mb-2">Google Analytics</h4>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        disabled
      >
        Add Google Analytics (Coming Soon)
      </button>
    </div>
  );
}
