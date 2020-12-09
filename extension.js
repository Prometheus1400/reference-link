// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('"reference-link" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("reference-link.searchGoogle", async () => {
        // code here is run every time command is run

        var editor = vscode.window.activeTextEditor;
        var selection = editor.selection;
        var text = editor.document.getText(selection);

        if (!text) vscode.window.showErrorMessage("no text selected");
        else {
            let name = path.basename(vscode.window.activeTextEditor.document.fileName);
            let dotIndex = name.indexOf(".");
            let format = name.substr(dotIndex + 1);
            if (format == "h" || format == "hpp") format = "cpp";
            text = text + " " + format;
            let baseURL = "https://www.google.com/search?q=";
            let args = text.replace(/ /g, "+");
            let URL = baseURL + args;
            //vscode.window.showInformationMessage(URL);
            vscode.env.openExternal(URL);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
