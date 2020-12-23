import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import PieChart from './Chart/PieChart';

interface PageParams {
    code: string;
};

interface MyProps extends RouteComponentProps<PageParams> {

};

interface MyState {
    skills: Skill[];
    skillId: number;
    courseId: number;
};

interface Skill {
    id: number;
    title: string;
    courses: Course[];
}

interface Course {
    rating: number;
    hours: number;
    title: string;
    id: number;
}

export class Trajectory extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);

        const random = (min: number, max: number) => Math.random() * (max - min) + min;
        const skills: Skill[] = Array.from({ length: random(5, 13) }, (_x, i) => i).map(i => {
            return {
                id: i,
                title: 'Навык ' + i,
                courses: Array.from({ length: random(7, 15) }, (_x, i) => i).map(i => {
                    return {
                        id: i,
                        title: 'Курс ' + i,
                        hours: random(60, 200),
                        rating: random(1, 6)
                    }
                })
            }
        });

        this.state = {
            skills: skills,
            skillId: 0,
            courseId: 0
        };
    }

    render() {
        const hoursData = this.state.skills.map(x => Number(x.courses.map(x => x.hours).reduce((sum, val) => sum + val).toFixed(0)));
        const max = Math.max(...hoursData);
        const percentage = hoursData.map(x => Math.ceil((x / max) * 100));
        return (
            <Container fluid>
                <Row>
                    <h1>{this.props.match.params.code}</h1>
                </Row>
                <Row>
                    <Col>
                        <Card body>
                            {this.state.skills.map(i => {
                                return (
                                    <Card body
                                        onClick={() => { this.setState({ skillId: i.id }) }}
                                        style={{ cursor: 'pointer', width: `${percentage[i.id]}%`, background: 'rgb(0, 0, 0, 0.15)' }}>
                                        {i.title}
                                    </Card>
                                );
                            })}
                        </Card>
                    </Col>
                    <Col>
                        <Card body>
                            <h2>{this.state.skills[this.state.skillId].title}</h2>
                            <div>
                                Часы: {hoursData[this.state.skillId]}
                            </div>
                            {this.state.skills[this.state.skillId].courses.map(i => {
                                return (
                                    <Card body
                                        onClick={() => { this.setState({ courseId: i.id }) }}
                                        style={{ cursor: 'pointer', background: `rgb(255, 255, 0, ${i.rating / 5.0})` }}>
                                        {i.title}
                                    </Card>
                                );
                            })}
                        </Card>
                    </Col>
                    <Col>
                        <Card body
                            style={{ background: `rgb(255, 255, 0, ${this.state.skills[this.state.skillId].courses[this.state.courseId].rating / 5.0})` }}>
                            <h2>{this.state.skills[this.state.skillId].courses[this.state.courseId].title}</h2>
                            <div>
                                Рейтинг {this.state.skills[this.state.skillId].courses[this.state.courseId].rating.toFixed(2)}
                            </div>
                            <div>
                                Часы: {this.state.skills[this.state.skillId].courses[this.state.courseId].hours.toFixed(0)}
                            </div>
                        </Card>
                        <Card body>
                            <PieChart
                                data={Object.fromEntries(new Map(this.state.skills[this.state.skillId].courses.map(x => [x.title, x.hours])))} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}