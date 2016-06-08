import updateExtremes, { updateExtremesYAxis } from '../config/updateExtremes';
import { buttons } from './rangeSelector';

export default ({ rangeChange = () => ({}) }) => ({
    type: 'datetime',
    ordinal: true,
    tickWidth: 0,
    startOnTick: false,
    endOnTick: false,
    events: {
        setExtremes: function setExtremesHandler(e) {          // eslint-disable-line object-shorthand
            if (e.rangeSelectorButton) {
                const chart = this.chart;

                const { count, type, text } = e.rangeSelectorButton;
                const asyncResult = rangeChange(count, type);

                // a hack so that we can set x-extremes correctly after data is loaded
                // works best if rangechange is only fire when needed.
                if (asyncResult.then) {
                    chart.showLoading();
                    const buttonID = buttons.findIndex(button => button.text === text);
                    asyncResult.then(() => {
                        chart.hideLoading();
                        chart.rangeSelector.clickButton(buttonID, e.rangeSelectorButton, true);
                    });
                }
            }
        },
        afterSetExtremes: function afterSetExtremesHandler(e) { // eslint-disable-line object-shorthand
            const chart = this.chart;

            if (!chart.binary) {
                return;
            }

            const triggerByRangeSelector = e.trigger === 'rangeSelectorButton';

            const { ticks, contract } = chart.binary;
            if (ticks && contract) {
                updateExtremesYAxis(chart, ticks, contract);
            }

            if (triggerByRangeSelector) {
                updateExtremes(chart, ticks, contract);
                chart.redraw();
            }
        },
    },
});
