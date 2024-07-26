// @ts-check
import { makeXtalElement } from 'be-importing/makeXtalElement.mjs';
/** @import {Localizer} from "./node_modules/trans-render/lib/mixins/types.d.ts" */
/** @import {XForm} from "./node_modules/trans-render/types.d.ts" */
/** @import {Methods, Props} from "./types.d.ts" */

/** @type {XForm<Props, Methods & Localizer>} */
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
/** @type {Partial<Props>} */
const propDefaults = {
    count: 30000
};
makeXtalElement({
    xform,
    propDefaults
});