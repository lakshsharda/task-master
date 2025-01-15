import { useEffect, useState } from "react";
import { getWeather } from "@/services/weatherService";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "./ui/card";
import { Cloud, Sun, Thermometer } from "lucide-react";

export function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.location) {
      getWeather(user.location).then(setWeather);
    }
  }, [user]);

  if (!weather) return null;

  return (
    <Card className="p-6 backdrop-blur-sm bg-background/80">
      <div className="flex items-center gap-4">
        {weather.main.temp > 20 ? (
          <Sun className="h-10 w-10 text-yellow-500" />
        ) : (
          <Cloud className="h-10 w-10 text-blue-500" />
        )}
        <div>
          <h3 className="text-lg font-semibold">Weather in {user?.location}</h3>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            <span>{Math.round(weather.main.temp)}°C</span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Plan your tasks according to today's weather!
      </p>
    </Card>
  );
}