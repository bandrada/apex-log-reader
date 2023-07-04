// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as logManager from './log-manager';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('apex-log-reader.read-log', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		// vscode.window.showInformationMessage('Hello World from Apex Log Reader!');
		
		let output = vscode.window.createOutputChannel('Apex Log Reader');
		function errorHandler() {
			console.error('error');
		}

		function filterUserDebugStatement(statement: string) {
			return statement.slice(46);
		}

		let path = await logManager.selectPathExplorer();
		let fileContents = fs.readFileSync(path).toString();
		let statements = [];
		// fill statements
		let temp = '';
		for (let i = 0; i < fileContents.length; i++) {
			if (fileContents[i] === '\n') {
				statements.push(temp);
				temp = '';
			} else if (i === fileContents.length -1) {
				temp += fileContents[i];
				statements.push(temp);
			} else {
				temp += fileContents[i];
			}
		}
		output.show();
		for (let i = 0; i < statements.length; i++) {
			
			if (statements[i].includes('USER_DEBUG')) {
				output.appendLine(filterUserDebugStatement(statements[i]));
			}
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
