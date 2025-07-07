import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface BarOverTimeChartProps {
  data: { date: string; value: number }[];
  color?: string;
  label?: string;
}

export default function BarOverTimeChart({ data, color = "#f59e42", label = "Follows" }: BarOverTimeChartProps) {
  const categories = data.map((d) => {
    const date = new Date(d.date);
    return date.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' });
  });
  const values = data.map((d) => d.value);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: [color],
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "50%",
        distributed: false,
      },
    },
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
        <Chart options={options} series={series} type="bar" height={310} />
      </div>
    </div>
  );
}
