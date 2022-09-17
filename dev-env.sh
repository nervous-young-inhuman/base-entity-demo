#!/usr/bin/env bash
set -eu

DEV_ENV_REBUILD="${DEV_ENV_REBUILD-true}"
dc() {
  docker-compose -f ./docker/docker-compose.yml "$@"
}
alias dc="dev_env_dc"

if [[ -n "$DEV_ENV_REBUILD" ]]
then
  dc up --build --detach api
  export DEV_ENV_REBUILD=""
fi

export -f dc
bash
