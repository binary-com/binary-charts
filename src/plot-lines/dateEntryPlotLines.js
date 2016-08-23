import { contractCodeToText } from 'binary-utils';
import vertPlotLine from './vertPlotLine';
import timePlotLines from './timePlotLines';

const shoudShowPurchaseTime = contract =>
    +contract.purchase_time !== +contract.entry_tick_time &&
        +contract.purchase_time !== +contract.date_start;

// const shouldShowExitSpot = contract =>
//     contract.exit_tick_time !== contract.date_expiry;

// Tick trade does not have to show expiry
const shouldShowExpiry = contract => !contract.tick_count;

const shouldShowSettlement = contract =>
    +contract.date_settlement !== +contract.date_expiry;

const shouldShowSellTime = contract => !contract.exit_tick_time && contract.sell_time;

export default (contract, theme) => {
    if (!contract) {
        return [];
    }

    return timePlotLines
        .filter(param => contract[param.id])
        .filter(param => param.id !== 'purchase_time' || shoudShowPurchaseTime(contract))
        // .filter(param => param.id !== 'exit_tick_time' || shouldShowExitSpot(contract))
        .filter(param => param.id !== 'date_expiry' || shouldShowExpiry(contract))
        .filter(param => param.id !== 'date_settlement' || shouldShowSettlement(contract))
        .filter(param => param.id !== 'sell_time' || shouldShowSellTime(contract))
        .map(param => vertPlotLine({
            id: param.id,
            epoch: contract[param.id],

            // workaround: sell_time is exit_tick_time when contract is sold and there is not exit_tick_time
            // api is broken, JY says keep it ...
            text: contractCodeToText(param.id === 'sell_time' ? 'exit_tick_time' : param.id),
            position: param.position,
            theme,
        }));
};
