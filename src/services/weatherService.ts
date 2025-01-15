const API_KEY = "2d241ecaf0bc7e8a26840417ec5cd85f";

export async function getWeather(location: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("Weather data fetch failed");
    return await response.json();
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
}