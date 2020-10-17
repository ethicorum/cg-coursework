import React, { Component } from 'react';
import { EmptyProps, EmptyState } from '../types';

export class Dthree extends Component<EmptyProps, EmptyState>{
    constructor(props: EmptyProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>D3JS</h1>
                <a href={"https://d3js.org/"}>https://d3js.org/</a>
            </div>
        );
    }
}