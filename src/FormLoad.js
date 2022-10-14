import React from "react";
import {Fab, Icon, Input} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

export function FormLoad(props) {
    const {t} = useTranslation();
    return (
        <div>
            <div><h3>{t('You have already saved an analysis?')}</h3>{t('That`s great, please upload the .json file here. The filename might be "{{fn}}".',{fn:props.fileName})}</div>
        <label htmlFor="loadFromFile">
            <Input type="file" name="loadFromFile" id="loadFromFile" onInput={props.handleFileChange} style={{ display: "none" }}/>
            <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
            >
                <Add /> {t('Upload File')}
            </Fab>
        </label>
        </div>
    );

}