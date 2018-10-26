import {Decoder, object, string, optional, number, boolean} from '../../node_modules/@mojotech/json-type-validation'
import {iChangingValues} from "./iChangingValue"
const fs = require("fs")

export const decoderValueTochange: Decoder<iChangingValues> = object({
    toReplace: string(),
    replacer: string()
})

