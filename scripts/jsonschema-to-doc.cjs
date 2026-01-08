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

${param_schema.markdownDescription.split('\n').slice(1).join('\n')}

## Shader Equivalent

\`\`\`hlsl
${param_schema.shaderparam.relaceAll(/`/g, '')} parameter_name;
\`\`\`
`);
	
	if (param_schema.example) {
	//language=markdown
	out.push(`
## Example

${/*param_schema.example.replace(/^```/g, '```json\n').replace(/```$/g, '\n```')*/''}
\`\`\`json
${JSON.stringify(JSON.parse(param_schema.example.replace(/```/g, '')), null, '  ')}
\`\`\`
	`);
	}
	
	//language=markdown
	out.push(`
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
	// Table header
	let markdownTable =
		'| <div style="width: 7.5em">Property</div> | Type | Required | If absent | Description |\n' +
		'|------------------------------------------|------|----------|-----------|-------------|\n';
	
	const lines = [];
	addMarkdownTableLines(schema, [], lines);
	return markdownTable + lines.join('\n');
}

function addMarkdownTableLines(schema, prefix, /* Array */ lines) {
	const requiredList = schema.required || [];
	console.log(schema);
	console.log(schema.required, requiredList);
	const props = Object.entries(schema.properties).map(([propName, prop]) => {
		return [
			propName,
			{
				...prop,
				isRequired: requiredList.findIndex(k => k===propName) > -1
			}
		];
	});
	props.sort((a,b) => {
		if (a[1].isRequired === b[1].isRequired) {
			return a[0].localeCompare(b[0]);
		}
		else {
			return b[1].isRequired - a[1].isRequired;
		}
	});
	
	// Process each property in the schema
	for (const [propName, propSchema] of props) {
		// Determine the type
		const type = getSchemaType(propSchema);
		
		// Determine if required (in this implementation we'll infer from the schema)
		// In real JSON Schema, required properties are typically defined at the parent level
		const isRequired = requiredList.findIndex(k => k===propName) >= 0 ? 'Yes' : 'No';
		
		// Default value if not provided
		const ifAbsent = propSchema.default !== undefined ?
			`\`${JSON.stringify(propSchema.default)}\`` : '-';
		
		// Get description
		let description = propSchema.description || propSchema.markdownDescription || '-';
		description = description.replaceAll(/\n/g, '<br>');
		
		const fullName = [...prefix, propName];
		// Add the row to the table
		lines.push(`| \`${fullName.join('.')}\` | ${type} | ${isRequired} | ${ifAbsent} | ${description} |`);
		
		console.log(propSchema.properties);
		
		// Recurse in options
		if (propSchema.properties && Object.keys(propSchema.properties).length > 0) {
			addMarkdownTableLines(propSchema, fullName, lines);
		}
	}
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
