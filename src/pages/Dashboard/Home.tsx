import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  // Get user and facebookPages from localStorage
  let user: any = null;
  let facebookPages: Array<{ fbId: string; name: string }> = [];
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) user = JSON.parse(storedUser);
    const storedPages = localStorage.getItem("facebookPages");
    if (storedPages) facebookPages = JSON.parse(storedPages);
  } catch {}
  const isAdmin = user?.admin;
  const username = user?.username || "User";
  const fbPageCount = facebookPages.length;

  // Live time state
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formattedDate = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <>
      <PageMeta
        title="Dashboard | Wingman Creative"
        description="This is your main dashboard for Wingman Creative."
      />
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl shadow-lg p-8 mb-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Welcome to your Analytics Dashboard</h1>
          <p className="text-lg text-blue-100 mb-2">Hi, <span className="font-semibold">{username}</span> 👋</p>
          <p className="text-base text-blue-100 mb-2">Gain insights, track your progress, and unlock the full potential of your business with our creative analytics tools.</p>
          <p className="text-sm text-blue-200">Today is <span className="font-semibold">{formattedDate}</span> &bull; <span className="font-semibold">{formattedTime}</span></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Facebook Pages Card */}
          <div className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
              <span className="text-xl font-bold text-blue-700">Facebook Page Access</span>
            </div>
            <div className="text-4xl font-extrabold text-blue-600 mb-1">{fbPageCount}</div>
            <div className="text-sm text-gray-500">Pages you have access to</div>
          </div>
          {/* Admin Status Card */}
          <div className={`rounded-xl shadow border p-6 flex flex-col items-center justify-center ${isAdmin ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-center gap-3 mb-2">
              <svg className={`w-8 h-8 ${isAdmin ? 'text-green-500' : 'text-yellow-500'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              <span className={`text-xl font-bold ${isAdmin ? 'text-green-700' : 'text-yellow-700'}`}>Admin Status</span>
            </div>
            <div className={`text-2xl font-bold ${isAdmin ? 'text-green-600' : 'text-yellow-600'}`}>{isAdmin ? 'Admin' : 'User'}</div>
            <div className="text-sm text-gray-500">{isAdmin ? 'You have admin privileges.' : 'You have user privileges.'}</div>
          </div>
        </div>
      </div>
    </>
  );
}
