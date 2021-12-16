import './chessBoard.css';
import React, { Component } from 'react';
import { Knight } from '../knight/knight';
import { startTheGame } from '../../utils/logic.js';

export class ChessBoard extends Component {

    constructor(props) {
        super(props);
        this.board = Array(8).fill(-1).map(row => new Array(8).fill(-1));
        this.state = {
        knightX : 0,
        knightY : -50,
        gameStarted: false,
        fistStepDone: false,
        steps:-1,
        stepsSum:-1,
        animationName: '',
        stepsHistory: '',
        gameEnded : false
    };
    }
    setColumnClassName(x,y) {
        if(x % 2 === 0 ){
            if(y%2 === 0){
                return 'column brown-column target-'+x + '-' + y;
            }else{
                return 'column white-column target-'+x + '-' + y;
            }
        }else{
            if(y%2 === 0){
                return 'column white-column target-'+x + '-' + y;
            }else{
                return 'column brown-column target-'+x + '-' + y;
            }
        }
    }
    startPlaying = (e) =>{
        if(this.state.gameStarted)
            return;
        var x = e.target.offsetTop;
        var y = e.target.offsetLeft;
        
        this.setState({gameStarted: true});      
        var xy = e.target.attributes['data-column_xy'].value;
       
        var flow = startTheGame(xy);

        this.setState({steps : 0});
        this.setState({stepsSum : flow.counter});
        var prevX = this.state.knightX, prevY = this.state.knightY+ 10;
        setTimeout(() => this.nextStep(flow, -1,prevX,prevY), 1500);//start move the peace
        this.setState({knightX: x});
        this.setState({knightY: y + 10});
        console.log(e.target.attributes['data-column_xy']);
    }
    nextStep = (flow, counter, prevX,prevY) =>{
        var x = -1 , y = -1, currentStep = counter;
         flow.board.map(h => {
             if(h.indexOf(currentStep + 1) >-1){
                 x = flow.board.indexOf(h);
                 y= h.indexOf(currentStep + 1);
             }
         });

         if(counter < flow.counter){
            this.updateStepsHistory(x,y); 
            var elem = document.getElementsByClassName('target-'+x + '-' + y);
            this.setState({knightX: elem[0].offsetTop});
            this.setState({knightY: elem[0].offsetLeft + 10});
            this.changePosition(prevX,prevY,  elem[0].offsetTop,elem[0].offsetLeft + 10)        
            if(this.state.fistStepDone)
                setTimeout(() =>this.addMarks(prevX,prevY,  elem[0].offsetTop,elem[0].offsetLeft + 10),1100);
            else
                this.setState({fistStepDone: true});
            counter++;
            this.setState({steps : counter});
            setTimeout(() =>this.nextStep(flow, counter,elem[0].offsetTop,elem[0].offsetLeft + 10), 1500);//start the move on the next step            
         }else{
             this.setState({gameEnded: true});
         }

    }
    updateStepsHistory = (x,y) => {
        var h = 8-x;
        var w = '';
        switch(y){ 
            case 0: w = 'A'; break;
            case 1: w = 'B'; break;
            case 2: w = 'C'; break;
            case 3: w = 'D'; break;
            case 4: w = 'E'; break;
            case 5: w = 'F'; break;
            case 6: w = 'G'; break;
            case 7: w = 'H'; break;
        }
        this.setState({stepsHistory: this.state.stepsHistory+ w+h + '; '});
    }
    changePosition = (prevX,prevY, newX,newY) => {
        let styleSheet = document.styleSheets[0];
     
        let animationName = `animation${Math.round(Math.random() * 100)}`;
        
        let keyframes =
        `@-webkit-keyframes ${animationName} {
            from {left: ${prevY}px;top: ${prevX}px; }
            to {left: ${newY}px;top:${newX}px;}
        }`;
     
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        
        this.setState({
          animationName: animationName
        });
      }
    addMarks = (prevX,prevY,newX,newY) => {

        var chessBoardElem = document.getElementsByClassName('ChessBoard');
        var divX = document.createElement('div');
        divX.className = 'red-marker';    
        if(newX > prevX){
            divX.style.cssText = 'position:absolute;top:'+(prevX + 30) + 'px; height:' + (newX - prevX) + 'px;left:'+(prevY + 28)+'px;width: 2px;';
        }else{
            divX.style.cssText = 'position:absolute;top:'+(newX + 30) + 'px; height:' + ( prevX-newX) + 'px;left:'+(prevY + 28)+'px; width: 2px;';
        }
        var divY = document.createElement('div');
        divY.className = 'red-marker';                
        if(newY > prevY){
            divY.style.cssText = 'position:absolute;top:'+(newX + 30) + 'px; height:2px;left:'+(prevY + 28)+'px; width:' + (newY - prevY)+'px;' ;
        }else{
            divY.style.cssText = 'position:absolute;top:'+(newX + 30) + 'px; height:2px;left:'+(newY + 28)+'px; width:' + (prevY - newY)+'px;' ;
        }
        chessBoardElem[0].appendChild(divX);
        chessBoardElem[0].appendChild(divY);
    }
    restartGame = () =>{
        this.changePosition(this.state.knightX,this.state.knightY, 0,-50)
        this.setState({
            knightX : 0,
            knightY : -50,
            gameStarted: false,
            fistStepDone: false,
            steps:-1,
            stepsSum:-1,
            animationName: '',
            stepsHistory: '',
            gameEnded: false
        });   
        const elements = document.getElementsByClassName('red-marker');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
    render() {
        let style = {
            animationName: this.state.animationName,
            animationTimingFunction: 'ease-in-out',
            animationDuration: '1.5s',
            animationDelay: '0.0s',
            animationIterationCount: 1,
            animationDirection: 'normal',
            animationFillMode: 'forwards'
          };   
        return (
        <div className="ChessBoard">
           {this.board.map((row, x) => (
          <div className="row" key={x}>
            {row.map((col, y) => (
              <div className={this.setColumnClassName(x,y)} data-column_xy={x+ ',' + y} onClick={this.startPlaying}  key={y}></div>
            ))}
          </div>
        ))}
        <div className='knight-container' style={style}>
            <Knight />   
        </div>
        {this.state.steps > -1? <div className='steps-counter'> 
                {this.state.gameEnded? <button onClick={this.restartGame}>Lets play again</button>: '' }
                <div className='current-step'> <strong> Current Step:</strong> {this.state.steps}</div>
                <div className='all-steps'><strong>Steps Sum: </strong>{this.state.stepsSum}</div>
                <div className='steps-history'><strong>Steps History: </strong>
                <br/>{this.state.stepsHistory}</div>
             </div>:'' }
        </div>
        );
    }
  }