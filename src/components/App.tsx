/// <reference path='../images.d.ts'/>

import React, { FunctionComponent } from 'react';
import { Router, Link, Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../styles/app.css';
import logo from '../images/traektorium_logo.png';
import { Dthree } from './Dthree';
import { history } from './history';
import { Trajectory } from './Trajectory';

export const App: FunctionComponent = () =>
    <Router history={history}>
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
                        <Nav.Link as={Link} to="/nav">
                            Навигатор
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/nav" component={Dthree}></Route>
            <Route path="/trajectory/:code" component={Trajectory}></Route>
        </Switch>
    </Router>;