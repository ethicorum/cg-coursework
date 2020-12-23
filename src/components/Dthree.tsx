import React, { Component } from 'react';
import ProfTree from './Chart/ProfTree';

export class Dthree extends Component {
    constructor(props: {}) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>Навигатор</h1>
                <div style={{ background: '#5f5ff5' }}>
                    <ProfTree />
                </div>
            </div>
        );
    }
}