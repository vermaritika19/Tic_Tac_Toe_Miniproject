let boxes=document.querySelectorAll('.box');
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msg=document.querySelector("#msg");
let msgContainer=document.querySelector(".msg-container");

 let turnX=true;   /* playerX and playerO*/
 let count=0;
 const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],    
    [0,3,6],
    [1,4,7],
    [2,5,8],    
    [0,4,8],
    [2,4,6],
];
    boxes.forEach((box) => {
        box.addEventListener("click",() => {
            if(turnX)                   /*playerX turn*/
            {
                box.innerText="X";
                 turnX=false;
            }
            else{                      /*playerO turn*/
                box.innerText="O";
                turnX=true;
            }
            box.disabled = true;        /*disable box after click*/ 
            count++;
            let  isWinner = checkWinner();    /*check winner after each click*/
            if(count ===9 && !isWinner)       /*if all boxes filled and no winner*/
                {
                    gameDraw();

                }     
        });
    });
const gameDraw = () => {              /*display draw message*/
    msg.innerText ="Game is Draw";
    msgContainer.classList.remove("hide");          
    disabledboxes();
}    
const resetGame = () => {               /*reset game*/
    turnX = true;                        /*playerX starts*/
    enabledboxes();
    msgContainer.classList.add("hide");
}   

const enabledboxes =() => {              /*enable all boxes and clear text*/
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
}    
const disabledboxes = () => {         /*disable all boxes after win*/
    for(let box of boxes)
    {
        box.disabled = true;
    }
}    
const showWinner = (winner) =>{         /*display winner message*/
    msg.innerText = `congratulation winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledboxes();
}
const checkWinner = () => {            /*check winning patterns*/
    for(let pattern of winPatterns)
    {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val !== "" && pos1Val !=="" && pos2Val !=="")
            {
                if(pos1Val ===pos2Val && pos2Val ===pos3Val)
                    {
                        showWinner(pos1Val);
                        return true;
                    }
                
            }        
    }           
}
resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);
