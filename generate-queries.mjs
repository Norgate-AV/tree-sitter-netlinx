#!/usr/bin/env node

import fs from "node:fs";
import netlinx from "./netlinx.js";
import StringBuilder from "string-builder";

const { constants, types, variables, functions } = netlinx;

const builder = new StringBuilder();

builder.appendLine(";; Auto-generated NetLinx.axi built-ins");
builder.appendLine();
builder.appendLine(";; Functions");
builder.appendLine(`(call_expression
  function: (identifier) @function.builtin
  (#match? @function.builtin "(?i)^(${Object.keys(functions).join("|")})$"))`);
builder.appendLine();
builder.appendLine(";; Constants");
builder.appendLine(`(identifier) @constant.builtin
  (#match? @constant.builtin "(?i)^(${Object.keys(constants).join("|")})$")`);
builder.appendLine();
builder.appendLine(";; Variables");
builder.appendLine(`(identifier) @variable.builtin
  (#match? @variable.builtin "(?i)^(${Object.keys(variables).join("|")})$")`);
builder.appendLine();
builder.appendLine(";; Types");
builder.appendLine(`(type_identifier) @type.builtin
  (#match? @type.builtin "(?i)^(${Object.keys(types).join("|")})$")`);

fs.writeFileSync("./queries/highlights-netlinx.scm", builder.toString());
