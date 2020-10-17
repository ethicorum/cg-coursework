/// <reference path='../images.d.ts'/>

import React, { FunctionComponent } from 'react';
import { EmptyProps } from '../types';
import { Row } from 'react-bootstrap';
import '../styles/home.css';
import logo from '../images/anim_logo.gif';

export const Home: FunctionComponent<EmptyProps> = () =>
    <Row>
        <div id={"logoDiv"} className={"text-center"}>
            <h2>
                Курсовая работа по "Алгоритмам компьютерной графики"
            </h2>
            <p>Визуализация в сервисе рекомендаций образовательных траекторий</p>
            <p>Выполнил студент группы ИУ9-52Б Минин Степан</p>
            <img src={logo} alt={"Logo"} id={"animLogo"} />
            <p>© 2020. Все права защищены</p>
        </div>
    </Row>;