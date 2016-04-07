import { configure } from '@kadira/storybook';

configure(() => {
    require('./simple');
    require('./contract-types');
    require('./past-contracts');
    require('./open-contracts');
    require('./indicators');
}, module);
