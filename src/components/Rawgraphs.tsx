import React, { Component } from 'react';
import { EmptyProps, EmptyState } from '../types';

export class Rawgraphs extends Component<EmptyProps, EmptyState>{
    constructor(props: EmptyProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>RAWgraphs</h1>
                <a href={"https://rawgraphs.io/"}>https://rawgraphs.io/</a>
            </div>
        );
    }
}