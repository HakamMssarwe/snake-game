//-------------------------DOM Settings------------------------
const body = document.querySelector('body');
let snakeParts = document.querySelectorAll('.snakeParts');
//-------------------------Snake Settings------------------------

//snake Settings
const snakeHead = document.getElementById('snakeHead');
const snakePartWidth = window.innerWidth * 2/100; //2% of window
const snakePartHeight = window.innerHeight * 3/100; // 3% of window


//bait settings
const baitWidth = window.innerWidth * 1/100; //1% of window
const baitHeight = window.innerHeight * 2/100; // 2% of window
//Default start 
const bait = document.getElementById('bait');
bait.style.top = window.innerHeight/2 - snakePartHeight + "px";
bait.style.left = window.innerWidth/2 - snakePartWidth + "px";

for(let i = 1; i < snakeParts.length; i++)
{
     //This is used to determine the next move for each part (default start is right)
    snakeParts[i].style.top = window.innerHeight/2 + "px";
    snakeParts[i].style.left = window.innerWidth/2 + "px";
}

snakeHead.dataset.name = "right";
snakeHead.style.top = window.innerHeight/2 - snakePartHeight + "px";
snakeHead.style.left = window.innerWidth/2 - snakePartWidth + "px";

//LastKeyCode is prevents the snake from crashing to itself, for example using left immedietly after using right
let gameSpeed = 50; // gameSpeed is based on miliseconds
let lastKeyCodeUsed = 'KeyD'; //Default start

//-------------------------Event Settings------------------------
body.addEventListener('keypress',(key)=>
{
    switch(key.code)
    {
        case 'KeyW':
            if (lastKeyCodeUsed != 'KeyS' && lastKeyCodeUsed != 'KeyW')
            {
            //Change the direction of the snake head
            snakeHead.dataset.name = "up";
            //Mark the last key used
            lastKeyCodeUsed = 'KeyW';
            }
            break;

        case 'KeyS':
            if (lastKeyCodeUsed != 'KeyW'  && lastKeyCodeUsed != 'KeyS')
            {
            //Change the direction of the snake head
            snakeHead.dataset.name = "down";
            //Mark the last key used
            lastKeyCodeUsed = 'KeyS';
            }
            break;
    
        case 'KeyD':
            if (lastKeyCodeUsed != 'KeyA'  && lastKeyCodeUsed != 'KeyD')
            {
            //Change the direction of the snake head
            snakeHead.dataset.name = "right";
            //Mark the last key used
            lastKeyCodeUsed = 'KeyD';
            }
            break;


        case 'KeyA':
            if (lastKeyCodeUsed != 'KeyD'  && lastKeyCodeUsed != 'KeyA')
            {
            //Change the direction of the snake head
            snakeHead.dataset.name = "left";
            //Mark the last key used
            lastKeyCodeUsed = 'KeyA';
            }
            break;
    }
})


    //-------------------------UPDATE INTERVAL THAT UPDATES GAME BASED ON THE SPEED CHOOSEN------------------------
