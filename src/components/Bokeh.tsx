import React, { Component } from 'react';
import { EmptyProps, EmptyState } from '../types';

export class Bokeh extends Component<EmptyProps, EmptyState>{
    constructor(props: EmptyProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>Bokeh</h1>
                <a href={"https://docs.bokeh.org/en/latest/index.html#"}>https://docs.bokeh.org/en/latest/index.html#</a>
            </div>
        );
    }
}