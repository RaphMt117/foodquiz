#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitles = chalkAnimation.rainbow("       Food Quiz! \n");
  await sleep();
  rainbowTitles.stop();

  console.log(`
    ${chalk.bgGreen("HOW TO PLAY")}
    I'm a process in your computer
    If you get any question wrong I will be ${chalk.bgRed("killed")}
`);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "Rice is originally from: ",
    choices: ["Europe", "America", "Africa", "Asia"],
  });
  return handleAnswer(answers.question1 == "Asia");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question2",
    type: "list",
    message: "Which of these foods is known to be French: ",
    choices: ["hamburguer", "beans", "croissant", "pasta"],
  });
  return handleAnswer(answers.question2 == "croissant");
}
async function question3() {
  const answers = await inquirer.prompt({
    name: "question3",
    type: "list",
    message: "Which of these is a citrus fruit: ",
    choices: ["apple", "orange", "grapes", "banana"],
  });
  return handleAnswer(answers.question3 == "orange");
}
async function question4() {
  const answers = await inquirer.prompt({
    name: "question4",
    type: "list",
    message: `Pasta is originally from: \n ${chalk.bgRed(
      "Not what you think!",
    )}`,
    choices: ["chinese", "italian", "brazillian", "spanish"],
  });
  return handleAnswer(answers.question4 == "chinese");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Check answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work, ${playerName}. That's the right answer`,
    });
  } else {
    spinner.error({ text: `Game Over, you lose ${playerName}!` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats, ${playerName}! You won the game.`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
winner();
