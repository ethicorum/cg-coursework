import React, { Component } from 'react';
import ProfTree from './Chart/ProfTree';

export class Dthree extends Component {
    constructor(props: {}) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>D3JS</h1>
                <a href={"https://d3js.org/"}>https://d3js.org/</a>
                <div style={{ background: '#5f5ff5' }}>
                    <ProfTree />
                </div>
            </div>
        );
    }
}