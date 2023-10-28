var grid = []
var moves = [top_wall,left_wall,right_wall,bottom_wall];
var opposite_moves = [bottom_wall,right_wall,left_wall,top_wall];
var get_move_dir = [-10,-1,1,10]
var inverse_move = [3,2,1,0]
var pacman_pos = 45;

class Node{
    constructor(index,dis_pac,dis_cur,previous_node)
    {
        this.index = index;
        this.dis_pac = dis_pac;
        this.dis_cur = dis_cur;
        this.heuristic = dis_pac + dis_cur;
        this.previous_node = previous_node
    }
}

var explored_nodes = []
var nun_explored_nodes = []

var cursor_pos = null;

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
            square.addEventListener("mouseover",function click(){cursor_pos=this.id})
            square.addEventListener("mouseout",function click(){cursor_pos=null})
            square.id = ""+(i*10+j)
            line_html.appendChild(square)
        }
        maze_html.appendChild(line_html)
    }
    document.body.appendChild(maze_html)
    document.getElementById(pacman_pos).style.backgroundColor="yellow"
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
    grid[index+get_move_dir[move]] = 0;
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
        grid[index] |= 2**move;
        grid[index+get_move_dir[move]] |= 2**inverse_move[move]
        maze_generator(index+get_move_dir[move])
        all_moves = get_moves(index)
    }
}

function get_distance(a,b)
{
    y = Math.round(a/10) - Math.round(b/10);
    x = a%10 - b%10;
    return Math.sqrt(x*x+y*y)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function get_best_node()
{
    var best_heur = null;
    var best_node = null;
    for (var i=0;i<100;i++)
    {
        if (nun_explored_nodes[i] && (best_heur==null || nun_explored_nodes[i].heuristic>best_heur))
        {
            best_heur = nun_explored_nodes[i].heuristic;
            best_node = i;
        }
    }
    return best_node;
}

function explore_node(node_index)
{
    var previous_node = nun_explored_nodes[node_index]
    var next_node;
    for (var i=0;i<4;i++)
    {
        next_node = nun_explored_nodes[node_index+get_move_dir[i]]
        if (next_node==undefined && explored_nodes[node_index+get_move_dir[i]]==undefined && 2**i & grid[node_index])
        {
            nun_explored_nodes[node_index+get_move_dir[i]] = new Node(node_index+get_move_dir[i],previous_node.dis_pac+1,get_distance(node_index+get_move_dir[i], cursor_pos),previous_node)
            next_node = nun_explored_nodes[node_index+get_move_dir[i]]
            if (node_index+get_move_dir[i] == cursor_pos)
            {
                return node_index+get_move_dir[i];
            }
        }
    }
    explored_nodes[node_index] = nun_explored_nodes[node_index];
    nun_explored_nodes[node_index]=undefined;
    return false;
}

function backtrack(index)
{
    var node = nun_explored_nodes[index];
    var good_node = node;
    while (good_node.previous_node.previous_node!=undefined)
    {
        good_node = good_node.previous_node;
    }
    for (var i=0;i<4;i++)
    {
        if (good_node.previous_node.index+get_move_dir[i]==good_node.index)    
        {
            return i
        }
    }
}

function get_pacman_move()
{
    var result=false;
    var best_node;
    while (result==false)
    {
        best_node = get_best_node();
        result = explore_node(best_node);
    }
    return backtrack(result);
}

async function pacman_move()
{
    var move;
    while (true)
    {
        await sleep(100)
        explored_nodes = []
        nun_explored_nodes = []
        nun_explored_nodes[pacman_pos] = new Node(pacman_pos,0,get_distance(cursor_pos, pacman_pos))

        if (cursor_pos!=null && cursor_pos!=pacman_pos)
        {
            document.getElementById(pacman_pos).style.backgroundColor="#8d99ae"
            move = pacman_pos+get_move_dir[get_pacman_move()]
            document.getElementById(move).style.backgroundColor="yellow"
            pacman_pos = move;
        }
    }
}

set_grid()
var starter_index = get_random(100);
grid[starter_index] = 0
maze_generator(starter_index)
pacman_move()