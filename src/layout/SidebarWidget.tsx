export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-yellow-50 px-4 py-5 text-center border border-yellow-200 dark:bg-yellow-900 dark:border-yellow-700`}
    >
      <h3 className="mb-2 font-bold text-yellow-800 dark:text-yellow-200 text-lg">
        Staging Dashboard v0.2
      </h3>
      <p className="mb-3 text-yellow-700 dark:text-yellow-300 text-theme-sm">
        This dashboard is in active development and may experience changes or
        issues.
        <br />
        If you notice any bugs or problems, please notify the developers
        immediately.
        <br />
        Thank you for helping us improve Wingman Creative!
      </p>
      <div className="text-xs text-yellow-600 dark:text-yellow-400 italic mb-2">
        Constantly evolving for a better experience.
      </div>
    </div>
  );
}
