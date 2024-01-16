import {XForm} from 'trans-render/types';
import {Localizer} from 'trans-render/lib/mixins/types';
import {HTMLElement, makeXtalElement} from './makeXtalElement.mjs';

export interface Props{
    count: number
}

export interface Methods{

}


class MyCustomElement extends HTMLElement{
    doSomething(){

    }
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

makeXtalElement(
    [MyCustomElement],
    {
        xform
    }
)

