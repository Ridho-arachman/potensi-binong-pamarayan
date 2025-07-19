"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartStatistikProps {
  data: { label: string; value: number }[];
  title: string;
  color?: string;
  unit?: string;
}

export default function ChartStatistik({
  data,
  title,
  color = "#2563eb",
  unit,
}: ChartStatistikProps) {
  return (
    <div className="w-full h-72 bg-white rounded-xl shadow border border-blue-100 p-4 mb-8">
      <h4 className="font-semibold mb-2 text-blue-900 text-center">{title}</h4>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} unit={unit} />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
