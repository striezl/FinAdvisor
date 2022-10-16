const targetMatrix2 = [
    [{stocks: 15, bonds: 35, realEstate: 25, cash: 10, bankSavings: 10, tangibles: 5, crypto: 0, others: 0}, {stocks: 20, bonds: 35, realEstate: 25, cash: 10, bankSavings: 5, tangibles: 5, crypto: 0, others: 0}, {stocks: 20, bonds: 40, realEstate: 25, cash: 10, bankSavings: 0, tangibles: 5, crypto: 0, others: 0}],
    [{stocks: 20, bonds: 30, realEstate: 25, cash: 10, bankSavings: 10, tangibles: 5, crypto: 0, others: 0},{stocks: 25, bonds: 30, realEstate: 25, cash: 10, bankSavings: 5, tangibles: 5, crypto: 0, others: 0},{stocks: 30, bonds: 25, realEstate: 25, cash: 10, bankSavings: 0, tangibles: 5, crypto: 5, others: 0}],
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


