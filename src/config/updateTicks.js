import doTicksDifferJustOneEntry from 'binary-utils/lib/doTicksDifferJustOneEntry';
import doCandlesDifferJustOneEntry from 'binary-utils/lib/doCandlesDifferJustOneEntry';
import tickToData from 'binary-utils/lib/tickToData';
import ohlcToData from 'binary-utils/lib/ohlcToData';
import getLastTick from 'binary-utils/lib/getLastTick';

export default (chart, prevProps, nextProps) => {
    const chartType = chart.series[0].type;
    const { dataMax, min, max } = chart.xAxis[0].getExtremes();
    let newDataMax = dataMax;
    switch (chartType) {
        case 'area': {
            const oneTickDiff = doTicksDifferJustOneEntry(prevProps.ticks, nextProps.ticks);
            if (oneTickDiff) {
                const lastTick = getLastTick(nextProps.ticks);
                const dataPoint = tickToData(lastTick);
                chart.series[0].addPoint(dataPoint, false);
                if (dataPoint) {
                    newDataMax = dataPoint[0];
                }
            } else {
                const dataList = nextProps.ticks.map(tickToData);
                chart.series[0].setData(dataList, false);
                if (dataList[dataList.length - 1]) {
                    newDataMax = dataList[dataList.length - 1][0];
                }
            }
            
            const isCloseToMostRecent = (dataMax - max) <= 2000;
            if (isCloseToMostRecent) {
                chart.xAxis[0].setExtremes(min, newDataMax);
            }
            break;
        }
        case 'candlestick': {
            const oneTickDiff = doCandlesDifferJustOneEntry(prevProps.ticks, nextProps.ticks);
            if (oneTickDiff) {
                const lastTick = getLastTick(nextProps.ticks);
                const dataPoint = ohlcToData(lastTick);
                const xData = chart.series[0].xData;
                const last2Epoch = xData[xData.length - 2];
                const last3Epoch = xData[xData.length - 3];
                const timeInterval = last2Epoch - last3Epoch;

                const newDataIsWithinInterval = (dataPoint[0] - last2Epoch) <= timeInterval;
                if (newDataIsWithinInterval) {
                    chart.series[0].options.data[xData.length - 1] = dataPoint;
                } else {
                    chart.series[0].addPoint(dataPoint, false);
                }
            } else {
                const dataList = nextProps.ticks.map(ohlcToData);
                chart.series[0].setData(dataList, false);
            }
            break;
        }
        default:
            throw new Error('Unexpected highchart series type: ', chartType);
    }
};
