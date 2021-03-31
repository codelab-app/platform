/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppItem_app = {
    readonly id: string;
    readonly " $refType": "AppItem_app";
};
export type AppItem_app$data = AppItem_app;
export type AppItem_app$key = {
    readonly " $data"?: AppItem_app$data;
    readonly " $fragmentRefs": FragmentRefs<"AppItem_app">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppItem_app",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "app",
  "abstractKey": null
};
(node as any).hash = '9e2dbffab64506e1b2169764aae95e06';
export default node;
