import React, { Component } from "react";
import * as d3 from "d3";
import ReactFauxDOM, { ReactFauxDomProps, withFauxDOM } from "react-faux-dom";
import './proftree.css';
import axios from 'axios';
import { history } from "../history";

interface IData {
    data: {
        id: string;
    };
    children?: IData[];
}

interface IProfTreeProps extends ReactFauxDomProps {
}

interface IProfTreeState {
    hoverId: string;
    data: IData | null;
}

class ProfTree extends Component<IProfTreeProps, IProfTreeState>{
    constructor(props: IProfTreeProps) {
        super(props);
        this.state = {
            hoverId: '',
            data: null
        };
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

    componentDidMount() {
        axios.get('https://mock-public-api.ssg-wsg.sg/skillsFramework/sectors')
            .then(res => {
                const titles: string[] = res.data.data.sectors.map((x: { title: string }) => x.title);
                const size = titles.length;
                const random = (min: number, max: number) => Math.random() * (max - min) + min;
                const start = random(0, size - 10);

                let data: IData = {
                    data: {
                        id: 'Me'
                    },
                    children: titles.slice(start, start + 10).map(x => { return { data: { id: x } } })
                }

                this.setState({
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({ data: this.data })
            });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeListener);
    }

    data: IData = {
        data: {
            id: "Я",
        },
        children: [
            {
                data: {
                    id: "Образование",
                }
            },
            {
                data: {
                    id: "Искусство",
                }
            },
            {
                data: {
                    id: "Социальные науки",
                }
            },
            {
                data: {
                    id: "Бизнес",
                }
            },
            {
                data: {
                    id: "Естествознание",
                }
            },
            {
                data: {
                    id: "Информатика",
                }
            },
            {
                data: {
                    id: "Инженерия",
                }
            },
            {
                data: {
                    id: "Хозяйство",
                }
            },
            {
                data: {
                    id: "Здравоохранение",
                }
            },
            {
                data: {
                    id: "Службы",
                }
            }
        ],
    };

    renderD3(data: IData): ReactFauxDOM.Element {
        const faux = ReactFauxDOM.createElement('div');

        let width: number = window.innerWidth;
        let height: number = 600;
        let radius = width / 4;
        let svg = d3.select(faux)
            .append('svg')
            .attr("width", '100%')
            .attr("height", height)
            .attr('x', 0)
            .attr('y', 0)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2}) scale(0.75)`);

        let cluster = d3.cluster().size([360, (radius * 2) / 3]);
        var root = d3.hierarchy(data, function (d) {
            return d.children;
        });
        cluster(root);

        let linkGenerator = d3.linkRadial()
            .angle(function (d: any) { return d.x / 180 * Math.PI as number; })
            .radius(function (d: any) { return d.y as number; });

        // Add the links between nodes:
        svg.selectAll('path')
            .data(root.links())
            .enter()
            .append('path')
            .attr("d", linkGenerator as unknown as d3.ValueFn<SVGPathElement, d3.HierarchyLink<IData>, string | number | boolean | null>)
            .style("fill", 'none')
            .attr("stroke", d => {
                if (d.target.data.data.id === this.state.hoverId) {
                    return '#ff0';
                }
                return '#ccc';
            })
            .attr('stroke-width', 6)
            .on("mouseover", (d, i) => {
                this.setState({
                    hoverId: i.target.data.data.id
                });
            })
            .on("mouseout", () => {
                this.setState({
                    hoverId: ''
                });
            })
            .on('click', (d, i) => {
                history.push('/me/' + i.target.data.data.id);
            });

        // Add a circle for each node.
        let node = svg.selectAll("g")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("transform", function (d: d3.HierarchyPointNode<IData>) {
                return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
            });

        node.append("circle")
            .attr("r", 7)
            .style("fill", d => {
                if (d.data.data.id === this.state.hoverId) {
                    return '#ff0';
                }
                return '#69b3a2';
            })
            .attr("stroke", "black")
            .style("stroke-width", 2)
            .on("mouseover", (d, i) => {
                this.setState({
                    hoverId: i.data.data.id
                });
            })
            .on("mouseout", () => {
                this.setState({
                    hoverId: ''
                });
            });

        node.append("text")
            .attr("dx", '0px')
            .attr("dy", "0.31em")
            .attr('text-anchor', 'middle')
            .attr("alignment-baseline", "central")
            .attr("x", function (d: d3.HierarchyPointNode<IData>) { return d.x < Math.PI === !d.children ? 6 : -6; })
            .attr("text-anchor", function (d: d3.HierarchyPointNode<IData>) { return d.x < Math.PI === !d.children ? "start" : "end"; })
            .attr("transform", function (d: d3.HierarchyPointNode<IData>) {
                if (this.parentNode !== null) {
                    let match = d3.select(this.parentNode as unknown as string).attr('transform').replace('rotate(', '').match(new RegExp(/-?\d+/));
                    if (match !== null) {
                        if (d.parent === null) {
                            return `rotate(${-Number(match[0])})`;
                        }
                        let half = Math.ceil(d.x / 180);
                        let direction = Math.pow(-1, half + 1);
                        return `rotate(${-Number(match[0])}) translate(${direction * d.data.data.id.length * 1.25})`;
                    }
                    return '';
                }
                return '';
            })
            .text(function (d) { return d.data.data.id; });
            
        return faux;
    }

    render() {
        if (this.state.data !== null) {
            return this.renderD3(this.state.data).toReact();
        }
        return <></>;
    }
}

export default withFauxDOM(ProfTree);