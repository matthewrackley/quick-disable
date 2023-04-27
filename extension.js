"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function toggleExtension(extensionId) {
    if (!extensionId) {
        extensionId = lastExtensionId;
    }
    const extension = vscode.extensions.getExtension(extensionId);
    if (extension) {
        if (extension.isActive) {
            vscode.commands.executeCommand('workbench.extensions.disableExtension', extensionId);
            vscode.window.showInformationMessage(`Extension ${extensionId} disabled!`);
        }
        else {
            vscode.commands.executeCommand('workbench.extensions.enableExtension', extensionId);
            vscode.window.showInformationMessage(`Extension ${extensionId} enabled!`);
        }
        var lastExtensionId = extensionId;
    }
    ;
}
;
function selectExtension() {
    const extensions = vscode.extensions.all.sort((a, b) => {
        return b.lastActivationTime.getTime() - a.lastActivationTime.getTime();
    });
    const extensionNames = extensions.map(extension => extension.displayName);
    vscode.window.showQuickPick(extensionNames, {
        placeHolder: 'Select an extension to toggle'
    }).then(selectedName => {
        if (selectedName) {
            const selectedExtension = extensions.find(extension => extension.displayName === selectedName);
            if (selectedExtension) {
                const extensionId = selectedExtension.id;
                toggleExtension(extensionId);
            }
            ;
        }
        ;
    });
}
;
if (extensionId === undefined) {
    selectExtension();
}
;
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('marack.quickdisable.toggleExtension', toggleExtension));
    context.subscriptions.push(vscode.commands.registerCommand('marack.quickdisable.selectExtension', selectExtension));
    context.subscriptions.push(vscode.commands.registerKeybinding({
        command: 'marack.quickdisable.toggleExtension',
        key: 'Function+-',
    }));
    context.subscriptions.push(vscode.commands.registerKeybinding({
        command: 'marack.quickdisable.selectExtension',
        key: 'Function+F9',
    }));
}
exports.activate = activate;
;
//# sourceMappingURL=extension.js.map