"use client";
import React, { useEffect, useState } from "react";

interface ChartStatistikProps {
  type: string;
  title: string;
  color: string;
  unit?: string;
}

interface ChartData {
  label: string;
  value: number;
}

const ChartStatistik: React.FC<ChartStatistikProps> = ({
  type,
  title,
  color,
  unit,
}) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/statistik?type=${type}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [type]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-16 text-xs">{item.label}</span>
              <div className="flex-1 bg-gray-200 rounded h-2">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${item.value}${unit ? unit : "%"}`,
                    background: color,
                  }}
                ></div>
              </div>
              <span className="w-8 text-xs text-right">
                {item.value}
                {unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartStatistik;
