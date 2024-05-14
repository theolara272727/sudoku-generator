
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function line(num,sudokuMtx,i){
    for(var indx = 0;indx < 9;indx++){
        if(sudokuMtx[i][indx] === num){
            return false
        }
    }
    return true
}
function column(num,sudokuMtx,j){
    for(var indx = 0;indx < 9;indx++){
        if(sudokuMtx[indx][j] === num){
            return false
        }
    }
    return true
}
function grid(num,sudokuMtx,i,j){
    i_offset = i-(i%3);
    j_offset = j-(j%3);
    for(var indx = 0+i_offset;indx < i_offset+3;indx++){
        for(var jndx = 0+j_offset;jndx < j_offset+3;jndx++){
            if(sudokuMtx[indx][jndx] === num){
                return false;
            }
        }
    }
    return true;
}
function backtrack(sudokuMtx,poss,i,j){
    var localPoss = [...poss];
        while(localPoss.length > 0 && sudokuMtx[8][8] == 0){
            
            if(line(localPoss[0],sudokuMtx,i) && column(localPoss[0],sudokuMtx,j) && grid(localPoss[0],sudokuMtx,i,j) && typeof localPoss[0] === 'number'){
                sudokuMtx[i][j] = localPoss[0];
                var newPoss = [1,2,3,4,5,6,7,8,9];
                shuffleArray(newPoss);
                if(j+1 > 8){
                    
                    backtrack(sudokuMtx,newPoss,i+1,j-8);
                    if(sudokuMtx[8][8] == 0){
                        sudokuMtx[i][j] = 0;
                    }
                    
                }   
                else{
                    backtrack(sudokuMtx,newPoss,i,j+1);
                    if(sudokuMtx[8][8] == 0){
                        sudokuMtx[i][j] = 0;
                    }
                    
                }
            }
            localPoss.splice(0,1);
        }
    return   
   
}
function generateSudoku(sudokuMTx){
    var poss = [1,2,3,4,5,6,7,8,9];
    shuffleArray(poss);
    backtrack(sudokuMtx,poss,0,0);
}
function onGenSudokuClick(){
    solutionNotShown = true;

    sudokuMtx = Array(9).fill().map(()=>Array(9).fill(0));
    for(var i = 0;i < 9;i++){
        for(var j = 0;j < 9;j++){
            var uniqueInputEl = document.getElementById(i.toString() + j.toString());
            uniqueInputEl.value = "";
            uniqueInputEl.style.color = "blue";
            uniqueInputEl.style.fontWeight = "normal";
            uniqueInputEl.style.backgroundColor = "white";
        }
    }
    generateSudoku(sudokuMtx);
    var hidden = 40;
    for(var i = 0;i < 9;i++){
        for(var j = 0;j < 9;j++){
            if(Math.floor(Math.random()*2) && hidden > 0){
                var uniqueInputEl = document.getElementById(i.toString() + j.toString());
                uniqueInputEl.value =sudokuMtx[i][j];
                uniqueInputEl.style.fontWeight = "bolder";
                uniqueInputEl.style.color = "black";
                hidden -= 1;
            }
        }
    }
   
}
function onShowSudokuClick(){

    if(sudokuMtx[0][0] != 0 && solutionNotShown)
    {    
        solutionNotShown = false;
        for(var i = 0;i < 9;i++){
            for(var j = 0;j < 9;j++){
                var uniqueInputEl = document.getElementById(i.toString() + j.toString());
                if(uniqueInputEl.value == sudokuMtx[i][j]){
                    uniqueInputEl.style.backgroundColor = "#6af784";
                }
                else{
                    uniqueInputEl.style.backgroundColor = "#f7746a";
                }
                uniqueInputEl.value = sudokuMtx[i][j];
            }
        }
    }
}

// function onFootnoteHover(e){
//     e.target.style.width = e.target.scrollWidth;
//     e.target.appendChild(teste);
//     e.target.style.width = e.target.scrollWidth;
// }
// function onFootnoteOut(e){
//     e.target.style.width = e.target.scrollWidth;
//     e.target.removeChild(teste)
//     e.target.style.width = e.target.scrollWidth;
// }

var teste = document.createTextNode("a");
var solutionNotShown = true;
var sudokuVar = document.getElementById("sudoku");
var genSudokuButton = document.getElementById("generateSudoku");
var showSudokuButton = document.getElementById("showSudoku");
var sudokuMtx = Array(9).fill().map(()=>Array(9).fill(0));
var footnoteBoxes = document.getElementsByClassName("footnote_box")
genSudokuButton.addEventListener("click",onGenSudokuClick);
showSudokuButton.addEventListener("click",onShowSudokuClick);

// for(var i = 0;i < footnoteBoxes.length;i++){
//     footnoteBoxes[i].addEventListener("mouseover",onFootnoteHover)
//     footnoteBoxes[i].addEventListener("mouseout",onFootnoteOut)
// } 

for(var i = 0;i < 9;i++){
    if(i === 3 || i === 6){
        sudokuVar.appendChild(document.createElement("br"))
    }
    for(var j = 0;j < 9;j++){
        if(j === 3 || j === 6){
            sudokuVar.appendChild(document.createTextNode('     '))
        }
        var inputEl = document.createElement("input");
        inputEl.className = "numInput";
        inputEl.id = i.toString() + j.toString();
        inputEl.type = "tel";
        inputEl.maxLength = '1';
        sudokuVar.appendChild(inputEl);
    }
    sudokuVar.appendChild(document.createElement("br"));
}


