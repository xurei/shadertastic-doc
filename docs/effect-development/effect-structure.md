## meta.json
This is the definition of the effect. 
It provides all the information for Shadertastic to understand how to use it 
and what [parameters](param/overview.md) it requires. 

A typical meta.json file looks like this:
```json
{
  "label": "Gaussian Blur",
  "revision": 1,
  "steps": 2,
  "input_time": false,
  "parameters": [
    {
      "name": "blur_level_x",
      "label": "Blur level (X)",
      "type": "int",
      "slider": true,
      "min": 0,
      "max": 100,
      "default": 10
    },
    {
      "name": "blur_level_y",
      "label": "Blur level (Y)",
      "type": "int",
      "slider": true,
      "min": 0,
      "max": 100,
      "default": 10
    }
  ]
}
```
### Fields Reference
#### label
This is a human-readable name or title for the effect or function being described.  
It specifies the name of the effect, which in this case is "Gaussian Blur".

#### revision
An integer that indicates the version or revision number for this effect definition.  
It tracks the version of the definition. 
This is useful for maintaining and updating the configuration over time, ensuring compatibility and tracking changes.

#### steps
Indicates the number of times (a.k.a. passes) the shader will be applied.
(Mettre un lien vers un exemple de shader multi pass, typiquement le flou gaussien ?)

#### input_time
For filters only. This field indicates that the filter is changing over time. 

#### parameters
An array containing the details of each parameter defined for the effect.

Each object within the array defines a parameter. See [parameter overview](param/overview.md) 
and the matching parameter page for details of each parameter type. 

## main.hlsl
This is the pixel shader code. 
It is written in the [OBS Shading Language](shader-syntax.md), which is a subset of HLSL and GLSL.

By default, all shaders receive a pre-defined list of parameters. 
This differs between [transitions](effect-transition-reference.md) and [filters](effect-filter-reference.md).

See [Getting Started](getting-started.md) for examples of shader code.
