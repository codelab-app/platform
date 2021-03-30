/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type appsQueryVariables = {};
export type appsQueryResponse = {
    readonly app_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
            };
        }>;
    };
};
export type appsQuery = {
    readonly response: appsQueryResponse;
    readonly variables: appsQueryVariables;
};



/*
query appsQuery {
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
    "name": "appsQuery",
    "selections": (v0/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "appsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "efa5837a3df12a76139be23c21fa6aca",
    "id": null,
    "metadata": {},
    "name": "appsQuery",
    "operationKind": "query",
    "text": "query appsQuery {\n  app_connection {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '438d8052718d043dcc8635eb2d60857a';
export default node;
