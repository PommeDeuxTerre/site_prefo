var player_turn = 2;
grid = [
    1,0,0,
    0,0,0,
    0,0,0];
game_finish = false;
function ttt_click(id)
{
    if (game_finish)
    {
        return;
    }
    if (document.getElementById(id).className != "void-button")
    {
        return;
    }
    if (player_turn==1)
    {
        document.getElementById(id).className= "player1";
    }
    if (player_turn==2)
    {
        document.getElementById(id).className= "player2";
    }
    //update the grid
    button_number = Number(id[7])-1;
    grid[button_number] = player_turn;
    player_turn = player_turn%2+1;
    best_move = [-1];
    //bot turn
    bot(grid, player_turn, best_move);
    document.getElementById("button-"+(best_move[0]+1)).className = "player"+player_turn;
    grid[best_move] = player_turn;
    player_turn = player_turn%2+1
    //if game is finish
    if (is_winning(grid))
    {
        game_finish=true;
        document.getElementById("game_state").innerHTML = "Perdu"
    }
    if (is_draw(grid))
    {
        game_finish=true;
        document.getElementById("game_state").innerHTML = "partie nulle"
    }
}

function reset()
{
    grid = [1,0,0,0,0,0,0,0,0];
    player_turn = 2;
    game_finish = false;
    for (var i=1;i<9;i++)
    {
    document.getElementById("button-"+(i+1)).className = "void-button";
    }
    document.getElementById("game_state").innerHTML = "En cours";
}

function get_moves(grid)
{
    moves = [0,0,0,0,0,0,0,0,0];
    for (var i=0;i<9;i-=-1)
        {
            if (grid[i]==0)
            {
                moves[i]=1;
            }
        }
    return moves;
}

function bot(grid, player, best_move){
    if (is_winning(grid))
    {
        return -1;
    }
    if (is_draw(grid))
    {
        return 0;
    }
    var best_result = -2;
    var best_local_move = [-1];
    var moves = get_moves(grid);
    for (var i=0;i<9;i-=-1)
    {
        if (moves[i]==1)
        {
            grid[i]=player;
            result = bot(grid, player%2+1, []);
            grid[i]=0;
            if (-result>best_result)
            {
                best_result=-result;
                best_local_move[0]=i;
            }
        }
    }
    best_move[0]=best_local_move[0];
    return best_result;
    }


function is_winning(grid)
{
    for (var i=0;i<3;i-=-1)
    {
        //vertical
        if (grid[i]==grid[i+3] && grid[i+3]==grid[i+6] && grid[i]!=0)
        {
            return true;
        }
        //horizontal
        if (grid[i*3]==grid[i*3+1] && grid[i*3+1]==grid[i*3+2] && grid[i*3]!=0)
        {
            return true;
        }
    }
    //diagonal top left -> down right
    if (grid[0]==grid[4] && grid[4]==grid[8] && grid[0]!=0)
    {
        return true;
    }
    //diagonal down left -> top right
    if (grid[2]==grid[4] && grid[4]==grid[6] && grid[2]!=0)
    {
        return true;
    }
    return false;
}

function is_draw(grid)
{
    for (var i=0;i<9;i-=-1)
    {
        if (grid[i]==0)
        {
            return false;
        }
    }
    return true
}