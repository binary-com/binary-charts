import plotBandsForContractAndTrade from './plotBandsForContractAndTrade';
import plotLinesForContract from './plotLinesForContract';
import { getLastTick } from '../_utils';

const replacePlotBands = (axis, newPlotBands) => {
    axis.removePlotBand('barrier-band');
    newPlotBands.forEach(band => axis.addPlotBand(band));
};

const replacePlotLines = (axis, newPlotLines) => {
    newPlotLines.forEach(line => {
        axis.removePlotLine(line.id);
        axis.addPlotLine(line);
    });
};

export default ({ chart, contract, trade, ticks }) => {
    const lastTick = getLastTick(ticks);
    const newPlotBands = plotBandsForContractAndTrade(contract || trade, lastTick);
    replacePlotBands(chart.yAxis[0], newPlotBands);
    if (contract) {
        const newPlotLines = plotLinesForContract(contract);
        replacePlotLines(chart.xAxis[0], newPlotLines);
    }
    // updateExtremes(chart.xAxis[0], ticks, contract || trade)
};