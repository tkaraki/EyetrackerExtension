// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require("fs");
const path = require("path");


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ext1" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.ext1', 
	function () {
	
		const file = fs.createWriteStream('/Users/talak/test.json');
			

		vscode.languages.registerHoverProvider(["*"], {
			provideHover(document, position, token) {
				const hoveredWord = document.getText(document.getWordRangeAtPosition(position));
				const hoveredLine = document.lineAt(position);
				const hoveredPosition = hoveredWord.concat(', Char: ', position.character.toString() , ' Line: ', hoveredLine.lineNumber.toString());
				var ts = new Date();
				file.write(hoveredPosition.concat( ' at ', ts.toLocaleString() , '\n'));

				return new vscode.Hover(hoveredPosition);			
			}
		});
	
		vscode.window.showInformationMessage('My extension is now running...');
		}
	);

	context.subscriptions.push(disposable);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
