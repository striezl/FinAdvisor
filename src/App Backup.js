import React from "react";
import './App.css';
import {ChartAssets} from "./ChartAssets";
import {ChartDebts} from "./ChartDebts";
import {ChartAssetsDonut} from "./ChartAssetsDonut";
import {FormPositions, FormPositions2} from "./FormPositions";
import {numberFormat} from "./helpers";
import {
    Input,
    FormLabel,
    FormControl,
    Button,
    FormGroup,
    Grid,
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel, OutlinedInput, InputAdornment,
} from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import {Bar, Doughnut} from 'react-chartjs-2';
import {useState, useEffect} from "react";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {lightGreen, red} from "@mui/material/colors";
import i18n from "i18next";
import {initReactI18next, useTranslation} from 'react-i18next';
import * as PropTypes from "prop-types";
import FormPositons from "./FormPositions";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

function App() {

    const [assets, setAssets] = useState([100, 0, 0, 0, 0, 0, 0, 0]);
    const [assetsAbsolute, setAssetsAbsolute] = useState([2000, 0, 0, 0, 0, 0, 0, 0]);
    const [debts, setDebts] = useState([0, 0, 0])
    const [darkModeOn, setDarkModeOn] = useState(false);
    const [theme, setTheme] = useState(lightTheme);
    const [netWorth, setNetWorth] = useState(2000);
    const {t, i18n} = useTranslation();
    const assetTypes = [t('Stocks'), t('Bonds'), t('Real Estate'), t('Cash'), t('Savings at Bank'), t('Tangibles'), t('Cryptos'), t('Others')];
    const [items, setItems] = useState([{desc: t("Example: ETF MSCI World"), type: t("Stocks"), val: 2000}]);
    const debtTypes = [t('Loan: Real Estate'), t('Loan: Consumer'), t('Loan: Others')];

    function calcSum(arr, type) {
        let sum = 0;
        arr.forEach((item) => {
            if (item.type === type) {
                if (!isNaN(item.val)) {
                    sum += parseInt(item.val)
                }
                ;
            }
        });
        return sum;
    }

    function updateCharts(newItems) {
        let sum = 0;
        let total = 0;
        total = newItems.reduce((a, b) => {
            if (parseInt(b.val) > 0) {
                return a += parseInt(b.val)
            } else {
                return a;
            }
            ;
        }, 0);
        let totalDebts = newItems.reduce((a, b) => {
            if (parseInt(b.val) < 0) {
                return a += parseInt(b.val)
            } else {
                return a;
            }
            ;
        }, 0);
        let index = 0;
        let newAssets = assets;
        let newAssetsAbsolute = assetsAbsolute;
        assetTypes.forEach((elem) => {
            sum = calcSum(newItems, elem);
            newAssets[index] = total !== 0 ? sum / total * 100 : 0;
            newAssetsAbsolute[index] = sum;
            index += 1;
        });
        index = 0;
        let newDebts = debts;
        debtTypes.forEach((elem) => {
            sum = calcSum(newItems, elem);
            newDebts[index] = sum;
            index += 1;
        });
        setAssets(newAssets);
        setAssetsAbsolute(newAssetsAbsolute);
        setDebts(newDebts);
        let newNetWorth = total + totalDebts;
        setNetWorth(newNetWorth);
    }

    function handleChange(i, e) {
        let newItems = [...items];
        newItems[i][e.target.name] = e.target.value;
        updateCharts(newItems);
        setItems(newItems);
    }

    function handleSubmit(onSubmit) {
        return undefined;
    }

    function addFormFields() {
        let newItems = items;
        newItems = newItems.concat([{desc: "", type: "", val: 0}]);
        setItems(newItems);
    }

    function removeFormFields(i) {
        let newItems = [...items];
        newItems.splice(i, 1);
        updateCharts(newItems);
        setItems(newItems);
    }

    const selectFields = assetTypes.concat(debtTypes);


    const [test, setTest] = useState( 123 );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={
                            <Switch onChange={() => {
                                let darkModeOnNew = (!darkModeOn);
                                setDarkModeOn(darkModeOnNew);
                                setTheme(darkModeOnNew ? darkTheme : lightTheme);
                            }
                            }/>} label={"Dark mode"}/>
                    </FormGroup>
                </Grid>
                <Grid item xs>
                    <div><h3>{t("Please list all your assets and debts.")}</h3>
                        <p>{t("Enter all values in Euro (€).")}</p></div>
                    {items.map((element, index) => (
                        <div style={(index % 2 !== 0) ? {
                            backgroundColor: "lightgoldenrodyellow",
                            border: "1 px solid blue"
                        } : {}}>
                            <FormControl sx={{width: '60ch', m: 1}}>
                                <InputLabel htmlFor={"inputDesc" + index}>{t('Description')}</InputLabel>
                                <OutlinedInput id={"inputDesc" + index} type="text" name="desc" label="Description"
                                               value={element.desc}
                                               onChange={(e) => handleChange(index, e)}
                                               size="small"
                                />
                            </FormControl>
                            <FormControl sx={{width: '25ch', m: 1}}>
                                <InputLabel htmlFor={"inputVal" + index}>{t('Amount')}</InputLabel>
                                <OutlinedInput id={"inputVal" + index} type="number" name="val"
                                               value={element.val}
                                               onChange={(e) => handleChange(index, e)}
                                               startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                               label="Amount"
                                               size="small"
                                />
                            </FormControl>
                            <FormControl sx={{width: '40ch', m: 1, backgroundColor: red}}>
                                <InputLabel htmlFor={"selectTypeLabel" + index}>{t("Asset type")}</InputLabel>
                                <Select LabelId={"selectTypeLabel" + index} name="type" label="Asset type" size="small"
                                        value={element.type}
                                        onChange={(e) => handleChange(index, e)}>
                                    {selectFields.map((option) => {
                                        return <MenuItem value={option}>{option}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            <Button type="button" onClick={() => removeFormFields(index)}
                                    startIcon={<DeleteIcon/>}>{t("Delete")}</Button>
                        </div>
                    ))
                    }

                    <FormPositions2 items={items} selectFields={selectFields} handleChange={handleChange}
                        removeFormFields={removeFormFields}></FormPositions2>

                    <Button type="button" onClick={addFormFields} startIcon={<AddIcon/>}>{t('Add')}</Button>
                    <FormPositions test={test} setTest={setTest}></FormPositions>
                </Grid>
                <Grid item xs>
                    <h3>{t("Your net worth: ")}{numberFormat(netWorth)}&nbsp;€</h3>
                    <ChartAssets assetTypes={assetTypes} assets={assets}></ChartAssets>
                    <ChartDebts debtTypes={debtTypes} debts={debts}></ChartDebts>
                    <ChartAssetsDonut assetTypes={assetTypes} assetsAbsolute={assetsAbsolute}></ChartAssetsDonut>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
