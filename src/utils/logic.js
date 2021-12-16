
const maxLimition = 8;
const minLimition = 0;
function startTheGame(xy){
    var mainBoard = Array(8).fill(-1).map(row => new Array(8).fill(-1));
    var arr = xy.split(',');
    var x = arr[0]*1,y = arr[1]*1;
    mainBoard[x][y] = 0;// the palyer first step!
    var flow = calcBestMoves(mainBoard,x,y,0);
    return flow;
}

function calcBestMoves(board,x,y, counter){
    console.log(`x - ${x}, y - ${y}`);
    var upLeftFlow = upLeft(board, x,y,counter);
    var upRightFlow =  upRight(board, x,y,counter);
    var downRightFlow = downRight(board, x,y,counter);
    var downLeftFlow =downLeft(board, x,y,counter);
    var leftDownFlow =leftDown(board, x,y,counter);
    var leftUpFlow =leftUp(board, x,y,counter);
    var rightUpFlow =rightUp(board, x,y,counter);
    var rightDownFlow =rightDown(board, x,y,counter);
    var array = [upLeftFlow, upRightFlow, downRightFlow, downLeftFlow, leftDownFlow, leftUpFlow, rightUpFlow, rightDownFlow];

    return array.filter(x => x.counter === Math.max.apply(Math, array.map(function(o) { return o.counter; })))[0];
}

function upLeft(board, x, y, counter){
    x = x - 2
    y = y - 1
    if(!isLigal(x,y,board,counter))//validate the step
        return {board, counter};
    counter++; //add step
    board[x][y] = counter; //put the step for record;

    return calcBestMoves(board,x,y,counter);
}
function upRight(board, x, y, counter){
    x = x - 2
    y = y + 1
    if(!isLigal(x,y,board,counter))//validate the step
            return {board, counter};
    counter++; //add step
    board[x][y] = counter; //put the step for record;

    return calcBestMoves(board,x,y,counter);
}
function downRight(board, x, y, counter){
    x = x + 2
    y = y + 1
    if(!isLigal(x,y,board,counter))//validate the step
            return {board, counter};
    counter++; //add step
    board[x][y] = counter; //put the step for record;

    return calcBestMoves(board,x,y,counter);
}
function downLeft(board, x, y, counter){
    x = x + 2
    y = y - 1
    if(!isLigal(x,y,board,counter))//validate the step
            return {board, counter};
    counter++; //add step
    board[x][y] = counter; //put the step for record;

    return calcBestMoves(board,x,y,counter);
}
function leftDown(board, x, y, counter){
    x = x + 1
    y = y - 2
    if(!isLigal(x,y,board,counter))//validate the step
            return {board, counter};
    counter++; //add step
    board[x][y] = counter; //put the step for record;

    return calcBestMoves(board,x,y,counter);
}
function leftUp(board, x, y, counter){
    x = x - 1
    y = y - 2
    if(!isLigal(x,y,board,counter))//validate the step
            return {board, counter};
    counter++; //add step
    board[x][y] = counter; //put the step for record;

    return calcBestMoves(board,x,y,counter);
}
function rightUp(board, x, y, counter){
    x = x - 1
    y = y + 2
    if(!isLigal(x,y,board,counter))//validate the step
            return {board, counter};
    counter++; //add step
    board[x][y] = counter; //put the step for record;

    return calcBestMoves(board,x,y,counter);
}
function rightDown(board, x, y, counter){
    x = x + 1
    y = y + 2
    if(!isLigal(x,y,board,counter))//validate the step
            return {board, counter};
    counter++; //add step
    board[x][y] = counter; //put the step for record;

    return calcBestMoves(board,x,y,counter);
}
function isLigal(x, y, board,counter){
    if(x >= maxLimition || x < minLimition || y >= maxLimition || y < minLimition ) // is the step is out of the bord
        return false;
    if(board[x][y] !== -1)//has visited
        return false;

    var theNextStep = counter+ 1;
    var isContains = false;
    board.map(h => {
         if(h.indexOf(theNextStep) > -1){
                isContains = true;
        }
    });    
    return !isContains;
}

export {startTheGame}