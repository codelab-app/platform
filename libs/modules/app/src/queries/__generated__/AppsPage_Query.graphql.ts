/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AppsPage_QueryVariables = {};
export type AppsPage_QueryResponse = {
    readonly app_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
            };
        }>;
    };
};
export type AppsPage_Query = {
    readonly response: AppsPage_QueryResponse;
    readonly variables: AppsPage_QueryVariables;
};



/*
query AppsPage_Query {
  app_connection {
    edges {
      node {
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "appConnection",
    "kind": "LinkedField",
    "name": "app_connection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "appEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "app",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppsPage_Query",
    "selections": (v0/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppsPage_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d5ea2173875199078e3415394028ebe9",
    "id": null,
    "metadata": {},
    "name": "AppsPage_Query",
    "operationKind": "query",
    "text": "query AppsPage_Query {\n  app_connection {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '51e7baf98acf34e4d483aa584d14810f';
export default node;
