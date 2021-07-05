[
  {
    "name": "${app_name}-app",
    "image": "${app_image}",
    "cpu": ${fargate_cpu},
    "memory": ${fargate_memory},
    "networkMode": "awsvpc",
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${app_name}-app",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": ${app_port},
        "hostPort": ${app_port}
      }
    ],
    "environment": [
      {
        "name": "AWS_REGION",
        "value": "${aws_region}"
      },
      {
        "name": "NEXT_PUBLIC_API_ORIGIN",
        "value": "${public_origin}"
      },
      {
        "name": "CODELAB_API_ENDPOINT",
        "value": "${api_endpoint}"
      },
      {
        "name": "CODELAB_API_GRAPHQL_ENDPOINT",
        "value": "${api_graphql_endpoint}"
      },
      {
        "name": "CODELAB_API_PORT",
        "value": "${app_port}"
      }
    ],
    "entryPoint": [
      "sh",
      "scripts/startup.sh"
    ],
    "secrets": [   
      {
        "name": "CODELAB_DGRAPH_GRAPHQL_ENDPOINT",
        "valueFrom": "${dgraph_graphql_endpoint}"
      },
      {
        "name": "CODELAB_DGRAPH_ENDPOINT",
        "valueFrom": "${dgraph_endpoint}"
      },
      {
        "name": "CODELAB_DGRAPH_GRPC_ENDPOINT",
        "valueFrom": "${dgraph_grpc_endpoint}"
      },
      {
        "name": "AWS_ACCESS_KEY_ID",
        "valueFrom": "${aws_access_key}"
      },
      {
        "name": "AWS_SECRET_ACCESS_KEY",
        "valueFrom": "${aws_secret_key}"
      },
      {
        "name": "AWS_BUCKET_NAME",
        "valueFrom": "${aws_bucket}"
      },
      {
        "name": "AUTH0_SECRET",
        "valueFrom": "${auth0_secret}"
      },
      {
        "name": "AUTH0_BASE_URL",
        "valueFrom": "${auth0_baseurl}"
      },
      {
        "name": "AUTH0_ISSUER_BASE_URL",
        "valueFrom": "${auth0_issuer_baseurl}"
      },
      {
        "name": "AUTH0_CLIENT_ID",
        "valueFrom": "${auth0_client_id}"
      },
      {
        "name": "AUTH0_CLIENT_SECRET",
        "valueFrom": "${auth0_client_secret}"
      },
      {
        "name": "AUTH0_AUDIENCE",
        "valueFrom": "${auth0_audience}"
      },
      {
        "name": "AUTH0_API_CLIENT_ID",
        "valueFrom": "${auth0_api_client_id}"
      },
      {
        "name": "AUTH0_API_CLIENT_SECRET",
        "valueFrom": "${auth0_api_client_secret}"
      },
      {
        "name": "AUTH0_M2M_TOKEN",
        "valueFrom": "${auth0_m2m_token}"
      },
      {
        "name": "CYPRESS_AUTH0_USER",
        "valueFrom": "${cypress_auth0_user}"
      },
      {
        "name": "CYPRESS_AUTH0_PASSWORD",
        "valueFrom": "${cypress_auth0_password}"
      },
      {
        "name": "NX_CLOUD_AUTH_TOKEN",
        "valueFrom": "${nx_cloud_auth_token}"
      }
    ]
  }
]
