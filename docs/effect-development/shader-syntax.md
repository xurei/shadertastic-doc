# OBS Shading Language (OBS-SL)

*(Original source: [obs-StreamFX documentation](https://github.com/Xaymar/obs-StreamFX/wiki/OBS-Shading-Language) under [CC BY](https://creativecommons.org/licenses/by/4.0/))* 

The baseline for the shader language libOBS uses is HLSL, [for which you can find documentation here](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl). 
libOBS modifies this so it works across all of its supported graphics APIs, sacrificing functionality and versatility for compatibility. 
As a result, some effects that would be possible with ease in GLSL or HLSL directly do not work in libOBS's shader language. 
For the sake of all future documentation, the language will be referred to as OBS-SL, since it mixes and matches many different language constructs into one.

## Defines
OBS Studio includes a Pre-Processor that adds some defines.

##### `_D3D11`
Defined if `libobs-d3d11` is in use.

##### `_OPENGL`
Defined if `libobs-opengl` is in use.

## Data Storage
Similar to HLSL, OBS-SL supports storage, transfer and modification of data.

### Storage Specifiers
Storage specifiers seem to only be used by the OpenGL backend.

| Name      | DirectX | OpenGL    | Notes |
|-----------|---------|-----------|-------|
| `uniform` |         | `uniform` |       |
| `const`   |         | `const`   |       |
| `inout`   |         | `inout`   |       |
| `out`     |         | `out`     |       |

### Types
| Name            | DirectX        | OpenGL          |
|-----------------|----------------|-----------------|
| `bool`          | `bool`         | `bool`          |
| `float`         | `float`        | `float`         |
| `float2`        | `float2`       | `vec2`          |
| `float3`        | `float3`       | `vec3`          |
| `float4`        | `float4`       | `vec4`          |
| `int`           | `int`          | `int`           |
| `int2`          | `int2`         | `ivec2`         |
| `int3`          | `int3`         | `ivec3`         |
| `int4`          | `int4`         | `ivec4`         |
| `string`        | `string`       | `string`        |
| `float3x3`      | `float3x3`     | `mat3x3`        |
| `float3x4`      | `float3x4`     | `mat3x4`        |
| `float4x4`      | `float4x4`     | `mat4x4`        |
| `texture2d`     | `Texture2D`    | `sampler2D`     |
| `texture3d`     | `Texture3D`    | `sampler3D`     |
| `texture_cube`  | `TextureCube`  | `samplerCube`   |
| `texture_rect`  | N/A            | `sampler2DRect` |
| `sampler_state` | `SamplerState` | Metadata only   |

### Arrays
At the time of writing this, Arrays are only supported when DirectX is being used by libOBS. The [patch](https://github.com/obsproject/obs-studio/pull/4864) to make it available in OpenGL was retracted at the request of the current OBS Project team.

## Keywords
A limited subset of keywords are supported, other keywords may work if they match across both langauges.

| Name       | DirectX       | OpenGL              |
|------------|---------------|---------------------|
| `POSITION` | `SV_Position` | `gl_FragCoord`      |
| `TARGET`   | `SV_Target`   | N/A                 |
| `VERTEXID` | `SV_VertexID` | `uint(gl_VertexID)` |

## Input/Output Semantics
A limited subset of semantics are supported, other keywords will not work.

| Name       | DirectX       | OpenGL        | Notes                                           |
|------------|---------------|---------------|-------------------------------------------------|
| `POSITION` | `SV_Position` | Metadata only | Provided as `float32[4]`                        |
| `NORMAL`   | `NORMAL`      | Metadata only | Provided as `float32[4]`                        |
| `COLOR`    | `COLOR`       | Metadata only | Provided as `uint8_unorm[4]`                    |
| `TANGENT`  | `TANGENT`     | Metadata only | Provided as `float32[4]`                        |
| `TEXCOORD` | `TEXCOORD`    | Metadata only | Either `float32`, `float32[2]` or `float32[4]`. |
| `VERTEXID` | `VERTEXID`    | Metadata only |                                                 |

## Sampler States
A sampler state controls how a texture is sampled by future operations on it. Sampler States are global and can't be passed as parameters or modified while the vertex or fragment shader run. Sampler Sates have the following settings:

##### `Filter`
| Name                              | Magnification | Minification | Mip-Mapping |
|-----------------------------------|---------------|--------------|-------------|
| `Point`, `MIN_MAG_MIP_POINT`      | Point         | Point        | Point       |
| `Linear`, `MIN_MAG_MIP_LINEAR`    | Linear        | Linear       | Linear      |
| `MIN_MAG_POINT_MIP_LINEAR`        | Point         | Point        | Linear      |
| `MIN_POINT_MAG_LINEAR_MIP_POINT`  | Linear        | Point        | Point       |
| `MIN_POINT_MAG_MIP_LINEAR`        | Linear        | Point        | Linear      |
| `MIN_LINEAR_MAG_MIP_POINT`        | Point         | Linear       | Point       |
| `MIN_LINEAR_MAG_POINT_MIP_LINEAR` | Point         | Linear       | Linear      |
| `MIN_MAG_LINEAR_MIP_POINT`        | Linear        | Linear       | Point       |
| `Anisotropy`                      | Anisotropic   | Anisotropic  | Anisotropic |

##### `AddressU`, `AddressV` and `AddressW`
| Name             | Description                                                                         |
|------------------|-------------------------------------------------------------------------------------|
| `Wrap`, `Repeat` | Wrap the UVW coordinates to be within 0..1.                                         |
| `Clamp`, `None`  | Clamp the UVW coordinates to within 0..1.                                           |
| `Mirror`         | Mirror the UVW coordinates when one of them goes out of the 0..1 range.             |
| `Border`         | Fill everything outside of UVW 0..1 with the BorderColor. (Not available on OpenGL) |
| `MirrorOnce`     | Mirror the UVW coordinates once when one of them goes out of the 0..1 range.        |

##### `MinLOD` and `MaxLOD`
Minimum and maximum LOD available to sample operations. Must be a number in the range 0..255.

##### `MaxAnisotropy`
Maximum anisotropy to allow for sampling, as a number in the range of 1..16.

##### `BorderColor`
Border color when the AddressU/V/W mode is set to Border. Only applicable on DirectX, as the BorderColor is not set on OpenGL.
