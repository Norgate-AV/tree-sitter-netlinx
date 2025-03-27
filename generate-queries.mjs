#!/usr/bin/env node

import fs from "node:fs";
import netlinx from "./netlinx.js";
import snapi from "./snapi.js";
import StringBuilder from "string-builder";

const builder = new StringBuilder();

builder.appendLine(";; Auto-generated NetLinx.axi built-ins");
builder.appendLine();
builder.appendLine(";; Functions");
builder.appendLine(`(call_expression
  function: (identifier) @function.builtin
  (#match? @function.builtin "(?i)^(${Object.keys(netlinx.functions).join("|")})$"))`);
builder.appendLine();
builder.appendLine(";; Constants");
builder.appendLine(`(identifier) @constant.builtin
  (#match? @constant.builtin "(?i)^(${Object.keys(netlinx.constants).join("|")})$")`);
builder.appendLine();
builder.appendLine(";; Variables");
builder.appendLine(`(identifier) @variable.builtin
  (#match? @variable.builtin "(?i)^(${Object.keys(netlinx.variables).join("|")})$")`);
builder.appendLine();
builder.appendLine(";; Types");
builder.appendLine(`(type_identifier) @type.builtin
  (#match? @type.builtin "(?i)^(${Object.keys(netlinx.types).join("|")})$")`);

fs.writeFileSync("./queries/highlights-netlinx.scm", builder.toString());

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
