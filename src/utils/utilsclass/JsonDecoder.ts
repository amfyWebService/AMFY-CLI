import {iChangingValues} from "./iChangingValue"
import { Decoder, object, string } from "@mojotech/json-type-validation";
const fs = require("fs")

export const decoderValueTochange: Decoder<iChangingValues> = object({
    toReplace: string(),
    replacer : string()
})

