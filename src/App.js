import React from "react";
import './App.css';
import {ChartAssets} from "./ChartAssets";
import {ChartDebts} from "./ChartDebts";
import {ChartAssetsDonut} from "./ChartAssetsDonut";
import {FormPositions} from "./FormPositions";
import {numberFormat} from "./helpers";
import {
    Button,
    FormGroup,
    Grid,
    Switch,
    FormControlLabel,
    Container,
    ThemeProvider,
    createTheme, Link
} from "@mui/material";

import {useState, useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from 'react-i18next';
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import {FormInvestorProfile} from "./FormInvestorProfile";
import {FormSave} from "./FormSave";
import {FormLoad} from "./FormLoad";
import {Analysis} from "./Analysis";
import Box from "@mui/material/Box";
import {GitHub} from "@mui/icons-material";

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

const fileName = 'MyFinAnalysis.json';

function App() {

    const [darkModeOn, setDarkModeOn] = useState(false);
    const [theme, setTheme] = useState(lightTheme);
    const {t} = useTranslation();
    const [assets, setAssets] = useState([100, 0, 0, 0, 0, 0, 0, 0]);
    const [assetsAbsolute, setAssetsAbsolute] = useState([2000, 0, 0, 0, 0, 0, 0, 0]); //Stocks, Bonds, Real Estate, Cash, Savings at bank, tangibles, Crypto, Others
    const [netWorth, setNetWorth] = useState(2000);
    const [totalAssets, setTotalAssets] = useState( 2000 );
    const [totalDebts, setTotalDebts] = useState();
    const [items, setItems] = useState([{desc: t("Example: ETF MSCI World"), type: t("Stocks"), val: 2000}]);
    const [debts, setDebts] = useState([0, 0, 0]); //Loan: Real Estate, Loan: Consumer, Loan: Others
    const [investor, setInvestor] = useState({riskProfile:"", salary: "", salaryNetMonth: "", birthYear:"", children:"", duration:"", married:false});
    const assetTypes = [t('Stocks'), t('Bonds'), t('Real Estate'), t('Cash'), t('Savings at Bank'), t('Tangibles'), t('Cryptos'), t('Others')];
    const debtTypes = [t('Loan: Real Estate'), t('Loan: Consumer'), t('Loan: Others')];
    const selectFields = assetTypes.concat(debtTypes);
    const [activeStep, setActiveStep] = useState(0);
    //const [input, setInput] = useState({items, investor});

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

    function aggregateItems(newItems) {
        let sum = 0;
        let total = 0;
        let totalDebts = 0;
 /*       newItems.forEach((element) => {
            if (element.type == t("Stocks" )) {
                total += parseInt(element.val);
            } else if (element.type == t('Loan: Real Estate')){
                totalDebts += parseInt(element.val);
            }
            }
        );*/
       /* total = newItems.reduce((a, b) => {
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
        }, 0);*/
        let index = 0;
        let newAssets = [];
        let newAssetsAbsolute = [];
        assetTypes.forEach((elem) => {
            sum = calcSum(newItems, elem);
            total += sum;
            //newAssets[index] = total !== 0 ? sum / total * 100 : 0;
            newAssetsAbsolute[index] = sum;
            index += 1;
        });
        index = 0;
        newAssetsAbsolute.forEach((elem)=>{
            newAssets[index] = total !== 0 ? elem / total * 100 : 0;
            index += 1;
            }
        )
        index = 0;
        let newDebts = debts;
        debtTypes.forEach((elem) => {
            sum = calcSum(newItems, elem);
            totalDebts += sum;
            newDebts[index] = sum;
            index += 1;
        });
        setAssets(newAssets);
        setAssetsAbsolute(newAssetsAbsolute);
        setDebts(newDebts);
        setTotalAssets(total);
        setTotalDebts(totalDebts);
        let newNetWorth = total - totalDebts;
        setNetWorth(newNetWorth);
    }

    function handleChange(i, e) {
        let newItems = [...items];
        if (e.target.name == "val"){
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
        }
        newItems[i][e.target.name] = e.target.value;
        aggregateItems(newItems);
        setItems(newItems);
    }

    function addFormFields() {
        let newItems = items;
        newItems = newItems.concat([{desc: "", type: "", val: 0}]);
        setItems(newItems);
    }

    function removeFormFields(i) {
        let newItems = [...items];
        newItems.splice(i, 1);
        aggregateItems(newItems);
        setItems(newItems);
    }

    function handleChangeInvestor(e){
        //let newInvestor = investor;
            //newInvestor.salary = e.target.value;
            if (e.target.name == "salary" || e.target.name == "salaryNetMonth" || e.target.name == "birthYear" || e.target.name == "children"){
                e.target.value = e.target.value < 0 ? 0 : e.target.value;
            }
            setInvestor(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
    }

    function handleFileChange(e){
        const fileReader = new FileReader();
        let loaded = {};
        fileReader.readAsText(e.target.files[0]);
        fileReader.onload = e => {
            loaded = JSON.parse(e.target.result);
            setInvestor(loaded.investor);
            setItems(loaded.items);
        };
        e.target.value= ""; //Hack for enabling re-upload of same file
        console.log(e.target.value);
    }

    function renderStep() {
        switch (activeStep) {
            case 0:
                return (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormLoad handleFileChange={handleFileChange} fileName={fileName}></FormLoad>
                            </Grid>
                            <Grid item xs>
                                <FormInvestorProfile investor={investor} handleChangeInvestor={handleChangeInvestor}></FormInvestorProfile>
                            </Grid>
                        </Grid>
                    </div>
                );
            case 1:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs lg={6}>
                            <FormPositions items={items} selectFields={selectFields} handleChange={handleChange}
                                            removeFormFields={removeFormFields}>

                            </FormPositions>
                            <Button type="button" onClick={addFormFields} startIcon={<AddIcon/>}>{t('Add')}</Button>
                        </Grid>
                        <Grid item xs lg={6}>
                            <h3>{t("Your net worth: ")}{numberFormat(netWorth)}&nbsp;€</h3>
                            <ChartAssets assetTypes={assetTypes} assets={assets} riskProfile={investor.riskProfile} duration = {investor.duration} height="300px" width="" maintainAspectRatio = {false}></ChartAssets>
                            <ChartAssetsDonut assetTypes={assetTypes}
                                              assetsAbsolute={assetsAbsolute} displayLegend={true} height="400px" width="" maintainAspectRatio = {false}></ChartAssetsDonut>
                            <ChartDebts debtTypes={debtTypes} debts={debts} height="200px" width="" maintainAspectRatio = {false}></ChartDebts>
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Analysis data={{investor: investor, items: items, assets: assets, assetsAbsolute: assetsAbsolute, netWorth: netWorth, totalAssets: totalAssets, totalDebts: totalDebts, debts: debts, assetTypes: assetTypes, debtTypes: debtTypes}}></Analysis>
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <FormSave data={{investor: investor, items: items}} fileName={fileName}></FormSave>
                        </Grid>
                    </Grid>
                );
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container>
            <Grid container spacing={2}>
                <Grid item xs>
                        <FormControlLabel control={
                            <Switch onChange={() => {
                                let darkModeOnNew = (!darkModeOn); //ToDo get browser setting?
                                setDarkModeOn(darkModeOnNew);
                                setTheme(darkModeOnNew ? darkTheme : lightTheme);
                            }
                            }/>} label={"Dark mode"}/>
                <Button type="Link" href="https://github.com/striezl/FinAdvisor" target="_blank" startIcon={<GitHub/>}> {t('Show on GitHub')}</Button>
                </Grid>
                <Grid item xs = {12}>
                    <h2 style={{textAlign: "center"}}>FinAnalyzer v0.1 (alpha)</h2> {/*//ToDo get version dynamically*/}
                </Grid>
                <Grid item xs={12}>
                    <HorizontalLinearStepper activeStep={activeStep}
                     setActiveStep={setActiveStep}></HorizontalLinearStepper>
                </Grid>
            </Grid>
            {renderStep(activeStep)}
            </Container>
        </ThemeProvider>
    );
}

export default App;
