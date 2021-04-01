/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AppList_QueryVariables = {};
export type AppList_QueryResponse = {
    readonly app_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
            };
        }>;
    };
};
export type AppList_Query = {
    readonly response: AppList_QueryResponse;
    readonly variables: AppList_QueryVariables;
};



/*
query AppList_Query {
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
    "name": "AppList_Query",
    "selections": (v0/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppList_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "02423c7f703e45a520cae74c4c412413",
    "id": null,
    "metadata": {},
    "name": "AppList_Query",
    "operationKind": "query",
    "text": "query AppList_Query {\n  app_connection {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b3a527287f8bbd8116bb8f55bf128d51';
export default node;
