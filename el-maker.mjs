//@ts-check

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

import { akaMethods as m } from 'assign-gingerly/DX/emojis.js';
import { paths, doAssign, set, smoothOver, assign } from 'assign-gingerly/DX/paths.js';

/** @import {AP, RuntimeProps, Actions} from './types'; */
/** @import {RoundaboutOptions} from './types/roundabout/types' */
/** @import {ElMakerConfig} from './types/el-maker/types' */
/** @import {AttrPatterns} from './types/assign-gingerly/types' */

/**
 * This makes refactoring easier.  Centralize the manual 
 * correction to one place.
 * @type {{ [K in keyof AP]: K }}
 */
const props = {
    clone: 'clone',
    count: 'count',
    countData: 'countData',
    downButton: 'downButton',
    name: 'name',
    upButton: 'upButton',
    value: 'value'
};

const withMethods = [m['🔍'], m['🧺'], m['🌐']];

const $ = (/** @type {typeof paths<RuntimeProps>} */ (/** @type {any} */(paths)))({ withMethods });

/**
 * Reactive wiring for <up-down-counter>.
 *
 * templateMaker adopts the declarative shadow root and exposes it as `clone`.
 * The first merge resolves the two buttons and the display element out of that
 * clone. The compacts then attach click listeners that bump `count`. The second
 * merge pushes `count` into the display element and into `value` (which faceUp
 * forwards to ElementInternals.setFormValue).
 *
 * @type {RoundaboutOptions<AP, Actions, AP, 'click' | 'keydown'>}
 */
const raConfig = {
    weakRef: {
        properties: ['upButton', 'downButton', 'countData'],
        logIfCollected: 'warn',
    },
    assignOptions: {
        akaMethods: {
            '🔍': m['🔍'],
            '🌐': m['🌐'],

        },
    },
    compacts: {
        on_click_of_upButton_inc_count_by: 1,
        on_click_of_downButton_inc_count_by: -1,
    },
    merges: [
        {
            ifKeyIn: ['clone'],
            assign: {
                '?.upButton': '?.clone?.🔍?.[part=up]',
                '?.downButton': '?.clone?.🔍?.[part=down]',
                '?.countData': '?.clone?.🔍?.[part=count]',
            },
        },
        {
            ifKeyIn: ['count'],
            assign: {
                // Legacy `"% count": "localize"` equivalent: `toLocaleString`
                // is registered in withMethods, so as the trailing path segment
                // it's called with no args and its return value is used.
                // See NewHTMLFirstCustomElement.md "display a number with local formatting".
                '?.countData?.textContent': '?.count?.toLocaleString',
                value: '?.count',
            },
        },
    ],
    defaultPropVals: {
        count: 30000,
        name: '',
    },
};

/**
 * Attribute -> property sourcing handled by truthSourcer.
 *
 * @type {AttrPatterns<AP>}
 */
const withAttrs = {
    count: 'count',
    _count: {
        instanceOf: 'Number',
        valIfNull: 30000,
        sourceOfTruth: true,
    },
    name: 'name',
};

/** @type {ElMakerConfig<AP>} */
const features = {
    assignFeatures: {
        // faceUp: {
        //     customData: {
        //         integrateWithRoundabout: true,
        //     },
        // },
        // truthSourcer: {},
        roundabout: {
            customData: {
                raConfig,
            },
            withAttrs,
        },
        templateMaker: {},
    },
};

export function render() {
    return JSON.stringify(features, null, 4);
}

const __filename = fileURLToPath(import.meta.url);
const outputFile = __filename.replace(/\.mjs$/, '.json');
writeFileSync(outputFile, render(), 'utf8');
