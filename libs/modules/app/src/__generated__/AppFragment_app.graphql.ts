/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppFragment_app = {
    readonly id: string;
    readonly name: string;
    readonly pages: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"PageFragment_page">;
    }>;
    readonly " $refType": "AppFragment_app";
};
export type AppFragment_app$data = AppFragment_app;
export type AppFragment_app$key = {
    readonly " $data"?: AppFragment_app$data;
    readonly " $fragmentRefs": FragmentRefs<"AppFragment_app">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppFragment_app",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "page",
      "kind": "LinkedField",
      "name": "pages",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PageFragment_page"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "app",
  "abstractKey": null
};
})();
(node as any).hash = 'a32aec2b8af920e5d10c111a49cf8186';
export default node;
