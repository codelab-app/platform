/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type appsPage_QueryVariables = {};
export type appsPage_QueryResponse = {
    readonly app_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"AppItem_app">;
            };
        }>;
    };
};
export type appsPage_Query = {
    readonly response: appsPage_QueryResponse;
    readonly variables: appsPage_QueryVariables;
};



/*
query appsPage_Query {
  app_connection {
    edges {
      node {
        ...AppItem_app
        id
      }
    }
  }
}

fragment AppItem_app on app {
  id
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "appsPage_Query",
    "selections": [
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AppItem_app"
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
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "appsPage_Query",
    "selections": [
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
    ]
  },
  "params": {
    "cacheID": "dea6a9c2ce92b01f72c5cf8e0c7ccffa",
    "id": null,
    "metadata": {},
    "name": "appsPage_Query",
    "operationKind": "query",
    "text": "query appsPage_Query {\n  app_connection {\n    edges {\n      node {\n        ...AppItem_app\n        id\n      }\n    }\n  }\n}\n\nfragment AppItem_app on app {\n  id\n}\n"
  }
};
(node as any).hash = 'c8c5e1c0e23346b56ddc3f85dc10a408';
export default node;
