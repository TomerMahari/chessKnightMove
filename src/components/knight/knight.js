import './knight.css';
import knightImg from '../../images/knight.png';
import React, { Component } from 'react';

export class Knight extends Component {

    render() {
         
        return (
            <img alt='The knight!!' src={knightImg} width={55} height={55} />
        );
    }
  }