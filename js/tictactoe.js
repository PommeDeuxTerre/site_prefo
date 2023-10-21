var player_turn = 2;
grid = [
    1,0,0,
    0,0,0,
    0,0,0];
game_finish = false;
set_grid()
function click(square)
{
    var id = square.id
    if (game_finish)
    {
        return;
    }
    if (document.getElementById(id).className)
    {
        console.log(document.getElementById(id).className)
        return;
    }
    if (player_turn==2)
    {
        document.getElementById(id).className= "player";
    }
    //update the grid
    square_number = Number(id);
    grid[square_number] = player_turn;
    console.log(grid)
    player_turn = player_turn%2+1;
    best_move = [-1];
    //bot turn
    bot(grid, player_turn, best_move);
    document.getElementById(best_move[0]).className = "bot";
    grid[best_move] = player_turn;
    console.log(grid)
    player_turn = player_turn%2+1
    //if game is finish
    if (is_winning(grid))
    {
        game_finish=true;
        document.getElementById("game_state").innerHTML = "Perdu"
        location.href = "../expo/expo.html";
    }
    if (is_draw(grid))
    {
        game_finish=true;
        document.getElementById("game_state").innerHTML = "partie nulle"
        const button_div = document.querySelector("#button-div")
        console.log(button_div.childNodes)
        if (button_div.childNodes.length == 0)
        {
            const button = document.createElement("button")
            button_div.appendChild(button)
            button.innerHTML = "reset"
            button.addEventListener("click", reset)
        }
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

function set_grid()
{
    const grid_html = document.createElement("div",id="grid")
    grid_html.className="grid_ttt"
    for (var i=0;i<3;i++)
    {
        const line_html = document.createElement("div")
        line_html.className="line_ttt"
        for (var j=0;j<3;j++)
        {
            const square = document.createElement("div")
            square.addEventListener("click",function(){click(this)})
            square.id = ""+(i*3+j)
            if (i==j && i==0)
            {
                square.className="bot"
            }
            line_html.appendChild(square)
        }
        grid_html.appendChild(line_html)
    }
    document.body.appendChild(grid_html)
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