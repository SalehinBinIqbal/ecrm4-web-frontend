import ReactApexChart from "react-apexcharts";
import { useTheme } from "../../theme/useTheme";

const PieChart = ({
  xaxisValue,
  colors,
  showLegend,
  width,
  height,
  series,
  name,
  download,
}) => {
  const { isDark } = useTheme();
  const total = series.reduce((sum, value) => sum + value, 0);

  const options = {
    chart: {
      id: name,
      toolbar: {
        show: true,
        tools: {
          download: download,
        },
      },
    },
    colors: colors,
    labels: xaxisValue,
    ...(isDark && {
      stroke: {
        colors: ["#C9C8CB"],
      },
    }),
    legend: {
      show: showLegend,
      position: "bottom",
      labels: {
        colors: isDark ? "#C9C8CB" : undefined,
      },
      formatter: function (legendName, opts) {
        const value = opts.w.globals.series[opts.seriesIndex];
        const percentage = ((value / total) * 100).toFixed(1);
        return `${legendName}: ${value.toLocaleString()} (${percentage}%)`;
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: function (val) {
          const percent = ((val / total) * 100).toFixed(1);
          return `${val.toLocaleString()} (${percent}%)`;
        },
      },
    },
  };

  return (
    <ReactApexChart
      key={`${name}-${isDark ? "dark" : "light"}`}
      options={options}
      series={series}
      type="donut"
      width={width}
      height={height}
    />
  );
};

export default PieChart;
