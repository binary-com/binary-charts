export const callPutBarrier = (contract, lastSpot) =>
    contract.barrier || +contract.entry_spot || (lastSpot && lastSpot.quote);

export const getLastTick = ticks =>
    ticks.length && ticks[ticks.length - 1];

export const getLastTickQuote = ticks =>
    ticks.length && ticks[ticks.length - 1].quote;