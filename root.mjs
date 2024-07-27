// @ts-check
import { makeXtalElement } from 'be-importing/makeXtalElement.mjs';
/** @import {Localizer} from "./node_modules/trans-render/lib/mixins/types" */
/** @import {XForm} from "./node_modules/trans-render/types" */
/** @import {Actions, Props} from "./types" */
/** @import {Actions as A} from './node_modules/trans-render/froop/types' */

const mainTemplate = String.raw `
<up-down-counter>
    <template shadowrootmode="open"><!--begin--><!--begin-->
        <style adopt>
            :host{
                display: block;
            }
            * {
              font-size: 200%;
            }
        
            span {
              width: 4rem;
              display: inline-block;
              text-align: center;
            }
        
            button {
              width: 4rem;
              height: 4rem;
              border: none;
              border-radius: 10px;
              background-color: seagreen;
              color: white;
            }
        </style>
        <button part=down data-d=-1>-</button><data part=count></data><button part=up data-d=1>+</button>
    <!--end--><!--end--></template>
</up-down-counter>
`;

/** @type {XForm<Props, Actions & Localizer>} */
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

/** @type {A<Props, Actions>} */
const actions = {
    onCount: {
        ifAllOf: ['count'],
    }
}


makeXtalElement({
    mainTemplate,
    xform,
    propDefaults,
    actions,
});