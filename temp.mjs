// @ts-check
import { makeXtalElement } from 'be-importing/makeXtalElement.mjs';
/** @import {XForm} from "./node_modules/trans-render/types.d.ts" **/

/** @type {XForm} */
export const xform = {
    "% count": "localize",
    button: {
        m: {
            on: "click",
            inc: "count",
            byAmt: ".dataset.d"
        }
    }
};
const propDefaults = {
    count: 30000
};
makeXtalElement({
    xform,
    propDefaults
});
