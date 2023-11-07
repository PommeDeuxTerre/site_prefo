const WIDTH = 20
const HEIGHT = 10
const DIRECTIONS = [-WIDTH,-1,1,WIDTH]
var snakes = [110]
var head = 0
var tail = 0
//0 up, 1 left, 2 right, 3 down
var snake_direction = 0

function init_grid()
{
    snake_grid = document.getElementById("snake")
    var line
    var square
    for (var y=0;y<HEIGHT;y++)
    {
        line = document.createElement("div")
        line.classList.add("snake_line")
        for (var x=0;x<WIDTH;x++)
        {
            square = document.createElement("div")
            square.classList.add("snake_square")
            square.id = y*WIDTH + x
            line.appendChild(square)
        }
        snake_grid.appendChild(line)
    }
}

function reset_snake()
{
    var snake = document.getElementsByClassName("snake")
    for (var i=0;i<snake.length;i++)
    {
        snake[i].classList.remove("snake")
    }
}

function show_snake()
{
    reset_snake()
    for (var i=0;i<snakes.length;i++)
    {
        if (snakes[i]!=-1)
        {
            document.getElementById(snakes[i]).classList.add("snake")
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function make_snake_move(direction)
{
    snakes[head+1]=snakes[head]+DIRECTIONS[direction]
    head++
    snakes[tail]=-1
    tail++;
}

async function snake_move()
{
    while (true)
    {
        await sleep(300)
        make_snake_move(snake_direction)
        show_snake()
    }
}

document.onkeydown = function(e) {
    console.log(e.key)
    switch (e.key)
    {
        case "ArrowUp":
            snake_direction = 0
        case "ArrowLeft":
            snake_direction = 0
        case "Arrow":
            snake_direction = 0
        case "ArrowUp":
            snake_direction = 0
    }
}

init_grid()
show_snake()
snake_move()