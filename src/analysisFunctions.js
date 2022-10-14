import {useTranslation} from "react-i18next";

const targetMatrix = [
    [[15, 35, 25, 10, 10, 5, 0, 0], [20, 35, 25, 10, 5, 5, 0, 0], [20, 40, 25, 10, 0, 5, 0, 0]], //RiskProfile: 0 (Focus on Safety), duration: 0 (Short-Term Investor) = targetMatrix[0][0] = 15/35/25/10/10/5/0/0 (target distribution in % for stocks/bonds/real estate/cash/savings at bank/tangibles/crypto/others)
    [[20, 30, 25, 10, 10, 5, 0, 0],[20, 35, 25, 10, 5, 5, 0, 0],[25, 25, 25, 10, 0, 10, 5, 0]],
    [[25, 30, 25, 10, 5, 5, 0, 0],[30, 20, 25, 10, 5, 5, 5, 0],[40, 10, 25, 10, 0, 5, 10, 0]],
];

const targetMatrix2 = [
    [{stocks: 15, bonds: 35, realEstate: 25, cash: 10, bankSavings: 10, tangibles: 5, crypto: 0, others: 0}, {stocks: 20, bonds: 35, realEstate: 25, cash: 10, bankSavings: 5, tangibles: 5, crypto: 0, others: 0}, {stocks: 20, bonds: 40, realEstate: 25, cash: 10, bankSavings: 0, tangibles: 5, crypto: 0, others: 0}],
    [{stocks: 20, bonds: 30, realEstate: 25, cash: 10, bankSavings: 10, tangibles: 5, crypto: 0, others: 0},{stocks: 20, bonds: 35, realEstate: 25, cash: 10, bankSavings: 5, tangibles: 5, crypto: 0, others: 0},{stocks: 25, bonds: 25, realEstate: 25, cash: 10, bankSavings: 0, tangibles: 10, crypto: 5, others: 0}],
    [{stocks: 25, bonds: 30, realEstate: 25, cash: 10, bankSavings: 5, tangibles: 5, crypto: 0, others: 0},{stocks: 30, bonds: 20, realEstate: 25, cash: 10, bankSavings: 5, tangibles: 5, crypto: 5, others: 0},{stocks: 40, bonds: 10, realEstate: 25, cash: 10, bankSavings: 0, tangibles: 5, crypto: 10, others: 0}],
];

const targetCashIncomeRatio = 3;

export const etfStocksAcc = "iShares MSCI ACWI UCITS ETF (Acc) (ISIN: IE00B6R52259)";
export const etfStocksDis = "Xtrackers MSCI World UCITS ETF (Dist) (ISIN: IE00BK1PV551)";
export const etfStocksEmergingDis = "iShares MSCI EM UCITS ETF USD (Dist) (ISIN: IE00B0M63177)";
export const etfBondsAcc = "iShares Core Global Aggregate Bond UCITS ETF EUR-Hedged IE00BDBRDM35";
export const etfBondsDis = "SPDR Bloomberg Barclays Global Aggregate Bond UCITS ETF (ISIN: IE00B43QJJ40)";

export function getTargetArray(riskProfile, duration){
    try{
    return Object.values(targetMatrix2[riskProfile][duration]);}
    catch (error){}
}

export function getTargetSingle(riskProfile, duration, asset){
    try{
        return targetMatrix2[riskProfile][duration][asset];
    }catch(error){
        return "?";
    }
}

export function cashIncomeRatio(cash, salary) {
    let ratio = 0;
    if (salary > 0) {
        ratio = cash / (salary);
        return ratio.toFixed(2);
    }else{
        return "?";
    }
}

export function getTargetCashIncomeRatio(){
    return targetCashIncomeRatio;
}


