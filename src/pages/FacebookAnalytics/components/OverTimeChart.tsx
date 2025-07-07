import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface OverTimeChartProps {
  data: { date: string; value: number }[];
  color?: string;
  label?: string;
}

export default function OverTimeChart({ data, color = "#2563eb", label = "Impressions" }: OverTimeChartProps) {
  const categories = data.map((d) => {
    const dateObj = new Date(d.date);
    return dateObj.toLocaleDateString(undefined, { month: 'short', day: '2-digit' });
  });
  const values = data.map((d) => d.value);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: [color],
    stroke: { curve: "straight", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: color,
            opacity: 0.4,
          },
          {
            offset: 100,
            color: color,
            opacity: 0,
          },
        ],
      },
    },
    markers: { size: 0, strokeColors: "#fff", strokeWidth: 2, hover: { size: 6 } },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, x: { format: "dd MMM yyyy" } },
    xaxis: {
      type: "category",
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      labels: { rotate: -45 },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
      title: { text: "", style: { fontSize: "0px" } },
    },
  };

  const series = [
    {
      name: label,
      data: values,
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[400px]">
        <Chart options={options} series={series} type="area" height={310} />
      </div>
    </div>
  );
}
