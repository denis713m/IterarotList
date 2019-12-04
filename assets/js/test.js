'use strict'

import object from './index.js'

console.log(object);
object[Symbol.for("id")] = "uhh";
console.log(object);