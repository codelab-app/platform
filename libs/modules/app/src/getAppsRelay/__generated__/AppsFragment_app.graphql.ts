/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppsFragment_app = ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly " $refType": "AppsFragment_app";
}>;
export type AppsFragment_app$data = AppsFragment_app;
export type AppsFragment_app$key = ReadonlyArray<{
    readonly " $data"?: AppsFragment_app$data;
    readonly " $fragmentRefs": FragmentRefs<"AppsFragment_app">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "AppsFragment_app",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "app",
  "abstractKey": null
};
(node as any).hash = '7f14ac94c2ee3d1e75080524d376e2de';
export default node;
