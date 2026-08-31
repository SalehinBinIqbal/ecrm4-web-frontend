import ReactApexChart from "react-apexcharts";
import { useTheme } from "../../theme/useTheme";

const Chart = ({
  chartName,
  title,
  titleAlignment,
  subTitle,
  subTitleAlignment,
  xaxisValue,
  colors,
  data,
  dataLabels,
  yaxis,
  enableZoom,
  type,
  height,
  width,
  stroke,
  lineMarker,
  lineLength,
  squareMarker,
  roundMarker,
  labelPosition,
  download,
}) => {
  const { isDark } = useTheme();

  const options = {
    chart: {
      id: chartName,
      zoom: {
        enabled: enableZoom,
      },
      toolbar: {
        show: true,
        tools: {
          download: download,
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      theme: isDark ? "dark" : "light",
      y: {
        formatter: function (value) {
          return value.toLocaleString();
        },
      },
    },
    ...(stroke && {
      stroke: {
        width: stroke,
        curve: "smooth",
        dashArray: stroke,
      },
    }),
    ...(lineMarker && {
      markers: {
        size: lineLength ? lineLength : 8,
        shape: "line",
      },
    }),
    ...(squareMarker && {
      markers: {
        size: 15,
        shape: "square",
        offsetY: -12,
        hover: {
          size: 18,
        },
      },
    }),
    ...(roundMarker && {
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
    }),
    legend: {
      position: labelPosition ? labelPosition : "bottom",
      labels: {
        colors: isDark ? "#C9C8CB" : undefined,
      },
    },
    colors: colors,
    xaxis: {
      labels: {
        rotate: -90,
        style: {
          fontSize: "11px",
          colors: isDark ? "#C9C8CB" : undefined,
        },
      },
      categories: xaxisValue,
    },
    yaxis: yaxis
      ? yaxis.map((axis) => ({
          ...axis,
          labels: {
            ...axis.labels,
            style: {
              ...axis.labels?.style,
              colors: isDark ? "#C9C8CB" : undefined,
            },
            formatter: function (value) {
              return value.toLocaleString();
            },
          },
        }))
      : {
          labels: {
            style: {
              colors: isDark ? "#C9C8CB" : undefined,
            },
            formatter: function (value) {
              return value.toLocaleString();
            },
          },
        },
    dataLabels: {
      enabled: dataLabels,
      style: {
        colors: isDark ? ["#C9C8CB"] : undefined,
      },
      formatter: function (value) {
        return value.toLocaleString();
      },
    },
    title: {
      text: title,
      align: titleAlignment ? titleAlignment : "left",
    },
    subtitle: {
      text: subTitle,
      align: subTitleAlignment ? subTitleAlignment : "left",
    },
  };

  const series = Array.isArray(data)
    ? data.map((item) => ({
        name: item.seriesName,
        type: item.representationType,
        data: item.values || [],
      }))
    : [
        {
          name: data.seriesName,
          type: data.representationType,
          data: data.values || [],
        },
      ];

  return (
    <ReactApexChart
      key={series}
      options={options}
      series={series}
      type={type}
      height={height}
      width={width}
    />
  );
};

export default Chart;
