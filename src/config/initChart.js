import { merge } from 'highcharts/highstock.src';
import { digitsToPips } from 'binary-utils';
import { lightTheme, darkTheme } from '../themes';
import createSeries from './createSeries';
import { colorBg, colorText } from '../styles';

const crosshairOptions = (theme, formatter) => ({
    snap: false,
    color: colorBg(theme, 1),
    dashStyle: 'LongDashDot',
    zIndex: 50,
    label: {
        enabled: true,
        padding: 5,
        shape: 'rect',
        formatter,
        style: {
            color: colorText(theme, 1),
            fontSize: '12px',
        },
    },
});

export default ({
    pipSize = 0,
    type = 'area',
    noData = false,
    theme = 'light',
    shiftMode = 'fixed',
    assetName,
    hideEndButton = () => undefined,
}) =>
    merge(theme === 'light' ? lightTheme : darkTheme, {
        binary: { pipSize, theme, lastYExtremes: {}, shiftMode, type },
        animation: false,
        scrollbar: { enabled: false },
        credits: { enabled: false },
        legend: { enabled: false },
        rangeSelector: { enabled: false },
        title: { text: null },
        navigator: { enabled: false },
        noData: {
            style: noData ? {} : { display: 'none' },
        },
        chart: {
            spacingBottom: 10,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            events: {
                load: function onLoad() { // eslint-disable-line object-shorthand
                    this.xAxis[0].chart = this;
                },
            },
        },
        plotOptions: {
            series: {
                connectNulls: false,
                marker: {
                    enabled: false,
                },
                gapSize: 4 * 60 * 60 * 1000,
            },
        },
        xAxis: {
            type: 'datetime',
            tickWidth: 0,
            startOnTick: false,
            endOnTick: false,
            crosshair: crosshairOptions(theme),
            events: {
                afterSetExtremes: function after() {
                    const { max, dataMax } = this.getExtremes();
                    if (max >= dataMax) {
                        hideEndButton(true);
                    } else {
                        hideEndButton(false);
                    }
                },
            },
            ordinal: true,
        },
        yAxis: {
            opposite: true,
            labels: {
                align: 'left',
                formatter: function formatter() {
                    return this.value.toFixed(this.chart.userOptions.binary.pipSize);
                },
            },
            crosshair: crosshairOptions(theme, function formatter(value) {
                return value.toFixed(this.chart.userOptions.binary.pipSize);
            }),
            tickWidth: 0,
            title: { text: null },
            floor: 0,
            minTickInterval: digitsToPips(pipSize),
        },
        series: [
            createSeries(assetName, type, [], pipSize),
        ],
        exporting: {
            enabled: false,
            chartOptions: {
                chart: {
                    backgroundColor: colorText(theme, 1),
                    margin: 60,
                },
            },
        },
    },
);
