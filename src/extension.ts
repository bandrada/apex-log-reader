// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('apex-log-reader.read-log', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		// vscode.window.showInformationMessage('Hello World from Apex Log Reader!');
		
		let output = vscode.window.createOutputChannel('Apex Log Reader');
		let path = '';
		function errorHandler() {
			console.error('error');
		}
		vscode.window.showOpenDialog().then(function(response) {
			if (response) {
				path = response[0].path;
			} else {
				console.error('Unable to Read File');
			}
			let fileContents = fs.readFileSync(path).toString();
			let statements = [];
			let lineBreaks = 0;

			//count line breaks
			// fill statements
			let temp = '';
			for (let i = 0; i < fileContents.length; i++) {
				if (fileContents[i] === '\n') {
					lineBreaks++;
					statements.push(temp);
					temp = '';
				} else if (i === fileContents.length -1) {
					lineBreaks++;
					temp += fileContents[i];
					statements.push(temp);
				} else {
					temp += fileContents[i];
				}
			}
			console.log(lineBreaks);
			console.log(statements);

			output.show();
			for (let i = 0; i < statements.length; i++) {
				output.appendLine(statements[i]);
			}
		});

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
