import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { getStoredToken } from "./api/auth";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfile/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Clients from "./pages/Clients/clients";
import AddClientsForm from "./pages/Clients/components/addCliennts";
import FacebookAnalytics from "./pages/FacebookAnalytics/FacebookAnalytics";
import Reports from "./pages/Reports/reports";
import ComingSoon from "./pages/commingsoon/commingsoon";
import FacebookCampaignAnalytics from "./pages/FacebookCampaignAnalytics/FacebookCampaignAnalytics";
import FacebookAds from "./pages/FacebookCampaignAnalytics/FacebookAds/FacebookAds";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = getStoredToken();
  return token ? <>{children}</> : <Navigate to="/signin" replace />;
}

// Auth Route Component (redirect to dashboard if already logged in)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const token = getStoredToken();
  return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard Layout - Protected Routes */}
          <Route element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/add" element={<AddClientsForm />} />

            <Route path="/facebook-analytics" element={<FacebookAnalytics />} />

            <Route path="/facebook-campaign-analytics" element={<FacebookCampaignAnalytics />} />
            <Route path="/facebook-campaign-analytics/ads/:adId" element={<FacebookAds/>} />

            <Route path="/commingsoon" element={<ComingSoon />} />

            <Route path="/reports" element={<Reports/>} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout - Public Routes */}
          <Route path="/signin" element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          } />
          <Route path="/signup" element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          } />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
