import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface GroupedBarChartProps {
  data: { date: string; engagement: number; follows: number }[];
  horizontal?: boolean;
}

export default function GroupedBarChart({ data, horizontal = false }: GroupedBarChartProps) {
  const categories = data.map((d) => {
    const date = new Date(d.date);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  });
  const engagementData = data.map((d) => d.engagement);
  const followsData = data.map((d) => d.follows);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      background: "transparent",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal,
        columnWidth: "40%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
      labels: { rotate: -45 },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
    },
    fill: {
      opacity: 0.8,
    },
    colors: ["#2563eb", "#f59e42"],
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => val.toString(),
      },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
  };

  const series = [
    {
      name: "Engagement",
      data: engagementData,
    },
    {
      name: "Follows",
      data: followsData,
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[400px]">
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
}
