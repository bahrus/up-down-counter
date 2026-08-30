// @ts-check
import {Mount} from 'trans-render/Mount.js';
/** @import {Methods, Props, Actions} from "../types" */

/**
 * @implements {Actions}
 */
export class Counter extends Mount {
    /**
     * 
     * @param {Props} self 
     */
    onCount(self){
        const {count} = self;
        console.log({count});
    }
}

customElements.define('counter-o', Counter);