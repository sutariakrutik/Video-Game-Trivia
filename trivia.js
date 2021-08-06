const questions = [
    {
        question: "What is the name of the final course of all 'Mario Kart' video games?",
        optionA: "Super Mario",
        optionB: "Mario King",
        optionC: "Mario Rainbow",
        optionD: "Rainbow Road",
        correctOption: "optionD"
		//imgNames:"image1.jpg"
    },

    {
        question: "Solid Snake is the hero of the famous video game franchise?",
        optionA: "Metal Shift",
        optionB: "The Metal Gear",
        optionC: "Shift Gear",
        optionD: "The Gear Box",
        correctOption: "optionB"
		//imgNames:"image1.jpg"
    },

    {
        question: "Which famous video game franchise is the game 'V-Bucks' from?",
        optionA: "Call of Duty",
        optionB: "COC",
        optionC: "Pub-G",
        optionD: "Fortnite",
        correctOption: "optionD"
		//imgNames:"image1.jpg"
    },

    {
        question: "'Astro Boy' is which type of video game",
        optionA: "Role Play",
        optionB: "Mind Game",
        optionC: "Action",
        optionD: "strategy",
        correctOption: "optionC"
		//imgNames:"image1.jpg"
    },

    {
        question: "Who is the first character you play in 'Injustice 2'?",
        optionA: "Antman",
        optionB: "Ironman",
        optionC: "Spiderman",
        optionD: "Batman",
        correctOption: "optionD"
		//imgNames:"image1.jpg"
    },

    {
        question: "What is the name of the circular object used to collect Pokemon?",
        optionA: "Poke ball",
        optionB: "pokemon",
        optionC: "Pikacu",
        optionD: "None",
        correctOption: "optionA"
		//imgNames:"image1.jpg"
    },
	
	{
        question: "Which fighting video game franchise is the home of character Nina Williams?",
        optionA: "Street Fighter",
        optionB: "Tekken",
        optionC: "Virtual Fighter",
        optionD: "None",
        correctOption: "optionB"
		//imgNames:"image1.jpg"
    },
	
	{
        question: "What is the first region of the Pokémon world called?",
        optionA: "Galar",
        optionB: "Johto",
        optionC: "Kanto",
        optionD: "None",
        correctOption: "optionC"
		//imgNames:"image1.jpg"
    },
	
	{
        question: "What is the first region of the Pokémon world called?",
        optionA: "Galar",
        optionB: "Johto",
        optionC: "Kanto",
        optionD: "None",
        correctOption: "optionC"
		//imgNames:"image1.jpg"
    },
	
	{
        question: "In the first Super Smash Bros. video game, how many playable characters are there?",
        optionA: "5",
        optionB: "10",
        optionC: "12",
        optionD: "8",
        correctOption: "optionC"
		//imgNames:"image1.jpg"
    }    

]


let shuffledQuestions = []

function handleQuestions() { 

    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
	//document.getElementById("theImage").innerHTML = currentQuestion.imgNames;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            
            correctOption = option.labels[0].id
        }
    })

    
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()

    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null
	
    if (playerScore <= 3) {
        remark = "Poor Grades. Try Agin!!"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent Work. Keep it up!"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}