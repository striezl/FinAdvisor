import React, {useRef} from "react";
import {
    Button,
    Checkbox,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {numberFormat} from "./helpers";
import {
    cashIncomeRatio,
    getTargetCashIncomeRatio,
    getTargetArray,
    etfStocksAcc,
    etfStocksDis,
    etfStocksEmergingDis,
    etfBondsAcc,
    etfBondsDis,
    getTargetSingle
} from "./analysisFunctions";
import ReactToPrint from "react-to-print";
import Box from "@mui/material/Box";
import {Print} from "@mui/icons-material";
import {ChartAssets} from "./ChartAssets";
import {ChartDebts} from "./ChartDebts";
import {ChartAssetsDonut} from "./ChartAssetsDonut";

export function Analysis(props) {
    const {t} = useTranslation();

    function trendCashIncome(cash, salary) {
        const targetCashIncomeRatio = getTargetCashIncomeRatio();
        let ratio = cashIncomeRatio(cash, salary);
        if (ratio > targetCashIncomeRatio) {
            return t('lower');
        } else if (ratio < targetCashIncomeRatio) {
            return t('higher');
        }
    }

    function trend(target, actual) {
        if (target > actual) {
            return t('higher');
        } else if (target < actual) {
            return t('lower');
        }
    }

    let componentRef = useRef();

    return (
        <div>
            <ReactToPrint
                trigger={() => <Button startIcon={<Print/>}>{t('Print')}</Button>}
                content={() => componentRef}
                documentTitle={t('FinAnalysis')}
            /> {/*ToDo page frame*/}
            <div ref={(el) => (componentRef = el)}>
                <Box sx={{m: 2}}>
                    <h3>{t('Seven golden steps to balanced wealth distribution.')}</h3>{t('Purely informative - investment is at your own risk.')}
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Step
                                </TableCell>
                                <TableCell>
                                    Detail
                                </TableCell>
                                <TableCell>
                                    Done
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {t('#1: Get an overview')}
                                </TableCell>
                                <TableCell>
                                    {t('You`ve already recorded your assets and liabilities, great! Your net worth is {{netWorth}} €. You can find the distribution among the asset classes in the charts. Go back one step if you want to change something.', {netWorth: numberFormat(props.data.netWorth)})}
                                </TableCell>
                                <TableCell>
                                    <Checkbox size="large" disabled checked/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Grid container>
                                        <Grid item xs sm={4}>
                                            <ChartAssets assetTypes={props.data.assetTypes} assets={props.data.assets}
                                                         riskProfile={props.data.investor.riskProfile}
                                                         duration={props.data.investor.duration} height="300px"
                                                         width="300px" maintainAspectRatio={false}></ChartAssets>
                                        </Grid>
                                        <Grid item xs sm={4}>
                                            <ChartAssetsDonut assetTypes={props.data.assetTypes}
                                                              assetsAbsolute={props.data.assetsAbsolute}
                                                              displayLegend={false} height="300px" width="300px"
                                                              maintainAspectRatio={false}></ChartAssetsDonut>
                                        </Grid>
                                        <Grid item xs sm={4}>
                                            <ChartDebts debtTypes={props.data.debtTypes} debts={props.data.debts}
                                                        height="300px" width="200px"
                                                        maintainAspectRatio={false}></ChartDebts>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    {t('#2: Repay expensive loans, build up liquidity reserve')}
                                </TableCell>
                                <TableCell>
                                    {t('Your cash (cash, current account, call money) amounts to {{cash}} €, which is {{cashIncomeRatio}} times your monthly income. Generally a {{trendCashIncome}} factor of {{targetCashIncomeRatio}} is recommended.', {
                                        cash: numberFormat(props.data.assetsAbsolute[3]),
                                        cashIncomeRatio: cashIncomeRatio(props.data.assetsAbsolute[3], props.data.investor.salaryNetMonth),
                                        trendCashIncome: trendCashIncome(props.data.assetsAbsolute[3]),
                                        targetCashIncomeRatio: getTargetCashIncomeRatio()
                                    })}
                                    <br/>
                                    {t('Your liabilities add up to {{totalDebts}} €. Amongst them are {{debtsConsumer}} € consumer and {{debtsOthers}} € other loans. If relevant and possible you may consider paying back expensive loans (interest rate > ~3%).',
                                        {
                                            totalDebts: numberFormat(props.data.totalDebts),
                                            debtsConsumer: numberFormat(props.data.debts[1]),
                                            debtsOthers: numberFormat(props.data.debts[2])
                                        })}
                                </TableCell>
                                <TableCell>
                                    <Checkbox size="large" disabled/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    {t('#3: Stocks and bonds (ETFs)')}
                                </TableCell>
                                <TableCell>
                                    {t('You have invested {{stocks}} € in stocks, which is {{stockNetWorthRatio}}% of your total net worth. ', {
                                        stocks: numberFormat(props.data.assetsAbsolute[0]),
                                        stockNetWorthRatio: numberFormat(props.data.assets[0])
                                    })}
                                    {t('According to your risk profile and target investment duration a {{trend}} quota of about {{riskProfileStocks}}% is recommended. ', {
                                        riskProfileStocks: getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "stocks"),
                                        trend: trend(getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "stocks"), props.data.assets[0])
                                    })} <br/>
                                    {t('For a broad investment in the stock market ETFs such as {{eSA}} (accumulating) are recommended. ', {eSA: etfStocksAcc})}
                                    <br/>
                                    {t('If your excemption is not yet exceeded, consider a distributing alternative, such as {{eSD}}. ', {eSD: etfStocksDis})}
                                    {t('The latter covers only industrialized countries, hence you may want to add a smaller portion of emerging market stocks, e.g. with {{eSED}}. ', {eSED: etfStocksEmergingDis})}
                                    <br/>
                                    {t('Invest only a relatively small amount in individual shares, where you can live with a total loss if necessary. ')}<br/><br/>
                                    {t('Another {{b}} € or {{bp}}% of your assets is invested in bonds. ', {
                                        b: numberFormat(props.data.assetsAbsolute[1]),
                                        bp: numberFormat(props.data.assets[1])
                                    })}
                                    {t('Pursuant to your risk profile and target investment duration a {{trend}} quota of about {{rPS}}% is recommended. ', {trend: trend(getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "bonds"), props.data.assets[0]),rPS: getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "bonds")})}
                                    <br/>
                                    {t('Investments in the bond market should also be as diversified as possible. An ETF with global bonds of good to medium credit quality (investment grade) is the {{eSA}} (accumulating). ', {eSA: etfStocksAcc})}
                                    <br/>
                                    {t('If your excemption is not yet exceeded, consider a distributing alternative, such as {{eSD}}. ', {eSD: etfStocksDis})}
                                </TableCell>
                                <TableCell>
                                    <Checkbox size="large" disabled/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    {t('#4: Savings at bank')}
                                </TableCell>
                                <TableCell>
                                    {t('You have invested {{am}} € or {{per}}% in classic bank products such as time deposits, bank savings plans and house savings or classic pension and life insurances. ', {
                                        am: numberFormat(props.data.assetsAbsolute[4]),
                                        per: numberFormat(props.data.assets[4])
                                    })} {/*ToDo treat life insurances etc. seperately?*/}
                                    {t('According to your risk profile and target investment duration a {{trend}} quota of about {{rp}}% is recommended. ', {
                                        rp: getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "bankSavings"),
                                        trend: trend(getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "bankSavings"), props.data.assets[4])
                                    })}
                                    <br/>
                                    {t('Although bank products are generally not subject to price risk, they also usually provide only a minimal return. An exception can be lucrative old contracts, normally you should keep these, even if your bank or building society tries to get you out of the contract.')}
                                </TableCell>
                                <TableCell>
                                    <Checkbox size="large" disabled/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    {t('#5: Real estate')}
                                </TableCell>
                                <TableCell>
                                    {t('You have invested {{am}} € or {{per}}% in real estate, including residential property for own use or capital investment, real estate funds and real estate shares. ', {
                                        am: numberFormat(props.data.assetsAbsolute[2]),
                                        per: numberFormat(props.data.assets[2])
                                    })}
                                    {t('According to your risk profile and target investment duration a {{trend}} quota of about {{rp}}% is recommended. ', {
                                        rp: getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "realEstate"),
                                        trend: trend(getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "realEstate"), props.data.assets[2])
                                    })}
                                    <br/>
                                    {t('When investing in an apartment or a house, the share of total assets typically becomes large quickly. This is no cause for concern, only a further investment in real estate should be well considered if the share is significantly above the target value.')}
                                    <br/>
                                    {t('If only indirect real estate ownership is created with funds or shares, the share should rather be chosen lower, about 5% of the total assets are enough.')}
                                </TableCell>
                                <TableCell>
                                    <Checkbox size="large" disabled/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    {t('#6: Tangibles')}
                                </TableCell>
                                <TableCell>
                                    {t('You have invested {{am}} € or {{per}}% in tangibles, such as gold, arts and vintage cars. ', {
                                        am: numberFormat(props.data.assetsAbsolute[5]),
                                        per: numberFormat(props.data.assets[5])
                                    })}
                                    {t('According to your risk profile and target investment duration a {{trend}} quota of about {{rp}}% is recommended. ', {
                                        rp: getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "tangibles"),
                                        trend: trend(getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "tangibles"), props.data.assets[5])
                                    })}
                                    <br/>
                                    {t('If you are considering investing in tangible assets, keep in mind that they often do not provide an immediate return, are difficult to store and require expert knowledge.')}
                                    <br/>
                                </TableCell>
                                <TableCell>
                                    <Checkbox size="large" disabled/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    {t('#7: Crypto')}
                                </TableCell>
                                <TableCell>
                                    {t('You have invested {{am}} € or {{per}}% in crypto currencies, such as bitcoin or Ethereum. ', {
                                        am: numberFormat(props.data.assetsAbsolute[7]),
                                        per: numberFormat(props.data.assets[7])
                                    })}
                                    {t('According to your risk profile and target investment duration a {{trend}} quota of about {{rp}}% is recommended. ', {
                                        rp: getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "crypto"),
                                        trend: trend(getTargetSingle(props.data.investor.riskProfile, props.data.investor.duration, "crypto"), props.data.assets[7])
                                    })}
                                    <br/>
                                    {t('Take note that this is still a young and largely unregulated form of investment. There may be opportunities, but there is great danger for the invested capital, a total loss is in the range of probable.')}
                                    <br/>
                                </TableCell>
                                <TableCell>
                                    <Checkbox size="large" disabled/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    {t('Bonus')}
                                </TableCell>
                                <TableCell>
                                    {t('Make sure that you submit an exemption order for capital gains to the bank. As an unmarried person, you are entitled to 801 € of tax-free income from capital assets per year. As a married couple, you are entitled to 1602 € of tax-free income per year. A separate exemption order can also be submitted for children; in addition, a non-assessment certificate can be submitted for them.')} {/*ToDo dynamic (whole passage)...*/} <br/><br/>
                                    {t('Investing regularly for children is also worthwhile because of the cost average effect. Since it is usually a long-term savings goal, a higher proportion of shares (ETFs) can be utilized. Use a savings plan, for securities see recommendations for equity and bond ETFs in #3.')} <br/><br/>
                                    {t('A securities savings plan is also a simple, solid and promising way to save or provide for old age in the long term. For example, invest half in stocks and half in bonds ETFs, again as mentioned in #3. Check your monthly expenses, if you optimize them a bit, there is usually already potential for a savings plan.')} <br/><br/>
                                    {t('The Riester pension can be interesting for you, if you fulfill on of the following criteria: Children (if entitled to child benefits) or high income. If you are married and there is no direct entitlement, you or your partner may be eligible for a contract as indirect beneficiary. The Riester contract that promises the highest share quota is "UniProfiRente Select with UniGlobal II". Which is good, because the value of the shares cannot fall below the sum of the payments and allowances received.')} <br/><br/>
                                    {t('Check whether you are entitled to capital formation benefits from your employer and, in addition, to employee savings allowance and housing subsidy from the state.')}
                                </TableCell>
                                <TableCell>
                                    <Checkbox size="large" disabled/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}