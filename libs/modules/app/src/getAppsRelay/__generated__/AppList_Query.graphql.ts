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
                readonly " $fragmentRefs": FragmentRefs<"AppFragment_app">;
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
    "cacheID": "da27761c0c8a1cfce607355433f67c63",
    "id": null,
    "metadata": {},
    "name": "AppList_Query",
    "operationKind": "query",
    "text": "query AppList_Query {\n  app_connection {\n    edges {\n      node {\n        ...AppFragment_app\n        id\n      }\n    }\n  }\n}\n\nfragment AppFragment_app on app {\n  id\n  name\n  pages {\n    ...PageFragment_page\n    id\n  }\n}\n\nfragment PageFragment_page on page {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = '8c9d04cbd97169cf20e61169c1d22646';
export default node;
