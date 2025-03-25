#!/usr/bin/env node

import fs from "node:fs";
import netlinx from "./netlinx.js";

const { constants, types, variables, functions } = netlinx;

let queryContent = `;; Auto-generated NetLinx.axi built-ins highlighting

;; Functions
`;

queryContent += `(call_expression
  function: (identifier) @function.builtin
  (#match? @function.builtin "(?i)^(${Object.keys(functions).join("|")})$"))

;; Constants
(identifier) @constant.builtin
  (#match? @constant.builtin "(?i)^(${Object.keys(constants).join("|")})$")

;; Variables
(identifier) @variable.builtin
  (#match? @variable.builtin "(?i)^(${Object.keys(variables).join("|")})$")

;; Types
(type_identifier) @type.builtin
  (#match? @type.builtin "(?i)^(${Object.keys(types).join("|")})$")
`;

fs.writeFileSync("./queries/highlights-netlinx.scm", queryContent);
