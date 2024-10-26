import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

function Chart(props) {
    const chartData: ApexOptions = {
        series: [{
            name: "GPU Temperature",
            data: props.data.gpuTemperature
        }],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight"
            }
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350}></ReactApexChart>
            </div>
        </div>
    )
}

export default Chart;