import React, { Component } from "react";
import * as d3 from "d3";
import ReactFauxDOM, { ReactFauxDomProps, withFauxDOM } from "react-faux-dom";

interface IData {
    [key: string]: number
}

interface IChartProps extends ReactFauxDomProps {
    data: IData;
}

class PieChart extends Component<IChartProps>{
    constructor(props: IChartProps) {
        super(props);

        this.resizeListener = this.resizeListener.bind(this);
        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resizeListener);
    }

    resizeListener() {
        let self = this;
        setTimeout(function () {
            self.resize();
        });
    }

    resize() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeListener);
    }

    renderD3(data: IData): ReactFauxDOM.Element {
        const faux = ReactFauxDOM.createElement('div');

        // set the dimensions and margins of the graph
        let width = 350;
        let height = 350;
        let margin = 40;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        let radius = Math.min(width, height) / 2 - margin;

        // append the svg object to the div
        let svg = d3.select(faux)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") scale(0.75)");


        // set the color scale
        let color = d3.scaleOrdinal()
            .domain(Object.keys(data as object))
            .range(d3.schemeDark2);

        // Compute the position of each group on the pie:
        let pie = d3.pie()
            .sort(null) // Do not sort group by size
            .value(function (d: any) { return d[1]; });
        let data_ready = pie(Object.entries(data) as unknown as (number | { valueOf(): number; })[]);

        // The arc generator
        let arc = d3.arc()
            .innerRadius(radius * 0.5)         // This is the size of the donut hole
            .outerRadius(radius * 0.8)

        // Another arc that won't be drawn. Just for labels positioning
        let outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc as unknown as d3.ValueFn<SVGPathElement, d3.PieArcDatum<number | { valueOf(): number; }>, string | number | boolean | null>)
            .attr('fill', function (d: any) { return (color(d.data[0])) } as unknown as d3.ValueFn<SVGPathElement, d3.PieArcDatum<number | { valueOf(): number; }>, string | number | boolean | null>)
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        // Add the polylines between chart and labels:
        svg
            .selectAll('allPolylines')
            .data(data_ready)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', function (d: d3.DefaultArcObject) {
                let posA = arc.centroid(d) // line insertion in the slice
                let posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                let posC = outerArc.centroid(d); // Label position = almost the same as posB
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
            } as unknown as d3.ValueFn<SVGPolylineElement, d3.PieArcDatum<number | { valueOf(): number; }>, string | number | boolean | null>)

        // Add the polylines between chart and labels:
        svg
            .selectAll('allLabels')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function (d: any) { return d.data[0] })
            .attr('transform', function (d: d3.DefaultArcObject) {
                let pos = outerArc.centroid(d);
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            } as unknown as d3.ValueFn<SVGTextElement, d3.PieArcDatum<number | { valueOf(): number; }>, string | number | boolean | null>)
            .style('text-anchor', function (d) {
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
        return faux;
    }

    render() {
        return this.renderD3(this.props.data).toReact();
    }
}

export default withFauxDOM(PieChart);