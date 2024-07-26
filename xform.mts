import {XForm} from 'trans-render/types';
import {Localizer} from 'trans-render/lib/mixins/types';
import {makeXtalElement} from 'be-importing/makeXtalElement.mjs';
import {Props, Methods} from './types';



export const xform: XForm<Props, Methods & Localizer> = {
    "% count": "localize",
    button: {
        m: {
            on: "click",
            inc: "count",
            byAmt: ".dataset.d"
        }
    }  
}

const propDefaults: Partial<Props> = {
    count: 30000
}

makeXtalElement(
    {
        xform,
        propDefaults
    }
    
)