const update = setInterval(() => {

    ////-------------------------CHECK FOR MOVEMENT UPDATES------------------------  
    //THE GOAL IS TO BASICALLY TO TREAT EACH SNAKE PART LIKE A HEAD, EACH PART HAS A UNIQUE MOVEMENT BASED ON THE POSITION OF THE PART BEFORE IT
    
    //UPDATE EACH PARTS NEXT MOVE BASED ON ITS DATASET.NAME
    //FOR BETTER EXPLINATION OPEN THE INSPECTION TAB ON THE BROWSER AND LOOK AT THE ELEMENTS, HOW THE DATASET.NAME CHANGES BASED ON THE DIRECTION OF THE SNAKE PART
    
    for(let i = 0; i < snakeParts.length; i++)
    {
    if (snakeParts[i].dataset.name == "right")
     snakeParts[i].style.left = parseFloat(snakeParts[i].style.left) + snakePartWidth + "px";
    

    if (snakeParts[i].dataset.name == "left")
        snakeParts[i].style.left = parseFloat(snakeParts[i].style.left) - snakePartWidth + "px";
    

    if (snakeParts[i].dataset.name == "up")
        snakeParts[i].style.top = parseFloat(snakeParts[i].style.top) - snakePartHeight + "px";
    
    if (snakeParts[i].dataset.name == "down")
        snakeParts[i].style.top = parseFloat(snakeParts[i].style.top) + snakePartHeight + "px";
    
    }      

          //SET DATASET NAMES ACCORDING TO SPECIFIC RULES
          for(let i = 1; i < snakeParts.length;i++)
          { 
              if (parseFloat(snakeParts[i].style.left) < parseFloat(snakeParts[i-1].style.left))
              {
              snakeParts[i].dataset.name = "right";
              snakeParts[i].style.top = snakeParts[i-1].style.top;
              }
              if (parseFloat(snakeParts[i].style.left) > parseFloat(snakeParts[i-1].style.left))
              {
              snakeParts[i].dataset.name = "left";
              snakeParts[i].style.top = snakeParts[i-1].style.top;
              }

              if (parseFloat(snakeParts[i].style.top) < parseFloat(snakeParts[i-1].style.top))
              {
                snakeParts[i].dataset.name = "down";
                snakeParts[i].style.left = snakeParts[i-1].style.left;
              }
      
              if (parseFloat(snakeParts[i].style.top) > parseFloat(snakeParts[i-1].style.top))
              {
              snakeParts[i].dataset.name = "up";
              snakeParts[i].style.left = snakeParts[i-1].style.left;
              }
          }


        ////-------------------------CHECK FOR GAME OVER------------------------  

        //CRASHED INTO A WALL
        if (parseFloat(snakeHead.style.left) > window.innerWidth + snakePartWidth || parseFloat(snakeHead.style.left) < - snakePartWidth || parseFloat(snakeHead.style.top) > window.innerHeight + snakePartHeight || parseFloat(snakeHead.style.top) < -snakePartHeight)
        {
        body.innerHTML = 'GAME OVER - THE SNAKE CRASHED INTO THE WALL <BR> REFRESH THE PAGE TO PLAY AGAIN';
        clearInterval(update);
        }

        //ATE IT SELF
        for (let i = 1; i < snakeParts.length ; i++)
              if (snakeParts[i].style.left == snakeHead.style.left && snakeParts[i].style.top == snakeHead.style.top)
                 {
                  body.innerHTML = 'GAME OVER - THE SNAKE ACCIDENTALLY BITE ITSELF AND DIED DUE AN OVERDOSE OF POISON<BR> REFRESH THE PAGE TO PLAY AGAIN';
                  clearInterval(update);
                 }


        ////-------------------------CHECK IF THE SNAKE ATE THE BAIT------------------------  
        if (parseFloat(snakeHead.style.left) + snakePartWidth > parseFloat(bait.style.left) && parseFloat(snakeHead.style.left) < parseFloat(bait.style.left) + baitWidth && parseFloat(snakeHead.style.top) + snakePartHeight > parseFloat(bait.style.top) && parseFloat(snakeHead.style.top) < parseFloat(bait.style.top) + baitHeight)
              {
               addSnakePart();
               spawnBait();
               }
            
}, gameSpeed);


//-------------------------FUNCTIONS------------------------


function spawnBait()
{
    //Random position for the bait in the page
    //X
    let x = Math.floor(Math.random() * window.innerWidth);
    while (x > window.innerWidth - 70 && x < window.innerWidth + 70)
      x = Math.floor(Math.random() * window.innerWidth);
    //Y
    let y = Math.floor(Math.random() * window.innerHeight);
    while (y > window.innerHeight - 70)
      y = Math.floor(Math.random() * window.innerHeight);

    //Change color
    randomBaitColor();

    //Set position
    bait.style.top = y + "px";
    bait.style.left = x + "px";
}

function addSnakePart()
{
    //change the current bait position because the snake ate it and spawn a new one
    spawnBait();
    //Add a new part to the sname
    let tempPart = snakeParts[1].cloneNode(true);
    tempPart.style.left = snakeParts[snakeParts.length -1].style.left;
    tempPart.style.top = snakeParts[snakeParts.length -1].style.top;
    body.append(tempPart);
    snakeParts = document.querySelectorAll('.snakeParts');
}

function randomBaitColor()
{
    //Random color
    let randomColor = Math.floor(Math.random() * 11);
    switch (randomColor) {
      case 1:
        bait.style.backgroundColor = "#ff9a9e";
        break;
      case 2:
        bait.style.backgroundColor = "#fcb69f";
        break;
      case 3:
        bait.style.backgroundColor = "#a1c4fd";
        break;
      case 4:
        bait.style.backgroundColor = "#e2ebf0";
        break;
      case 5:
        bait.style.backgroundColor = "#667eea";
        break;
      case 6:
        bait.style.backgroundColor = "#764ba2";
        break;
      case 7:
        bait.style.backgroundColor = "#89f7fe";
        break;
      case 8:
        bait.style.backgroundColor = "#93a5cf";
        break;
      case 9:
        bait.style.backgroundColor = "#1e3c72";
        break;
      case 10:
        bait.style.backgroundColor = "#50A7C2";
        break;
    }
}