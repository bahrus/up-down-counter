import {XtalElementEndUserProps} from 'xtal-element/types';
export class HTMLElement{}

export function makeXtalElement<Props, Methods>(
    scripts: Array<any>,

    xtalElementProps: XtalElementEndUserProps<Props, Methods>
){
    console.log(String.raw `<template onload=blow-dry-to-head><script type=module>
${scripts.map(x => x.toString() + '\n\r').join('\n\r')};
</script></template>
`);
    console.log('<xtal-element');
    const {
        superclass, 
        propDefaults, 
        xform, 
        aka, 
        actions, 
        beFormAssociated,
        inferProps,
        propInferenceCriteria,
        propInfo,
        shadowRootMode,
        targetScope
    } = xtalElementProps;
    if(superclass) console.log(`superclass=${superclass}`);
    if(propDefaults){
        console.log(`prop-defaults='${JSON.stringify(propDefaults, undefined, 3)}'`)
    }
    console.log('></xtal-element');
}