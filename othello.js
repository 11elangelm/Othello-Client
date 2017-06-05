/*CONSTANTES DEL JUEGO*/ 
empty = 0;
black = 1;
white = 2;
max_depth = 7;
board_size = 8;
/*FUNCIONES DEL JUEGO*/
function createNewBoard(board){
    var new_board = [];
    var row = [];
    for(var i=1; i<=board.length; i++){
        row.push(board[i-1]);
        if(((i%board_size) == 0) && (i !== 0)){
            new_board.push(row);
            row = [];
        }
    }
    return new_board;
}
function validMoves(board, color){
    var validos = [];
    var new_board = createNewBoard(board);
    for(var i=0; i<new_board.length; i++)
        for(var j=0; j<new_board[i].length; j++){
            var valid_move = validMove(i,j,color,new_board);
            if(valid_move)
                validos.push(i*board_size+j);
        }
    return validos;
}
function validMove(row, col, color, board){
    if(board[row][col] !== 0)
        return false;
    var oponent = (color == black) ? white : black;
    dir = (row > 0) ? board[row-1][col] : -1;// UP
    if(dir == oponent)
        if(up(row, col, board, color, oponent))            
            return true;
    dir = (col < 7 && row > 0) ? board[row-1][col+1] : -1;// UP-RIGHT
    if(dir == oponent)
        if(up_right(row, col, board, color, oponent))            
            return true;
    dir = (col < 7) ? board[row][col+1] : -1;// RIGHT
    if(dir == oponent)
        if(right(row, col, board, color, oponent))            
            return true;
    dir = (col < 7 && row < 7) ? board[row+1][col+1] : -1;//DOWN-RIGHT
    if(dir == oponent)
        if(down_right(row, col, board, color, oponent))            
            return true;
    dir = (row < 7) ? board[row+1][col] : -1;//DOWN
    if(dir == oponent)
        if(down(row, col, board, color, oponent))            
            return true;
    dir = (col > 0 && row > 7) ? board[row+1][col-1] : -1;//DOWN-LEFT
    if(dir == oponent)
        if(down_left(row, col, board, color, oponent))            
            return true;            
    var dir = (col > 0) ? board[row][col-1] : -1;//LEFT
    if(dir == oponent)
        if(left(row, col, board, color, oponent))            
            return true;
    dir = (col > 0 && row > 0) ? board[row-1][col-1] : -1;//UP-LEFT
    if(dir == oponent)
        if(up_left(row, col, board, color, oponent))            
            return true;
    return false;
}
function up(row, col, board, color, oponent){
    var change = false;
    for(var i=row-1; i>=0; i--){
        if(board[i][col] == 0)
            return false;
        if(change && board[i][col] == color)
            return true;
        if(!change && board[i][col] == oponent)
            change = true;
    }
    return false;
}    
function up_right(row, col, board, color, oponent){
    var change = false;
    var j = col + 1;
    for(var i=row-1; i>=0 && j<0; i--){
        if(board[i][j] == 0)
            return false;
        if(change && board[i][j] == color)
            return true;
        if(!change && board[i][j] == oponent)
            change = true;
        j++;
    }
    return false;
}
function right(row, col, board, color, oponent){
    var change = false;
    for(var i=col+1; i<8; i++){
        if(board[row][i] == 0)
            return false;
        if(change && board[row][i] == color)
            return true;
        if(!change && board[row][i] == oponent)
            change = true;
    }
    return false;
}  
function down_right(row, col, board, color, oponent){
    var change = false;
    var j = col + 1;
    for(var i=row+1; i<8 && j<8; i++){
        if(board[i][j] == 0)
            return false;
        if(change && board[i][j] == color)
            return true;
        if(!change && board[i][j] == oponent)
            change = true;
        j++;
    }
    return false;
}      
function down(row, col, board, color, oponent){
    var change = false;
    for(var i=row+1; i<8; i++){
        if(board[i][col] == 0)
            return false;
        if(change && board[i][col] == color)
            return true;
        if(!change && board[i][col] == oponent)
            change = true;
    }
    return false;
}  
function down_left(row, col, board, color, oponent){
    var change = false;
    var j = col - 1;
    for(var i=row+1; i<8 && j>=0; i++){
        if(board[i][j] == 0)
            return false;
        if(change && board[i][j] == color)
            return true;
        if(!change && board[i][j] == oponent)
            change = true;
        j--;
    }
    return false;
}      
function left(row, col, board, color, oponent){
    var change = false;
    for(var i=col-1; i>=0; i--){
        if(board[row][i] == 0)
            return false;
        if(change && board[row][i] == color)
            return true;
        if(!change && board[row][i] == oponent)
            change = true;
    }
    return false;
}
function up_left(row, col, board, color, oponent){
    var change = false;
    var j = col - 1;
    for(var i=row-1; i>=0 && j>=0; i--){
        if(board[i][j] == 0)
            return false;
        if(change && board[i][j] == color)
            return true;
        if(!change && board[i][j] == oponent)
            change = true;
        j--;
    }
    return false;
}   
function minimax(board, color, actual_color, depth, max, min){
    if(depth >= max_depth || !isEmpty(board))
        return {
            score: (countPieces(board)[actual_color]), 
            movement: undefined
        };    
    var valid_moves = validMoves(board, actual_color);
    if(valid_moves == null || valid_moves.length == 0)
        return {
            score: (countPieces(board)[actual_color]), 
            movement: undefined
        };
    var new_boards = [];
    for(var i=0; i<valid_moves.length; i++){
        var move = valid_moves[i];
        var next = newBoard(board, actual_color, move);
        new_boards.push({next: next, movement: move});
    }
    var next_color = (actual_color == black) ? white : black;
    if(color == actual_color)
        return myMax(new_boards, color, next_color, depth, max, min);
    else
        return myMin(new_boards, color, next_color, depth, max, min);
}
function myMax(new_boards, color, actual_color, depth, max, min){
    var max_score = -Infinity;
    for(var i=0; i<new_boards.length; i++){
        var board = new_boards[i];
        max_score = Math.max(max_score, minimax(board.next, color, actual_color, depth+1, max, min).score);
        max = Math.max(max, max_score);
        if(min <= max)
            return {
                score: max_score, 
                movement: board.movement
            };
    }
    var i = 0;
    var index = 0;
    for (var j = 0; j < new_boards.length; j++){
        var temp = countPieces(new_boards[j].next)[actual_color];
        if (temp > i){
            index = j;
            i = temp;
        }
    }
    return {
        score: max_score, 
        movement: new_boards[index].movement
    };
}
function myMin(new_boards, color, actual_color, depth, max, min){
    var min_score = Infinity;
    for(var i=0; i<new_boards.length; i++){
        var board = new_boards[i];
        min_score = Math.min(min_score, minimax(board.next, color, actual_color, depth+1, max, min).score);
        min = Math.min(min, min_score);
        if(min <= max)
            return {
                score: min_score, 
                movement: board.movement
            };
    }
    var i = 0;
    var index = 0;
    for (var j = 0; j < new_boards.length; j++){
        var temp = countPieces(new_boards[j].next)[actual_color];
        if (temp < i){
            index = j;
            i = temp;
        }
    }
    return {score: min_score, movement: new_boards[index].movement};
}
function newBoard(board, color, move){
    var board_bk = board.slice();
    var flip_positions = flipPositions(board_bk, color, move);
    for(var i=0; i<flip_positions.length; i++)
        board_bk[flip_positions[i]] = color;
    board_bk[move] = color;
    return board_bk;
}
function flipPositions(board, color, pos){
    var new_color = (color == black) ? white : black;       
    var dirs = {
        up: -1,
        up_right: board_size - 1,
        right: board_size,
        down_right: board_size + 1,        
        down: 1,
        down_left: (-1) * board_size + 1,
        left: (-1) * board_size,
        up_left: (-1) * board_size - 1
    };        
    var lefts = [dirs.left, dirs.down_left, dirs.up_left];
    var rights = [dirs.right, dirs.down_right, dirs.up_right];
    var marks = [];
    for(var dir in dirs){
        var move = dirs[dir];
        var actual_pos = pos;
        var flip_positions = [];
        var found_flag = false;
        var change_flag = false;
        while(actual_pos >= 0 && actual_pos < (board_size*board_size)){
            if(actual_pos !== pos){
                if(board[actual_pos] == new_color){
                    flip_positions.push(actual_pos);
                    change_flag = true;
                } else if (change_flag){
                    found_flag = board[actual_pos] !== empty;
                    break;
                }
            }
            if((actual_pos % board_size == 0 && lefts.indexOf(move) > -1) || ((actual_pos % board_size == board_size-1) && rights.indexOf(move)>-1))
                break;            
            actual_pos += move;
        }
        if(found_flag)
            for(var i=0; i<flip_positions.length; i++)
                marks.push(flip_positions[i]);
    }
    return marks;
}
function countPieces(board){
    var pieces = [];
    pieces[empty] = 0;
    pieces[black] = 0;
    pieces[white] = 0;
    for(var i=0; i<board.length; i++)
        pieces[board[i]]++;
    return pieces;
}
function isEmpty(board){
    return countPieces(board)[empty] > 0;
}

