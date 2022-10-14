import {t} from "i18next";
import {Bar} from "react-chartjs-2";
import React from "react";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {useTranslation} from "react-i18next";

export function ChartDebts(props){

    const{t} = useTranslation();

    const chartDataDebts = {
        labels: props.debtTypes,
        datasets: [
            {
                label: t('Debts'),
                data: props.debts,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

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

    const barOptionsDebts = {
        responsive: true,
        maintainAspectRatio: props.maintainAspectRatio,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: t('Debts'),
            },
            datalabels: {
                formatter: function (value, context) {
                    return Math.round(value);
                }
            }
        },
    };

    return(
        <div style={{height: props.height, width: props.width}}>
            <Bar options={barOptionsDebts} data={chartDataDebts}/>
        </div>
    );
}