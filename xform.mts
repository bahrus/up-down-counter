import {XForm} from 'trans-render/types';
import {Localizer} from 'trans-render/lib/mixins/types';

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

console.log(JSON.stringify(xform, undefined, 3));

