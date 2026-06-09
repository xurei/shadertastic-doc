#!/bin/bash

if [ -f /home/olivier/obs-plugins/obs-shadertastic/plugin/metadata_schema/src/meta.d.ts ]; then
  cp /home/olivier/obs-plugins/obs-shadertastic/plugin/metadata_schema/src/meta.d.ts .
else
  curl -o meta.d.ts "https://raw.githubusercontent.com/xurei/shadertastic/refs/heads/main/metadata_schema/src/meta.d.ts"
fi

yes | npx ts-json-schema-generator --markdown-description --validation-keywords shaderparam --validation-keywords shaderparams --validation-keywords example --validation-keywords default --path meta.d.ts --type meta > meta.json.schema.json --id meta.json

node scripts/jsonschema-to-doc.cjs

python3 -m mkdocs build
