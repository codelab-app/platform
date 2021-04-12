/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PageFragment_page = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "PageFragment_page";
};
export type PageFragment_page$data = PageFragment_page;
export type PageFragment_page$key = {
    readonly " $data"?: PageFragment_page$data;
    readonly " $fragmentRefs": FragmentRefs<"PageFragment_page">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PageFragment_page",
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
  "type": "page",
  "abstractKey": null
};
(node as any).hash = '85f46a0343048bac7c5ef1b53b571914';
export default node;
