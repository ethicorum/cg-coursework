/// <reference path='../images.d.ts'/>

import React, { FunctionComponent } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { EmptyProps } from '../types';
import { Home } from './Home';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../styles/app.css';
import logo from '../images/traektorium_logo.png';
import { Dthree } from './Dthree';
import { Pfive } from './Pfive';
import { Bokeh } from './Bokeh';
import { Rawgraphs } from './Rawgraphs';

export const App: FunctionComponent<EmptyProps> = () =>
    <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <img src={logo} alt={"Logo small"} id={"squaredLogo"} />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/d3">
                            D3JS
                        </Nav.Link>
                        <Nav.Link as={Link} to="/bokeh">
                            Bokeh
                        </Nav.Link>
                        <Nav.Link as={Link} to="/p5">
                            ProcessingJS
                        </Nav.Link>
                        <Nav.Link as={Link} to="/rawgraphs">
                            RAWgraphs
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/d3" component={Dthree}></Route>
            <Route path="/bokeh" component={Bokeh}></Route>
            <Route path="/p5" component={Pfive}></Route>
            <Route path="/rawgraphs" component={Rawgraphs}></Route>
        </Switch>
    </BrowserRouter>;