const fs = require('fs');

const metafile = fs.existsSync(`${__dirname}/../meta.json.schema.local.json`) ? 'meta.json.schema.local.json' : 'meta.json.schema.json';

const jsonschema = JSON.parse(fs.readFileSync(`${__dirname}/../${metafile}`));

console.log(`Using ${metafile}`);

const doc_dir = `${__dirname}/../docs/effect-development/param`;

if (!fs.existsSync(doc_dir)){
	fs.mkdirSync(doc_dir);
}

const params = Object.entries(jsonschema.definitions).filter(([key, meta]) => {
	return key.startsWith('param_');
});


function parseParam(param_name, param_schema) {
	param_name = param_name.substr('param_'.length);
	const out = [];
	
	//language=markdown
	out.push(`
# ${param_name}

${param_schema.markdownDescription.split('\n')[0]}

## Description

${param_schema.markdownDescription.split('\n').slice(1).join('\n')}

## Shader Equivalent

\`\`\`hlsl
${param_schema.shaderparam} parameter_name;
\`\`\`

## Properties
${jsonSchemaToMarkdownTable(param_schema)}
	`);
	
	return out.join('\n');
}

// Attributes
/**
 * Transforms a JSON schema to a Markdown table string
 * @param {Object} schema - The JSON schema to transform
 * @return {string} - The Markdown table representation
 */
function jsonSchemaToMarkdownTable(schema) {
	const requiredList = schema.required;
	// Table header
	let markdownTable =
		'| <div style="width: 6.5em">Property</div> | Type | Required | If absent | Description |\n' +
		'|------------------------------------------|------|----------|-----------|-------------|\n';
	
	props = Object.entries(schema.properties).map(([propName, prop]) => {
		return [
			propName,
			{
				...prop,
				required: requiredList.findIndex(k => k===propName)
			}
		];
	});
	props.sort((a,b) => {
		if (a[1].required === b[1].required) {
			return a[0].localeCompare(b[0]);
		}
		else {
			return b[1].required - a[1].required;
		}
	})
	
	// Process each property in the schema
	for (const [propName, propSchema] of props) {
		// Determine the type
		const type = getSchemaType(propSchema);
		
		// Determine if required (in this implementation we'll infer from the schema)
		// In real JSON Schema, required properties are typically defined at the parent level
		const required = requiredList.findIndex(k => k===propName) >= 0 ? 'Yes' : 'No';
		
		// Default value if not provided
		const ifAbsent = propSchema.default !== undefined ?
			`\`${JSON.stringify(propSchema.default)}\`` : '-';
		
		// Get description
		const description = propSchema.description || propSchema.markdownDescription || '-';
		
		// Add the row to the table
		markdownTable += `| \`${propName}\` | ${type} | ${required} | ${ifAbsent} | ${description} |\n`;
	}
	
	return markdownTable;
}

/**
 * Helper function to determine the type from a JSON schema property
 * @param {Object} propSchema - The schema for a single property
 * @return {string} - The type as a string
 */
function getSchemaType(propSchema) {
	if (propSchema.const) {
		return `\`"${propSchema.const}"\``;
	}
	
	if (propSchema.type === 'array') {
		if (propSchema.items) {
			const itemType = propSchema.items.type || 'any';
			return `array of ${itemType}`;
		}
		return 'array';
	}
	
	if (propSchema.enum) {
		return `enum (${propSchema.type})`;
	}
	
	return propSchema.type || 'any';
}

for (const param of params) {
	const param_name = param[0].substr('param_'.length);
	const param_doc = parseParam(param[0], param[1]);
	fs.writeFileSync(`${doc_dir}/${param_name}.md`, param_doc)
}

// console.log(jsonschema.definitions['param_audiolevel']);

console.log();

// console.log(params);
