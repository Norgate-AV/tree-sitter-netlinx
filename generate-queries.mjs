#!/usr/bin/env node

import fs from "node:fs";
import snapi from "./snapi.js";
import g4api from "./g4api.js";
import unicodelib from "./unicodelib.js";
import StringBuilder from "string-builder";

const builder = new StringBuilder();

builder.clear();
builder.appendLine(";; Auto-generated SNAPI.axi built-ins");
builder.appendLine();
builder.appendLine(";; Functions");
builder.appendLine(`(call_expression
  function: (identifier) @function.builtin
  (#match? @function.builtin "(?i)^(${Object.keys(snapi.functions).join("|")})$"))`);
builder.appendLine();
builder.appendLine(";; Constants");
builder.appendLine(`(identifier) @constant.builtin
  (#match? @constant.builtin "(?i)^(${Object.keys(snapi.constants).join("|")})$")`);

fs.writeFileSync("./queries/highlights-snapi.scm", builder.toString());

builder.clear();
builder.appendLine(";; Auto-generated G4API.axi built-ins");
builder.appendLine();
builder.appendLine(";; Constants");
builder.appendLine(`(identifier) @constant.builtin
  (#match? @constant.builtin "(?i)^(${Object.keys(g4api.constants).join("|")})$")`);

fs.writeFileSync("./queries/highlights-g4api.scm", builder.toString());

builder.clear();
builder.appendLine(";; Auto-generated UnicodeLib.axi built-ins");
builder.appendLine();
builder.appendLine(";; Functions");
builder.appendLine(`(call_expression
  function: (identifier) @function.builtin
  (#match? @function.builtin "(?i)^(${Object.keys(unicodelib.functions).join("|")})$"))`);
builder.appendLine();
builder.appendLine(";; Constants");
builder.appendLine(`(identifier) @constant.builtin
  (#match? @constant.builtin "(?i)^(${Object.keys(unicodelib.constants).join("|")})$")`);
builder.appendLine();
builder.appendLine(";; Variables");
builder.appendLine(`(identifier) @variable.builtin
  (#match? @variable.builtin "(?i)^(${Object.keys(unicodelib.variables).join("|")})$")`);

fs.writeFileSync("./queries/highlights-unicodelib.scm", builder.toString());
