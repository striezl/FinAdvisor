import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select
} from "@mui/material";
import {useTranslation} from "react-i18next";
import React from "react";

export function FormInvestorProfile(props) {

    const {t} = useTranslation();
    const optionsRiskType = [[0, t('Focus on safety')], [1, t('Balanced')], [2, t('Focus on yield')]]
    const optionsDuration = [[0, t("Short term 0 - 3 years")], [1, t('Mid term 3 - 6 years')], [2, t('Long term 6+ years')]]

    return (
        <div>
            <h3>{t("To start, please give us some personal data to describe your profile as an investor.")}</h3>
            <p>{t("Enter all currency amounts in Euro (€).")}</p>
            <div>
                <FormControl sx={{width: '40ch', m: 1}}>
                    {/*       <InputLabel htmlFor="riskProfile">{t('Risk profile')}</InputLabel>
                <OutlinedInput id="riskProfile" value={props.investor.riskProfile} label = {t('Risk profile')}
                               onChange={(e) => props.handleChangeInvestor(e)}></OutlinedInput>*/}

                    <InputLabel id="selectRiskType">{t("Risk profile")}</InputLabel>
                    <Select labelId="selectRiskType" name="riskProfile" label={t("Risk profile")} size="small"
                            value={props.investor.riskProfile}
                            onChange={(e) => props.handleChangeInvestor(e)}>
                        {optionsRiskType.map((elem) => {
                            return <MenuItem value={elem[0]}>{elem[1]}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl sx={{width: '40ch', m: 1}}>
                    {/*       <InputLabel htmlFor="riskProfile">{t('Risk profile')}</InputLabel>
                <OutlinedInput id="riskProfile" value={props.investor.riskProfile} label = {t('Risk profile')}
                               onChange={(e) => props.handleChangeInvestor(e)}></OutlinedInput>*/}
                    <InputLabel id="selectDuration">{t("Main investment duration")}</InputLabel>
                    <Select labelId="selectDuration" name="duration" label={t("Main investment duration")} size="small"
                            value={props.investor.duration}
                            onChange={(e) => props.handleChangeInvestor(e)}>
                        {optionsDuration.map((elem) => {
                            return <MenuItem value={elem[0]}>{elem[1]}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl sx={{width: '25ch', m: 1}}>
                    <InputLabel htmlFor="salary">{t('Gross income annually ca.')}</InputLabel>
                    <OutlinedInput name="salary" id="salary" value={props.investor.salary} label={t('Gross income annually ca.')}
                                   onChange={(e) => props.handleChangeInvestor(e)} size="small" type="number" min="0"
                                   startAdornment={<InputAdornment position="start">€</InputAdornment>}></OutlinedInput>
                </FormControl>
                <FormControl sx={{width: '25ch', m: 1}}>
                    <InputLabel htmlFor="salaryNetMonth">{t('Net income monthly ca.')}</InputLabel>
                    <OutlinedInput name="salaryNetMonth" id="salaryNetMonth" value={props.investor.salaryNetMonth} label={t('Net income monthly ca.')}
                                   onChange={(e) => props.handleChangeInvestor(e)} size="small" type="number"
                                   startAdornment={<InputAdornment position="start">€</InputAdornment>}></OutlinedInput>
                </FormControl>
            </div>
            <div>
                <FormControl sx={{width: '20ch', m: 1}}>
                    <InputLabel htmlFor="birthYear">{t('Year of Birth')}</InputLabel>
                    <OutlinedInput id="birthYear" name="birthYear" value={props.investor.birthYear}
                                   label={t('Year of Birth')}
                                   onChange={(e) => props.handleChangeInvestor(e)} size="small" type="number" min="1900"></OutlinedInput>
                </FormControl>
            </div>
            <div>
                <FormControl sx={{width: '20ch', m: 1}}>
                    <InputLabel htmlFor="children">{t('Children')}</InputLabel>
                    <OutlinedInput id="children" name="children" value={props.investor.children}
                                   label={t('Number of children')}
                                   onChange={(e) => props.handleChangeInvestor(e)} size="small"
                                    type="number" min="0"></OutlinedInput>
                </FormControl>
            </div>
            <div>
                <FormControlLabel sx={{m:1}}
                    control={
                        <Checkbox
                            value={props.investor.married}
                            onChange={props.handleChangeInvestor}
                            name="married"
                            color="primary"
                        />
                    }
                    label={t("Married")}
                    labelPlacement="start"
                />
            </div>
        </div>
    );
}