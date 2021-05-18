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
        "name": "CODELAB_DGRAPH_GRAPHQL_ENDPOINT",
        "value": "http://127.0.0.1:8081/graphql"
      },
      {
        "name": "CODELAB_DGRAPH_ENDPOINT",
        "value": "http://127.0.0.1:8081"
      },
      {
        "name": "AWS_ACCESS_KEY_ID",
        "value": "cant-be-empty"
      },
      {
        "name": "AWS_SECRET_ACCESS_KEY",
        "value": "cant-be-empty"
      },
      {
        "name": "AWS_REGION",
        "value": "us-west-1"
      },
      {
        "name": "AWS_BUCKET_NAME",
        "value": "cant-be-empty"
      },
      {
        "name": "AUTH0_SECRET",
        "value": "cant-be-empty"
      },
      {
        "name": "AUTH0_BASE_URL",
        "value": "http://127.0.0.1:3000"
      },
      {
        "name": "AUTH0_ISSUER_BASE_URL",
        "value": "https://codelab-ai.us.auth0.com"
      },
      {
        "name": "AUTH0_CLIENT_ID",
        "value": "cant-be-empty"
      },
      {
        "name": "AUTH0_CLIENT_SECRET",
        "value": "cant-be-empty"
      },
      {
        "name": "AUTH0_AUDIENCE",
        "value": "https://api.codelab.ai"
      },
      {
        "name": "AUTH0_API_CLIENT_ID",
        "value": "cant-be-empty"
      },
      {
        "name": "AUTH0_API_CLIENT_SECRET",
        "value": "cant-be-empty"
      }
    ]
  }
]
