"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_type_validation_1 = require("@mojotech/json-type-validation");
const fs = require("fs");
exports.decoderValueTochange = json_type_validation_1.object({
    toReplace: json_type_validation_1.string(),
    replacer: json_type_validation_1.string()
});
