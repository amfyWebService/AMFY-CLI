import {iChangingValues} from "./iChangingValue"

export class ChangingValue implements iChangingValues
{
     toReplace: string 
     replacer: string
     constructor(pToreplace: string , pReplacer: string)
     {
         this.toReplace = pToreplace
         this.replacer = pReplacer
     }
} 