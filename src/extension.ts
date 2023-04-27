import * as vscode from 'vscode';

let lastExtensionId: string;

function toggleExtension(extensionId?: string) {
    extensionId = extensionId || lastExtensionId;

    const extension = vscode.extensions.getExtension(extensionId);

    if (extension) {
        if (extension.isActive) {
            vscode.commands.executeCommand('workbench.extensions.disableExtension', extensionId);
            vscode.window.showInformationMessage(`Extension ${extensionId} disabled!`);
        } else {
            vscode.commands.executeCommand('workbench.extensions.enableExtension', extensionId);
            vscode.window.showInformationMessage(`Extension ${extensionId} enabled!`);
        }
        lastExtensionId = extensionId;
    };
};

function selectExtension() {
    const extensions = Array.from(vscode.extensions.all);
    extensions.sort((a, b) => {
        const aTime = (a as any).packageJSON.activationEvents.includes('onLanguage:typescript') ? 1 : 0;
        const bTime = (b as any).packageJSON.activationEvents.includes('onLanguage:typescript') ? 1 : 0;
        return bTime - aTime;
    });
    const extensionNames = extensions.map(extension => (extension as any).packageJSON.displayName);



    vscode.window.showQuickPick(extensionNames, {
        placeHolder: 'Select an extension to toggle'
    }).then(selectedName => {
        if (selectedName) {
            const selectedExtension = extensions.find(extension => (extension as any).packageJSON.displayName === selectedName);
            if (selectedExtension) {
                const extensionId = selectedExtension.id;
                toggleExtension(extensionId);
            };
        };
    });
};



export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('marack.quickdisable.toggleExtension', toggleExtension)

    );
    context.subscriptions.push(
        vscode.commands.registerCommand('marack.quickdisable.selectExtension', selectExtension)
    );
};
