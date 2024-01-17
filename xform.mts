import {XForm} from 'trans-render/types';
import {Localizer} from 'trans-render/lib/mixins/types';
import {HTMLElement, makeXtalElement} from './be-importing/makeXtalElement.mjs';

export interface Props{
    count: number
}

export interface Methods{

}


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
    count: 30
}

makeXtalElement(
    {
        xform,
        propDefaults
    }
    
)

