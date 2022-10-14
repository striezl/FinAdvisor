import './App.css';
import React from "react";
import { useForm } from "react-hook-form";
import {Input} from "@mui/material";
import {FormLabel} from "@mui/material";
import {FormControl} from "@mui/material";
import {Button, FormGroup} from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {useState, useEffect} from "react";
import {Grid} from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

function App() {
    const [count, setCount] = useState(0);
    const [key, setKey] = useState( Date.now() );
    const [stocks, setStocks] = useState( 0 );
    const [rents, setRents] = useState( 0 );
    const [realEstates, setRealEstates] = useState( 0 );
    const [cash, setCash] = useState( 0 );
    const [savingsAtBank, setSavingsAtBank] = useState( 0 );
    const [tangibles, setTangibles] = useState( 0 );
    const [cryptos, setCryptos] = useState( 0 );

/*    const [chartData, setChartData] = useState(
        {
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    //data: [{x:'January', y:20}, {x:'Revenue', y:10}],
                    data: [1,2,4],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Dataset 2',
                    //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    data: [{x:'Sales', y:20}, {x:'Revenue', y:10}],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        }
    );*/
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
 /*  useEffect(()=>{
        setStocks(data.stocks);
    })*/
    const onSubmit = (data) => {
        console.log(data);
        chartData.datasets[0].data = [parseInt(data.stocks),parseInt(data.rents),parseInt(data.realEstate),parseInt(data.cash),
        parseInt(data.savingsAtBank),parseInt(data.tangibles),parseInt(data.cryptos)];
        console.log(chartData);
        setCount(count+1);
        //setChartData (chartData.datasets[0].data = [1,2,3] );
        setKey(Date.now());
        setStocks(data.stocks);
        setRents(data.rents);
        setRealEstates(data.realEstates);
        setCash(data.cash);
        setSavingsAtBank(data.savingsAtBank);
        setTangibles(data.tangibles);
        setCryptos(data.cryptos);
    }
    const [stock1, setStock1] = useState();
    function handleStock1Change(e) {
        setStock1(e.target.value);
        console.log(stock1);
    }
   const chartData = {
        labels,
        datasets: [
            {
                label: 'Actual',
                //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                //data: [{x:'January', y:20}, {x:'Revenue', y:10}],
                data: [stock1,rents, realEstates,cash,savingsAtBank,tangibles,cryptos],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Target',
                //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                data: [25,25,25,10,0,10,5],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    register('stocks', {onChange: (e) => console.log("shit")});
    //const onChange = function (data) {setStocks(data.stocks)};
    //console.log(watch("example"));



    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <Grid container spacing = {2}>
            <Grid item xs>
                <div>Please enter all values in the same currency (USD, EUR,...)</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup >
                {/* register your input into the hook by invoking the "register" function */}
                {/*<Input defaultValue="test" {...register("label")} />*/}

                {/* include validation with required or other standard HTML validation rules */}
                {/*<Input {...register("exampleRequired", { required: true })} />*/}
                        <FormControl>
                            <FormLabel>Stocks</FormLabel>
                            <Input {...register("stocks")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Rents</FormLabel>
                            <Input {...register("rents")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Real Estates</FormLabel>
                            <Input {...register("realEstates")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Cash</FormLabel>
                            <Input {...register("cash")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Savings at Bank</FormLabel>
                            <Input {...register("savingsAtBank")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Tangibles</FormLabel>
                            <Input {...register("tangibles")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Crypto</FormLabel>
                            <Input {...register("cryptos")} />
                        </FormControl>
                        <Button type="submit">
                            Analyze!
                        </Button>
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
                    </FormGroup>
                 </form>
                <FormLabel>Simple Input</FormLabel>
                <Input value={stock1} onChange={handleStock1Change} type = "number">Test</Input>
            </Grid>
            <Grid item xs>
            <label>Count: { count } Data: { chartData.datasets[0].data[0]} Key: {key} </label>
            <Bar options={options} data={chartData} redraw={true} />
            </Grid>
           </Grid>


);
}

const labels = ['Stocks', 'Rents', 'Real Estates', 'Cash', 'Savings at Bank', 'Tangibles', 'Cryptos'];

/*export const chartData = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            //data: [{x:'January', y:20}, {x:'Revenue', y:10}],
            data: [stocks,2,3],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            data: [{x:'Sales', y:20}, {x:'Revenue', y:10}],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};*/


export default App;
