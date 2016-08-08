export const buttons = [{
    type: 'second',
    count: 30,
    text: 'TICK',
}, {
    type: 'minute',
    count: 1,
    text: '1M',
}, {
    type: 'minute',
    count: 15,
    text: '15M',
}, {
    type: 'hour',
    count: 1,
    text: '1H',
}, {
    type: 'hour',
    count: 6,
    text: '6H',
}, {
    type: 'day',
    count: 1,
    text: '1D',
}, {
    type: 'all',
    count: 1,
    text: 'MAX',
}];

export default (defaultRange = 0, showAllRangeSelector = true) => ({
    buttons,
    allButtonsEnabled: showAllRangeSelector,
    selected: defaultRange,
    inputEnabled: false,
    labelStyle: { display: 'none' },
    buttonPosition: {
        x: -5,
        y: 7,
    },
    buttonTheme: {
        style: {
            fontSize: '1rem',
        },
    },
});
