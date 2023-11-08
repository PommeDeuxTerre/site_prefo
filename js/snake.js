const WIDTH = 20
const HEIGHT = 10
const DIRECTIONS = [-WIDTH,-1,1,WIDTH]
var snakes = [110, 109, 108, 107, 106]
var head = 4
var tail = 0
var apple_index=10
update_apple()
//0 up, 1 left, 2 right, 3 down
var snake_direction = 1
var last_snake_direction = 1

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
            square.id = y*WIDTH + x
            line.appendChild(square)
        }
        snake_grid.appendChild(line)
    }
}

function reset_snake()
{
    var square;
    for (var i=0;i<snakes.length;i++)
    {
        if (snakes[i]!=-1)
        {
            square = document.getElementById(snakes[i])
            console.log(square)
            square.classList.remove("snake")
            console.log(square)
        }
    }
}

function show_snake()
{
    for (var i=0;i<snakes.length;i++)
    {
        if (snakes[i]!=-1)
        {
            document.getElementById(snakes[i]).classList.add("snake")
        }
    }
    document.getElementById(apple_index).classList.add("apple")
}

function is_dead()
{
    for (var i=0;i<head-tail;i++)
    {
        if (snakes[tail+i]==snakes[head])
        {
            return 1;
        }
    }
    return 0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function update_apple()
{
    apple = document.getElementById(apple_index)
    if (apple)
    {
        apple.classList.remove("apple")
    }
    apple_index = Math.floor(Math.random()*200)
    while (snakes.includes(apple_index))
    {
        apple_index = Math.floor(Math.random()*200)
    }
}

function make_snake_move(direction)
{
    snakes[head+1]=snakes[head]+DIRECTIONS[direction]
    head++
    if (snakes[head]==apple_index)
    {
        update_apple()
    }
    else
    {
        snakes[tail]=-1
        tail++;
    }
}

function kill_snake()
{
    var grid = document.getElementById("snake")
    grid.innerHTML = ""
    init_grid()
    snakes = [110, 109, 108]
    head = 2
    tail = 0
    snake_direction = 1
}

async function snake_move()
{
    while (true)
    {
        await sleep(300)
        reset_snake()
        make_snake_move(snake_direction)
        last_snake_direction = snake_direction;
        show_snake()
        snake_dead = is_dead()
        if (snake_dead)
        {
            kill_snake()
        }
    }
}

document.onkeydown = function(e) {
    console.log(e.key)
    switch (e.key)
    {
        case "ArrowUp":
            if (last_snake_direction!=3)
            {
                snake_direction = 0
            }
            break
        case "ArrowLeft":
            if (last_snake_direction!=2)
            {
                snake_direction = 1
            }
            break
        case "ArrowRight":
            if (last_snake_direction!=1)
            {
                snake_direction = 2
            }
            break
        case "ArrowDown":
            if (last_snake_direction!=0)
            {
                snake_direction = 3
            }
            break
    }
}

init_grid()
show_snake()
snake_move()