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
            square.addEventListener("click",function click(){top_wall(this)})
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
    console.log(element.style)
    element.style.borderTopColor = "#8d99ae";
    element.style.borderBottomColor = "#8d99ae";
}

set_grid()