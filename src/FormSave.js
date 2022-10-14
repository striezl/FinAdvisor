import React from "react";
import {Button, Fab} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Save} from "@mui/icons-material";

const downloadFile = ({data, fileName, fileType}) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], {type: fileType})
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

const exportToJson = (e, data, fileName) => {
    e.preventDefault()
    downloadFile({
        data: JSON.stringify(data),
        fileName: fileName,
        fileType: 'text/json',
    })
}

export function FormSave(props) {
    const {t} = useTranslation();
    return (
        <div>
            <div><h3>{t('Here you have the possibility to save your entries to reuse them later.')}</h3>{t('Currently, the export as a file to your computer is possible, more saving options will follow in the future. The file "{{fn}}" contains the data you entered in plain text, remember to protect it accordingly.', {fn:props.fileName})}</div>
           {/* <Button type='button' onClick={(e) => exportToJson(e, props.data, props.fileName)}>
                {t("Save file locally")}
            </Button>*/}
            <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="save"
                variant="extended"
                onClick={(e) => exportToJson(e, props.data, props.fileName)}
            ><Save/> {t("Save file locally")}</Fab>
        </div>
    )
}