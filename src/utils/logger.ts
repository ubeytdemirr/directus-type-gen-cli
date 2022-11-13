import chalk from "chalk";

export function chalkLogger() {
	return {
		log: (message: string) => console.log(chalk.green(message)),
		error: (message: string) => console.log(chalk.red(message)),
		warn: (message: string) => console.log(chalk.yellow(message)),
		info: (message: string) => console.log(chalk.blue(message)),
	};
}
