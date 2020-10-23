//To Do...
  //moves for knights
  //first moves for pawns
  //check possible moves for all pieces (started line 86)]
  //on move save all possible takeable pieces into array, iterate though the array, check if enemy king is any of those pieces, if it is, can the king move into any tile that isn't one of those in the array?, if not, can any piece of that colour move? if not - draw, otherwise, win
  //on king select - iterate though the array, block from moving into any of these tiles
  //castleing?
  //promotion?
  //en passant?

  window.addEventListener('load', (event) => {

  let board = document.getElementById("board");
  let isSelected = false;
  let selected = "";
  let enemyColor = "";
  let counter = 0;
  let directionCount = 0;
  let current = "";
  let moveX = 0;
  let moveY = 0;
  let selectedX = "";
  let selectedY = "";
  let piece = "";
  
console.log(board)

  const scanAllDirections = (piece, scanAll) => {
          enemyColor = (piece[0] == "W") ? "B" : "W" 
          directionCount = (piece[1] == "4") ? 1 : 0;
          if (piece == 'W1') {directionCount = 4}
          //pick the smallest out of x or y
          while (directionCount <= 7){
            let i = 1;
            counter = 0;
            // ("direction count = "+directionCount+" and counter = "+counter)
            while(i <= 7){
              moveX = (directionCount == 0 || directionCount == 1 || directionCount == 7) ? selectedX-i : //upwards
                      (directionCount == 2 || directionCount == 6) ? selectedX : //left or right
                      selectedX+i //downwards
              
              moveY = (directionCount == 5 || directionCount == 6 || directionCount == 7) ? selectedY-i : //left
                      (directionCount == 0 || directionCount == 4) ? selectedY : //up or down
                      selectedY+i //right
              
              if (typeof board.rows[moveX] !== "undefined"){
                if (typeof board.rows[moveX].cells[moveY] !== "undefined"){
              current = board.rows[moveX].cells[moveY]
                if (current.innerHTML == "" && counter==0) {
                  current.style.backgroundColor = "orange";
                  // coords.push([selectedY, i])
                  // console.log("scanUp hit "+ board.rows[i].cells[selectedY].innerHTML+" at "+i+"-"+selectedY)
                }
                if (current.innerHTML != "" && current.innerHTML[0] != enemyColor) {
                  counter++
                }
                if (current.innerHTML[0] == enemyColor && counter==0) {
                  current.style.backgroundColor = "orange";
                  counter++
                  // coords.push([selectedY, i])
                }
  
             }} 
              if (piece[1] == "1") {i+= 7}
              if (piece[1] == "6") {i+= 7}
              i++
             // console.log("moveX = "+moveX)
             // console.log("moveY = "+moveY) 
           }
            
            switch(piece[1]){
              case "1": //Pawn
                directionCount+=10
                break;
              case "2": // Rook
                directionCount+=2
                break;
              case "3": //Knight
                directionCount++ //temp
                break;
              case "4": //Bishop
                directionCount+=2
                break;
              case "5": //Queen
                directionCount++
                break;
              case "6": //King
                directionCount++ //temp
                break;
            }
            
          }
         }
  
  const iteratePieces = (checkCheck) => {
    for(let i=0; i<8; i++) {
      for(let o=0; o<8; o++){
        board.rows[i].cells[o].style.backgroundColor = "red";
        
        // if (checkCheck && board.rows[i].cells[o].innerHTML != "") {
        //   selectedX = i
        //   selectedY = o
        //   scanAllDirections(board.rows[i].cells[o], true)
        //}
      }
    }
  }
  
  let newGame = () => {
    iteratePieces(false)
    isSelected = false;
    selected = "";
    enemyColor = "";
    counter = 0;
    directionCount = 0;
    current = "";
    moveX = 0;
    moveY = 0; 
    //blank tiles
    for (let i=2;i<6;i++){
      for (let o=0;o<8;o++){
      board.rows[i].cells[o].innerHTML = ""
      }
    }
    //pawns
    for (let i=0;i<8;i++){
      board.rows[1].cells[i].innerHTML = "W1"
      board.rows[6].cells[i].innerHTML = "B1"
    }
    //rooks
      board.rows[7].cells[0].innerHTML = "B2"
      board.rows[7].cells[7].innerHTML = "B2"
      board.rows[0].cells[0].innerHTML = "W2"
      board.rows[0].cells[7].innerHTML = "W2"
    //knights
      board.rows[7].cells[1].innerHTML = "B3"
      board.rows[7].cells[6].innerHTML = "B3"
      board.rows[0].cells[1].innerHTML = "W3"
      board.rows[0].cells[6].innerHTML = "W3"
     //bishops
      board.rows[7].cells[2].innerHTML = "B4"
      board.rows[7].cells[5].innerHTML = "B4"
      board.rows[0].cells[2].innerHTML = "W4"
      board.rows[0].cells[5].innerHTML = "W4"
      //queens
      board.rows[0].cells[3].innerHTML = "W5"
      board.rows[7].cells[3].innerHTML = "B5"
      //kings
      board.rows[0].cells[4].innerHTML = "W6"
      board.rows[7].cells[4].innerHTML = "B6"
      //test piece
      board.rows[4].cells[7].innerHTML = "W5"
      board.rows[4].cells[5].innerHTML = "W4"
      board.rows[2].cells[1].innerHTML = "W2"
  }
  
  const movePiece = (x) => {
          // selected piece to new tile
          x.innerHTML = selected.innerHTML;
          //old tile blank
          selected.innerHTML = "";
          selected.style.backgroundColor = "red";
          //resets selected variables
          isSelected = false;
          selected = "";
          iteratePieces(true);
        }
  
  const handleClick = (c) => {
      console.log(c)
    //already selected a piece
     if (isSelected == true){
      //Can't place selected piece on own piece
      if (c.innerHTML[0] == selected.innerHTML[0]) {
        console.log("Error: Impossible Move")
        c.style.backgroundColor = "red";
        isSelected = false;
        selected = "";
        iteratePieces(false)
      } else {
        //can't place piece on tile it is already on
        if (c !== selected) {
        //correctly placed piece scenario
        selectedX = selected.parentNode.rowIndex
        selectedY = selected.cellIndex
        //move a piece
        movePiece(c)
        }
      }
    }
    //select piece
    else {
        //Correctly selected piece
        if (c.innerHTML != ""){
  
        isSelected = true
    
        //highlights selected tile
        c.style.backgroundColor = "green"
         
        selected = c;
        piece = selected.innerHTML;
        // let piece = "";
        
        selectedX = selected.parentNode.rowIndex
        selectedY = selected.cellIndex
        
        //availble coordinates
        let coords = [];
     
        scanAllDirections(piece, false)
          
        // console.log(coords)
        // console.log(selected.innerHTML)
        // console.log(isSelected)
      }
    }
  }

  document.getElementById("newGameButton").addEventListener("click", ()=>newGame())
  
let tiles = document.getElementsByClassName("gameTile")

for (let x=0; x<tiles.length; x++){
    tiles[x].addEventListener("click", ()=> handleClick(tiles[x]))
}

//.forEach(element => {
  //    element
  //});


  //[0].addEventListener
  
  
  //Detect piece - not sure i need this
        // switch(selected.innerHTML[1]){
        //   case "1": //Pawn
        //   break;
        //   case "2": piece = "Rook"
        //   break;
        //   case "3": piece = "Knight"
        //   break;
        //   case "4": piece = "Bishop"
        //   break;
        //   case "5": piece = "Queen"
        //   break;
        //   case "6": piece = "King"
        //   break;
        // }
  
   //All directions test
  //       const scanAllDirections = (piece) => {  
  //         enemyColor = (piece[0] == "W") ? "B" : "W" 
  //         directionCount = 0;
  //         counter = 0;
  //         //pick the smallest out of x or y
  //         while (directionCount <= 7){
  //           let i = 1;
  //           counter = 0;
  //           // ("direction count = "+directionCount+" and counter = "+counter)
  //           while(i <= 7){
              
  //             moveX = (directionCount == 0 || directionCount == 1 || directionCount == 7) ? selectedX-i : //upwards
  //                     (directionCount == 2 || directionCount == 6) ? selectedX : //left or right
  //                     selectedX+i //downwards
              
  //             moveY = (directionCount == 5 || directionCount == 6 || directionCount == 7) ? selectedY-i : //left
  //                     (directionCount == 0 || directionCount == 4) ? selectedY : //up or down
  //                     selectedY+i //right
              
  //             if (typeof board.rows[moveX] !== "undefined"){
  //               if (typeof board.rows[moveX].cells[moveY] !== "undefined"){
  //             current = board.rows[moveX].cells[moveY]
  //               if (current.innerHTML == "" && counter==0) {
  //                 current.style.backgroundColor = "orange";
  //                 // coords.push([selectedY, i])
  //                 // console.log("scanUp hit "+ board.rows[i].cells[selectedY].innerHTML+" at "+i+"-"+selectedY)
  //               }
  //               if (current.innerHTML != "" && current.innerHTML[0] != enemyColor) {
  //                 counter++
  //               }
  //               if (current.innerHTML[0] == enemyColor && counter==0) {
  //                 current.style.backgroundColor = "orange";
  //                 counter++
  //                 // coords.push([selectedY, i])
  //               }
  
  //            }} i++
  //            // console.log("moveX = "+moveX)
  //            // console.log("moveY = "+moveY) 
  //          }
  //           directionCount++
  //         }
  //        }

});