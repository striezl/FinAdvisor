import {t} from "i18next";
import {Doughnut} from "react-chartjs-2";
import React from "react";
import {numberFormat} from "./helpers";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {useTranslation} from "react-i18next";

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

export function ChartAssetsDonut(props){

    const{t} = useTranslation();

    const donutData = {
        labels: props.assetTypes,
        datasets: [
            {
                data: props.assetsAbsolute,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'Brown',
                    'Magenta'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'Brown',
                    'Magenta'
                ],
                borderWidth: 1,
            }
        ]
    }

    const donutOptions = {
        responsive: true,
        maintainAspectRatio: props.maintainAspectRatio,
        plugins: {
            legend: {
                position: 'top',
                display: props.displayLegend
            },
            title: {
                display: true,
                text: t('Asset distribution'),
            },
            datalabels: {
                formatter: function (value, context) {
                    if (value > 0) {
                        return [context.chart.data.labels[context.dataIndex],
                            numberFormat(context.chart.data.datasets[0].data[context.dataIndex]) + " €"];
                    } else {
                        return "";
                    }

                }
            }
        }
    }

    return(
        <div style={{height: props.height, width: props.width}}><Doughnut data={donutData} options={donutOptions}/></div>
    );

}