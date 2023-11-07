import inquirer from 'inquirer';
import chalk from 'chalk';
import { addSeconds, differenceInSeconds } from 'date-fns';

async function startCountdownTimer() {
    let inputIsValid = false;
    let time;

    while (!inputIsValid) {
        const { enteredTime } = await inquirer.prompt({
            type: 'input',
            name: 'enteredTime',
            message: 'Enter a time in seconds (1-60):\n',
        });

        if (!isNaN(enteredTime) && enteredTime >= 1 && enteredTime <= 60) {
            time = parseInt(enteredTime);
            inputIsValid = true;
        } else {
            console.log(chalk.red('Please enter a valid number between 1 and 60.'));
        }
    }

    const endTime = addSeconds(new Date(), time!);
    let timerInterval: string | number | NodeJS.Timeout | undefined;

    function displayRemainingTime() {
        const remainingTime = differenceInSeconds(endTime, new Date());
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            endCountdownTimer();
        } else {
            process.stdout.write(chalk.bold.green(`\r${remainingTime} seconds remaining...`));
        }
    }

    timerInterval = setInterval(displayRemainingTime, 1000);
}

async function endCountdownTimer() {
    const { performAgain } = await inquirer.prompt({
        type: 'list',
        name: 'performAgain',
        message: '\nDo you want to perform another countdown timer?',
        choices: ['yes', 'no'],
    });

    if (performAgain === 'yes') {
        startCountdownTimer();
    } else {
        console.log(chalk.bold.blue('Thank you for using the countdown timer!'));
    }
}

console.log(chalk.bold.red('\nWelcome to the countdown timer!\n'));
startCountdownTimer();