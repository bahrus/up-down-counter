import { HTMLElement, makeXtalElement } from './makeXtalElement.mjs';
class MyCustomElement extends HTMLElement {
    doSomething() {
    }
}
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
makeXtalElement([MyCustomElement], {
    xform
});
