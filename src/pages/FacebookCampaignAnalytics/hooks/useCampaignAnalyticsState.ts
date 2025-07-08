import { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router";
import { DateRange } from "react-day-picker";

interface CampaignAnalyticsState {
  selectedPage: string;
  selectedRange: DateRange | undefined;
  campaignData: any;
  timestamp: number;
}

interface UseCampaignAnalyticsStateReturn {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  selectedRange: DateRange | undefined;
  setSelectedRange: (range: DateRange | undefined) => void;
  campaignData: any;
  setCampaignData: (data: any) => void;
  updateUrlParams: (page: string, range: DateRange) => void;
  clearState: () => void;
}

export function useCampaignAnalyticsState(): UseCampaignAnalyticsStateReturn {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState<string>("facebook1");
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [campaignData, setCampaignData] = useState<any>(null);
  const isInitialMount = useRef(true);
  const lastValidRoute = useRef<string | null>(null);

  const STORAGE_KEY = 'facebookCampaignAnalytics';
  const SESSION_KEY = 'facebookCampaignSession';
  const MAX_SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  // Define Facebook campaign analytics related routes
  const isFacebookCampaignRoute = (pathname: string) => {
    return pathname.startsWith('/facebook-campaign-analytics');
  };

  // Create a unique session ID to track if this is a fresh session
  const createSessionId = () => Date.now().toString();
  
  // Clear all stored data
  const clearAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setSelectedPage("facebook1");
    setSelectedRange(undefined);
    setCampaignData(null);
  };

  // Check if session is valid and data should be restored
  const isValidSession = () => {
    const sessionData = sessionStorage.getItem(SESSION_KEY);
    if (!sessionData) return false;
    
    try {
      const { timestamp } = JSON.parse(sessionData);
      return Date.now() - timestamp < MAX_SESSION_DURATION;
    } catch {
      return false;
    }
  };

  // Initialize session tracking
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      // If we're not on a Facebook campaign route, clear everything
      if (!isFacebookCampaignRoute(location.pathname)) {
        clearAllData();
        return;
      }

      // Check if this is a fresh page load/refresh
      const sessionData = sessionStorage.getItem(SESSION_KEY);
      const currentTime = Date.now();
      
      if (!sessionData || !isValidSession()) {
        // Fresh session or expired - clear old data and create new session
        clearAllData();
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
          id: createSessionId(),
          timestamp: currentTime
        }));
      } else {
        // Valid existing session - update timestamp
        try {
          const parsed = JSON.parse(sessionData);
          sessionStorage.setItem(SESSION_KEY, JSON.stringify({
            ...parsed,
            timestamp: currentTime
          }));
        } catch {
          // Corrupted session data - start fresh
          clearAllData();
          sessionStorage.setItem(SESSION_KEY, JSON.stringify({
            id: createSessionId(),
            timestamp: currentTime
          }));
        }
      }

      lastValidRoute.current = location.pathname;
    }
  }, []);

  // Handle route changes
  useEffect(() => {
    if (isInitialMount.current) return;

    const currentRoute = location.pathname;
    const wasFacebookRoute = lastValidRoute.current ? isFacebookCampaignRoute(lastValidRoute.current) : false;
    const isFacebookRoute = isFacebookCampaignRoute(currentRoute);

    // If we're leaving Facebook campaign routes, clear data
    if (wasFacebookRoute && !isFacebookRoute) {
      clearAllData();
    }
    // If we're entering Facebook campaign routes from outside, ensure fresh session
    else if (!wasFacebookRoute && isFacebookRoute) {
      clearAllData();
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        id: createSessionId(),
        timestamp: Date.now()
      }));
    }

    lastValidRoute.current = currentRoute;
  }, [location.pathname]);

  // Load state from localStorage and URL params only for valid sessions
  useEffect(() => {
    if (isInitialMount.current) return;
    
    // Only load data if we're on a Facebook campaign analytics route and have a valid session
    if (!isFacebookCampaignRoute(location.pathname) || !isValidSession()) {
      return;
    }

    const savedData = localStorage.getItem(STORAGE_KEY);
    const pageParam = searchParams.get('page');
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Check if the data is recent (within session duration)
        if (parsed.timestamp && Date.now() - parsed.timestamp < MAX_SESSION_DURATION) {
          setCampaignData(parsed.campaignData);
          setSelectedPage(parsed.selectedPage || pageParam || "facebook1");
          
          if (parsed.selectedRange && parsed.selectedRange.from && parsed.selectedRange.to) {
            setSelectedRange({
              from: new Date(parsed.selectedRange.from),
              to: new Date(parsed.selectedRange.to)
            });
          }
        } else {
          // Data is too old, clear it
          clearAllData();
        }
      } catch (error) {
        console.error('Error parsing saved campaign data:', error);
        clearAllData();
      }
    }
    
    // If URL params exist, use them to restore state
    if (pageParam && startDateParam && endDateParam) {
      setSelectedPage(pageParam);
      setSelectedRange({
        from: new Date(startDateParam),
        to: new Date(endDateParam)
      });
    }
  }, [searchParams, location.pathname]);

  // Save state to localStorage whenever it changes (only for Facebook campaign routes with valid session)
  useEffect(() => {
    if (isInitialMount.current) return;
    
    if (isFacebookCampaignRoute(location.pathname) && isValidSession() && campaignData && selectedPage && selectedRange) {
      const dataToSave: CampaignAnalyticsState = {
        campaignData,
        selectedPage,
        selectedRange,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [campaignData, selectedPage, selectedRange, location.pathname]);

  // Function to update URL parameters
  const updateUrlParams = (page: string, range: DateRange) => {
    if (range.from && range.to) {
      const startDate = range.from.toISOString().split('T')[0];
      const endDate = range.to.toISOString().split('T')[0];
      
      setSearchParams({
        page,
        startDate,
        endDate
      });
    }
  };

  // Function to clear all state
  const clearState = () => {
    clearAllData();
    setSearchParams({});
  };

  return {
    selectedPage,
    setSelectedPage,
    selectedRange,
    setSelectedRange,
    campaignData,
    setCampaignData,
    updateUrlParams,
    clearState
  };
}
