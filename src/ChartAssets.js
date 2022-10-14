import {Bar} from "react-chartjs-2";
import React from "react";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {useTranslation} from "react-i18next";
import {getTargetArray} from "./analysisFunctions";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
ChartJS.register(ChartDataLabels);

export function ChartAssets(props) {

    const {t} = useTranslation();

    const chartData = {
        labels: props.assetTypes,
        datasets: [
            {
                label: t('Actual'),
                data: props.assets,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: t('Target'),
                //data: [25, 25, 25, 10, 0, 10, 5],
                data: getTargetArray(props.riskProfile, props.duration),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: props.maintainAspectRatio,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: t('Assets actual/target %'),
            },
            datalabels: {
                formatter: function (value, context) {
                    return Math.round(value);
                }
            }
        },
    };

    return (<div style={{height: props.height, width: props.width}}><Bar options={barOptions} data={chartData}/></div>);

}


