export async function getFacebookCardsData(fbid: string, startDate: string, endDate: string) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const url = `${API_BASE_URL}/fbinsites/cardsdata/${fbid}/${startDate}/${endDate}`;
  const token = localStorage.getItem('authToken');
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Facebook cards data");
  }
  return response.json();
}