/*Conexión*/
var ip = 'localhost';
//var ip = "192.168.1.112";
var port = '3000';
var tournamentID = 12;
//var tournamentID = 142857;
var socket = require('socket.io-client')('http://'.concat(ip, ':', port));
//readline for username, ttid, role
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('Player ready to go');
socket.on('connect', function(){
  console.log("loging in");
  rl.question("Enter your username: ",(username) => { 
    socket.emit('signin', {
      user_name: username,
      tournament_id: tournamentID,
      user_role: 'player'
    });
  })
});

var game = {
    id: 0,
    turn_id: 0,
    board: [],
    finished: false,
};
var play = 0;
var moves = 0;

socket.on('ok_signin', function(){
    console.log('Conexión exitosa');
});

socket.on('ready', function(data){
    game.finished = false;
    game.id = data.game_id;
    game.turn_id = data.player_turn_id;
    var board = data.board;

    game.board = board;
    Play();
    moves++;

    socket.emit('play', {
        tournament_id: tournamentID,
        player_turn_id: game.turn_id,
        game_id: game.id,
        movement: Number((play.movement == undefined) ? Math.floor(Math.random() * 64) : play.movement)
    });
});

socket.on('finish', function(data){
    var game_id = data.game_id;
    var player_turn_id = data.player_turn_id;
    var winner_turn_id = data.winner_turn_id;
    var board = data.board;
    var win = player_turn_id == winner_turn_id;
    if(win)
        console.log("Has ganado!");
    else
        console.log("Perdiste");
    console.log("Cantidad de movimientos: ", moves);
    
    // Reiniciar valores
    game = {
        id: 0,
        turn_id: 0,
        board: [],
        finished: false,
    };

    move = 0;
    moves = 0;

    socket.emit('player_ready' , {
        tournament_id: tournamentID,
        player_turn_id: player_turn_id,
        game_id: game_id
    });
});

function Play(){
    play = minimax(game.board, game.turn_id, game.turn_id, 0, -Infinity, Infinity);
    console.log("Tiros Posibles: ", validMoves(game.board, game.turn_id));
    console.log("Tiro escogido: ", play);
}