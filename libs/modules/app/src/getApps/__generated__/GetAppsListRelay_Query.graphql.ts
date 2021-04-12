/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GetAppsListRelay_QueryVariables = {};
export type GetAppsListRelay_QueryResponse = {
    readonly app_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"AppFragment_app">;
            };
        }>;
    };
};
export type GetAppsListRelay_Query = {
    readonly response: GetAppsListRelay_QueryResponse;
    readonly variables: GetAppsListRelay_QueryVariables;
};



/*
query GetAppsListRelay_Query {
  app_connection {
    edges {
      node {
        ...AppFragment_app
        id
      }
    }
  }
}

fragment AppFragment_app on app {
  id
  name
  pages {
    ...PageFragment_page
    id
  }
}

fragment PageFragment_page on page {
  id
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetAppsListRelay_Query",
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
                    "name": "AppFragment_app"
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
    "name": "GetAppsListRelay_Query",
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "page",
                    "kind": "LinkedField",
                    "name": "pages",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/)
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "305ec6091b5cff649af1acb0a2c8e225",
    "id": null,
    "metadata": {},
    "name": "GetAppsListRelay_Query",
    "operationKind": "query",
    "text": "query GetAppsListRelay_Query {\n  app_connection {\n    edges {\n      node {\n        ...AppFragment_app\n        id\n      }\n    }\n  }\n}\n\nfragment AppFragment_app on app {\n  id\n  name\n  pages {\n    ...PageFragment_page\n    id\n  }\n}\n\nfragment PageFragment_page on page {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = '629bbd7e71eee437fb3cd8fda04820d8';
export default node;
