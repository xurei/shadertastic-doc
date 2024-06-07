#!/bin/bash

docker build . -t shadertastic-docs

# To create the boilerplate:
# docker run --rm -it --user $(id -u):$(id -g) -v ${PWD}:/docs shadertastic-docs new .

# To serve the site
docker run --rm -it --user $(id -u):$(id -g) -p 8000:8000 -v ${PWD}:/docs shadertastic-docs
