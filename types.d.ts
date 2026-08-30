/**
 * Properties that make up the public API of <up-down-counter>.
 */
export interface EndUserProps {
    /**
     * The current count. Reflected to/from the `count` attribute and
     * submitted as the element's form value.
     */
    count: number;
    /**
     * The form control name used when the element participates in a form.
     */
    name: string;
}

/**
 * Full property set, including internal state managed by roundabout /
 * templateMaker / faceUp.
 */
export interface AllProps extends EndUserProps {
    /**
     * The live shadow-DOM fragment handed over by templateMaker once the
     * declarative shadow root has been adopted.
     */
    clone: DocumentFragment | ShadowRoot | null;
    /** The "+" button (`[part=up]`) inside the shadow DOM. */
    upButton: HTMLButtonElement;
    /** The "-" button (`[part=down]`) inside the shadow DOM. */
    downButton: HTMLButtonElement;
    /** The `<data part=count>` element that displays the count. */
    countData: HTMLElement;
    /**
     * Mirror of `count`, kept in sync so faceUp can push it through
     * `ElementInternals.setFormValue`.
     */
    value: number;
}

export type AP = AllProps;

export interface RuntimeProps extends AllProps, HTMLElement {}

export type PAP = Partial<AP>;

/**
 * No imperative actions are required — every behaviour is expressed
 * declaratively in el-maker.json.
 */
export interface Actions {}
