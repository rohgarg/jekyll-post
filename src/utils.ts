import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export const postSnippet: string =
`---
layout: $\{1:post\}
title: $\{2\}
date: YYYY
category: $\{3\}
author: $\{4\}
tags: [$\{5\}]
summary: $\{6\}
---

$\{7\}`;

var insertFrontMatter: boolean = false;

export function
shouldInsertFrontMatter(): boolean {
  return insertFrontMatter;
}

export function
setFrontMatter(flag: boolean): void {
  insertFrontMatter = flag;
}

export async function
createFile(dirName: string, newFileName: string): Promise<string> {
  let folders = vscode.workspace.workspaceFolders;
  if (folders === undefined || dirName === null || dirName === undefined) {
    return newFileName;
  }
  const templateName = '.post-template';
  const templatePath = path.resolve(folders[0].uri.fsPath, templateName);
  const fileName = path.resolve(dirName, newFileName);
  const templateExists: boolean = templatePath !== undefined &&
                                  fs.existsSync(templatePath);
  const fileExists: boolean = fs.existsSync(fileName);
  const frontMatter = templateExists ? 
    Buffer.from(replaceDate(fs.readFileSync(templatePath).toString('utf-8')), 'utf-8') : '';

  setFrontMatter(!fileExists && !templateExists);
  if (!fileExists) {
    fs.appendFileSync(fileName, frontMatter);
  }
  return fileName;
}

export async function
openFile(fileName: string): Promise<vscode.TextEditor> {
  const stats = fs.statSync(fileName);

  if (stats.isDirectory()) {
    throw new Error("This file is a directory!");
  }

  const doc = await vscode.workspace.openTextDocument(fileName);
  if (!doc) {
    throw new Error('Could not open file!');
  }

  const editor = vscode.window.showTextDocument(doc);
  if (!editor) {
    throw new Error('Could not show document!');
  }
  return editor;
}

export async function
getFileNameFromUser(): Promise<string> {
  const defaultFileName = "new-post.md";
  let question = `What's the name of the new post?`;

  let filePath = await vscode.window.showInputBox({
    prompt: question,
    value: defaultFileName,
  });
  if (filePath === null || filePath === undefined) {
    return defaultFileName;
  }
  return filePath || defaultFileName;
}

export function
getDateTime(): string {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var time = String(today.getHours()).padStart(2, '0') +
             ":" +
             String(today.getMinutes()).padStart(2, '0');
  return yyyy + '-' + mm + '-' + dd + ' ' + time;
}

export function 
replaceDate(data: string): string {
  var formattedString = data.replace(/date:.*$/m, function(match: string) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var hours = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');

    return match.replace(/YYYY/g, `${yyyy}`)
                .replace(/MM/g, mm)
                .replace(/DD/g, dd)
                .replace(/hh/g, hours)
                .replace(/mm/g, minutes);
  });

  return formattedString;
}


export function
addDateToFilename(fileName: string): string {
  if (fileName === null) {
    throw undefined;
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd + '-' + fileName;
}
