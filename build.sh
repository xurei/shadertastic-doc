#!/bin/bash

curl -o meta.d.ts "https://raw.githubusercontent.com/xurei/shadertastic/refs/heads/main/metadata_schema/src/meta.d.ts"

yes | npx ts-json-schema-generator --markdown-description --validation-keywords shaderparam --validation-keywords default --path meta.d.ts --type meta > meta.json.schema.json --id meta.json

node scripts/jsonschema-to-doc.cjs

python3 -m mkdocs build
