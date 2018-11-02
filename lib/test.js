"use strict";
var re = new RegExp("^{{\\s* test\\s*\\}}");
console.log(re.test("{{ test     }}"));
