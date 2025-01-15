import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTasks } from "@/contexts/TaskContext";
import { Card } from "./ui/card";

export function TaskDonutChart() {
  const { getTodayStats } = useTasks();
  const { total, completed } = getTodayStats();
  const remaining = total - completed;

  const data = [
    { name: "Completed", value: completed },
    { name: "Remaining", value: remaining }
  ];

  const COLORS = ["#4ade80", "#6b7280"];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span>Completed ({completed})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span>Remaining ({remaining})</span>
        </div>
      </div>
    </Card>
  );
}