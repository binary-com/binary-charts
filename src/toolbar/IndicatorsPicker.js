import React, { PureComponent } from 'react';
import Picker from './Picker';

type Props = {
    expanded: boolean,
    onExpand: () => void,
};

export default class IndicatorsPicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    onChange = () => {};

    render() {
        const { expanded, onExpand } = this.props;

        return (
            <Picker
                expanded={expanded}
                text="Indicators"
                items={[
                    { text: 'Simple Moving Average (SMA)' },
                    { text: 'Exponenital Moving Average (EMA)' },
                    { text: 'Bollinger Band (BB)' },
                    { text: 'Relative Strength Index (RSI)' },
                    { text: 'Moving Average Convergence Divergence (MACD)' },
                ]}
                onExpand={onExpand}
                onChange={this.onChange}
            />
        );
    }
}
