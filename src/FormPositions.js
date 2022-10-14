import React from "react";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";

export function FormPositions(props){
    const {t} = useTranslation();
    return (
        <div>
            <h3>{t("Please list all your assets and debts.")}</h3>
            <p>{t("Enter all currency amounts in Euro (€).")}</p> {/*ToDo Mulitcurrency*/}
            {props.items.map((element, index) => (
                <Box sx={{borderBottom: "1px dotted grey"}} >
                    <FormControl sx={{width: '50ch', m: 1}}>
                        <InputLabel htmlFor={"inputDesc" + index}>{t('Description')}</InputLabel>
                        <OutlinedInput id={"inputDesc" + index} type="text" name="desc" label="Description"
                                       value={element.desc}
                                       onChange={(e) => props.handleChange(index, e)}
                                       size="small"
                        />
                    </FormControl>
                    <FormControl sx={{width: '25ch', m: 1}}>
                        <InputLabel htmlFor={"inputVal" + index}>{t('Value')}</InputLabel>
                        <OutlinedInput id={"inputVal" + index} type="number" min="0" name="val"
                                       value={element.val}
                                       onChange={(e) => props.handleChange(index, e)}
                                       startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                       label="Value"
                                       size="small"
                        />
                    </FormControl>
                    <FormControl sx={{width: '40ch', m: 1}}>
                        <InputLabel htmlFor={"selectTypeLabel" + index}>{t("Asset type")}</InputLabel>
                        <Select LabelId={"selectTypeLabel" + index} name="type" label="Asset type" size="small"
                                value={element.type}
                                onChange={(e) => props.handleChange(index, e)}>
                            {props.selectFields.map((option) => {
                                return <MenuItem value={option}>{option}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <Button type="button" onClick={() => props.removeFormFields(index)}
                            startIcon={<DeleteIcon/>}>{t("Delete")}</Button>
                </Box>
            ))
            }
        </div>
    )
}