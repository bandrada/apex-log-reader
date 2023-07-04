import * as vscode from 'vscode';
import * as fs from 'fs';
// locate the log file
// if there are multiple logs, show a dropdown with the files to select
// otherwise these should be kept track of
// if it cannot be found show file explorer
// may want custom commands for manually doing these individual steps

function findLog() : string {

    return '';
}

function selectPathDropdown(): string {
    return '';
}

async function selectPathExplorer() {
    let response = await vscode.window.showOpenDialog();
    let path = '';
    if (response) {
        path = response[0].path;
    } else {
        console.error('Unable to Read File');
    }
    return path;
}

function addLogToTracked(path: string) {

}

export { selectPathExplorer };