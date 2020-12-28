import React, { Component } from 'react';
import ProfTree from './Chart/ProfTree';

export class Dthree extends Component {
    constructor(props: {}) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <h1 style={{ marginLeft: '15px' }}>Навигатор</h1>
                <div>
                    <ProfTree />
                </div>
            </div>
        );
    }
}