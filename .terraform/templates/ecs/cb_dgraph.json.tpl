[
  {
    "name": "zero",
    "image": "${app_image}",
    "cpu": ${fargate_cpu},
    "memory": ${fargate_memory},
    "networkMode": "awsvpc",
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${dgraph_name}-zero",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": 5080,
        "hostPort": 5080
      },
      {
        "containerPort": 6080,
        "hostPort": 6080
      }
    ],
    "command": [
      "dgraph",
      "zero",
      "--my=localhost:5080"
    ],
    "mountPoints": [
      {
        "containerPath": "${container_mount_path}",
        "sourceVolume": "${source_volume}",
        "readOnly": false
      }
    ]
  },
  {
    "name": "alpha",
    "image": "${app_image}",
    "cpu": ${fargate_cpu},
    "memory": ${fargate_memory},
    "networkMode": "awsvpc",
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${dgraph_name}-alpha",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": ${app_port},
        "hostPort": 8080
      },
      {
        "containerPort": 9080,
        "hostPort": 9080
      }
    ],
    "command": [
      "dgraph",
      "alpha",
      "--my=localhost:7080",
      "--zero=localhost:5080",
      "--security",
      "whitelist=0.0.0.0/0"
    ],
    "mountPoints": [
      {
        "containerPath": "${container_mount_path}",
        "sourceVolume": "${source_volume}",
        "readOnly": false
      }
    ]
  }  
]