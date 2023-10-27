var grid = []
var moves = [top_wall,left_wall,right_wall,bottom_wall];
var opposite_moves = [bottom_wall,right_wall,left_wall,top_wall];
var get_move_dir = [-10,-1,1,10]

function set_grid()
{
    const maze_html = document.createElement("div",id="maze")
    maze_html.className="maze"
    for (var i=0;i<10;i++)
    {
        const line_html = document.createElement("div")
        line_html.className="line_maze"
        for (var j=0;j<10;j++)
        {
            const square = document.createElement("div")
            square.addEventListener("click",function click(){top_wall(this);bottom_wall(this);left_wall(this);right_wall(this)})
            square.id = ""+(i*10+j)
            line_html.appendChild(square)
        }
        maze_html.appendChild(line_html)
    }
    document.body.appendChild(maze_html)
}

function get_random(possibilities_number)
{
    return Math.floor(Math.random()*possibilities_number)
}

function top_wall(element)
{
    element.style.borderTopColor = "#8d99ae";
}
function bottom_wall(element)
{
    element.style.borderBottomColor = "#8d99ae";
}
function left_wall(element)
{
    element.style.borderLeftColor = "#8d99ae";
}
function right_wall(element)
{
    element.style.borderRightColor = "#8d99ae";
}


function get_moves(index)
{
    //moves = 0000 in bin
    var all_moves = 0;
    //up
    if (index > 9 && grid[index-10]==undefined)
    {
        all_moves |= 1;
    }
    //left
    if (index%10!=0 && grid[index-1]==undefined)
    {
        all_moves |= 2;
    }
    //right
    if (index%10!=9 && grid[index+1]==undefined)
    {
        all_moves |= 4;
    }
    //down
    if (index < 90 && grid[index+10]==undefined)
    {
        all_moves |= 8;
    }
    return all_moves;
}

function play_random_move(index, all_moves)
{
    //get the random move
    var nb_moves = 0;
    for (var i=0;i<4;i++)
    {
        if (all_moves & 2**i)
        {
            nb_moves++;
        }
    }
    var move = get_random(nb_moves);

    //get the move
    nb_moves = 0;
    for (var i=0;i<4;i++)
    {
        if (all_moves & 2**i)
        {
            if (nb_moves==move)
            {
                move = i;
                break;
            }
            nb_moves++;
        }
    }

    //play the move on the html grid
    var index_element = document.getElementById(index)
    var next_element = document.getElementById(index+get_move_dir[move])
    grid[index+get_move_dir[move]] = 1;
    moves[move](index_element)
    opposite_moves[move](next_element)
    return move;
}

function maze_generator(index)
{
    var all_moves = get_moves(index)
    var move;
    while (all_moves!=0)
    {
        move = play_random_move(index, all_moves);
        maze_generator(index+get_move_dir[move])
        all_moves = get_moves(index)
    }
}

set_grid()
grid[0] = 1
maze_generator(0)