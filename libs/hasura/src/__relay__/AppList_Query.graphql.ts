/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppList_QueryVariables = {};
export type AppList_QueryResponse = {
    readonly app_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"AppItem_app">;
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
    "name": "AppList_Query",
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
    "name": "AppList_Query",
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
    "cacheID": "5633da9344fe83c7f5d2f8a00056f884",
    "id": null,
    "metadata": {},
    "name": "AppList_Query",
    "operationKind": "query",
    "text": "query AppList_Query {\n  app_connection {\n    edges {\n      node {\n        ...AppItem_app\n        id\n      }\n    }\n  }\n}\n\nfragment AppItem_app on app {\n  id\n}\n"
  }
};
(node as any).hash = 'a6b56a4d658018623bea117a9ab2928a';
export default node;
