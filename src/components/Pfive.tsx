import React, { Component } from 'react';
import { EmptyProps, EmptyState } from '../types';

export class Pfive extends Component<EmptyProps, EmptyState>{
    constructor(props: EmptyProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>ProcessingJS</h1>
                <a href={"https://processing.org/"}>https://processing.org/</a>
            </div>
        );
    }
}