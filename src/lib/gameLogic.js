import chalk from "chalk";
import { select } from "@inquirer/prompts";

let stillHaveTime = "true";

// Setup GUI for game
export async function showMainMenu(gameState) {
  const action = await select({
    message: "Main Menu",
    choices: [
      { name: "Start Trivia", value: "start" },
      { name: "See Stats", value: "stats" },
      { name: "Quit", value: "quit" },
    ],
  });

  // Main Menu flow
  switch (action) {
    case "start":
      await startGame(gameState);
      break;
    case "stats":
      showStats(gameState);
      await select({ message: "Press Enter to return to main menu", choices: [{ name: "Back", value: "back" }] });
      showMainMenu(gameState);
      break;
    case "quit":
      console.log("Thanks for playing!");
      process.exit(0);
  }
}

export async function startGame(gameState) {

    // Reset timer status
    countdownTimer(5, 1000);

    // Present the question
    const choices = ["red", "purple", "he doesn't wear a hat"];
    const userChoice = await select({
        message: "Question 1: What color is Santa's hat?",
        choices: choices.map((choice) => ({ name: choice, value: choice })),
    });

    // Determine if the user is right or wrong
    let result = "";
    if (stillHaveTime == "true")
    {
      if (userChoice == "red")
      {
        result = "correct";
        updateStats(result, gameState);
        console.log(chalk.blue(`Correct!`));
      } else 
      {
        result = "wrong";
        updateStats(result, gameState);
        console.log(chalk.blue(`Wrong :(`));
      }
    } else if (stillHaveTime == "false"){
        result = "timedOut";
        updateStats(result, gameState);
        console.log(chalk.red(`Timed Out...`));
    }

    // Go to next question
    question2(gameState);
}

export async function question2(gameState) {
    
    // Reset timer status
    countdownTimer(5, 1000);

    // Present the question
    const choices = ["spring", "winter", "fall"];
    const userChoice = await select({
        message: "Question 2: What season is after Summer?",
        choices: choices.map((choice) => ({ name: choice, value: choice })),
    });

    // Determine if the user is right or wrong
    let result = "";
    if (stillHaveTime == "true")
    {
      if (userChoice == "fall")
      {
        result = "correct";
        updateStats(result, gameState);
        console.log(chalk.blue(`Correct!`));
      } else 
      {
        result = "wrong";
        updateStats(result, gameState);
        console.log(chalk.blue(`Wrong :(`));
      }
    } else if (stillHaveTime == "false"){
        result = "timedOut";
        updateStats(result, gameState);
        console.log(chalk.red(`Timed Out...`));
    }


    // Go to next question
    question3(gameState);
}

export async function question3(gameState) {
    
    // Reset timer status
    countdownTimer(5, 1000);

    // Present the question
    const choices = ["2", "4", "3"];
    const userChoice = await select({
        message: "Question 3: What is the square root of 9",
        choices: choices.map((choice) => ({ name: choice, value: choice })),
    });

    // Determine if the user is right or wrong
    let result = "";
    if (stillHaveTime == "true")
    {
      if (userChoice == "3")
      {
        result = "correct";
        updateStats(result, gameState);
        console.log(chalk.blue(`Correct!`));
      } else 
      {
        result = "wrong";
        updateStats(result, gameState);
        console.log(chalk.blue(`Wrong :(`));
      }
    } else if (stillHaveTime == "false"){
        result = "timedOut";
        updateStats(result, gameState);
        console.log(chalk.red(`Timed Out...`));
    }

    // Return to main menu
    console.log(chalk.white(`End of Trivia Game`));
    console.log(chalk.magenta(`Returning to Main Menu...`));
    showMainMenu(gameState);
}

function countdownTimer(startTime, interval) {
  // Initialize the remaining time
  let remainingTime = startTime;

  // Set up a timer using setInterval
  const timerID = setInterval(() => {

    // Log the remaining time and decrement it
    process.stdout.write(`\rTime left: ${remainingTime}s `);
    remainingTime--;

    // Stop the timer when time reaches 0
    if (remainingTime < 0) {
      stillHaveTime = "false";
      process.stdout.write(`\rTime's up!\n`);
      clearInterval(timerID);
    }
  }, interval);

  // Return the timer ID for validation
  return timerID;
}


// Update the stats of the user
export function updateStats(result, gameState) {
  if (result === "correct") gameState.stats.correctAnswers += 1;
  else if (result === "wrong") gameState.stats.wrongAnswers += 1;
  else if (result === "timedOut") gameState.stats.timedOutAnswers += 1;
}

export function showStats(gameState) {
  console.log(chalk.blue("Game Statistics:"));
  console.log(chalk.green(`Correct Answers: ${gameState.stats.correctAnswers}`));
  console.log(chalk.red(`Wrong Answers: ${gameState.stats.wrongAnswers}`));
  console.log(chalk.yellow(`Timed Out Answers: ${gameState.stats.timedOutAnswers}`));
}

