import { makeXtalElement } from './be-importing/makeXtalElement.mjs';
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
    count: 30
};
makeXtalElement({
    xform,
    propDefaults
});
