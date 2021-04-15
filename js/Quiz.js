class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display(); 
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    var Title = createElement('h2')
    Title.html("Score:");
    Title.position(425,25);
    //write code to add a note here
    var Note = createElement('h5')
    Note.html("Correct is green");
    Note.position(405,50);
  
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      var yPosition = 200;
      //write code to highlight contest who answered correctly
      for(var plr in allContestants){
        var name = createElement('h4');
        var correctAns = "2";

        if(correctAns === allContestants[plr].answer){
          name.html(allContestants[plr].name + ":" + allContestants[plr].answer + " CORRECT");
        }else{
          name.html(allContestants[plr].name + ":" + allContestants[plr].answer + " INCORRECT");
        }

        
        name.position(150, yPosition);
        
        yPosition += 50 ;

      }
          
    } else {
      console.log("oyoyoyoyo");
    }
  }

}
