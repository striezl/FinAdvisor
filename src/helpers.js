export const numberFormat = (value) => {
    if (!isNaN(value)) {
        return new Intl.NumberFormat('de-DE', {}).format(value.toFixed(2)); //ToDo locale dynamic
    } else {
        return 0;
    }
}