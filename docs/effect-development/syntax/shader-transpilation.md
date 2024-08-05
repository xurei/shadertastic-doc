# OBS shader transpilation details

## Defines
OBS Studio includes a Pre-Processor that adds some `#define`.
It allows you to have some `#ifdef _XYZ`...`#endif` blocks if you really need different code on both platforms.

### `_D3D11`
Defined if `libobs-d3d11` is in use.

### `_OPENGL`
Defined if `libobs-opengl` is in use.

## HLSL to GLSL function mapping

As OBS 30, `gl-shaderparser.c` have a comment that recap what they actually do:
```c
/*
 * NOTE: HLSL-> GLSL intrinsic conversions
 *   atan2    -> atan
 *   clip     -> (unsupported)
 *   ddx      -> dFdx
 *   ddy      -> dFdy
 *   fmod     -> mod (XXX: these are different if sign is negative)
 *   frac     -> fract
 *   lerp     -> mix
 *   lit      -> (unsupported)
 *   log10    -> (unsupported)
 *   mul      -> (change to operator)
 *   rsqrt    -> inversesqrt
 *   saturate -> (use clamp)
 *   sincos   -> (map to manual sin/cos calls)
 *   tex*     -> texture
 *   tex*grad -> textureGrad
 *   tex*lod  -> textureLod
 *   tex*bias -> (use optional 'bias' value)
 *   tex*proj -> textureProj
 *
 *   All else can be left as-is
 */
```

## OBS-specific constants and functions additions

### `libobs-d3d11`

The prelude of any transpiled vertex or pixel shader before passing them to DirectX as OBS 30 is:
```c
static const bool obs_glsl_compile = false;
```

No `obs_load_2d` or `obs_load_3d` is defined.

### `libobs-opengl`

The prelude of any transpiled vertex or pixel shader before passing them to OpenGL as OBS 30 is:
```c
const bool obs_glsl_compile = true;

vec4 obs_load_2d(sampler2D s, ivec3 p_lod) {
    int lod = p_lod.z;
    vec2 size = textureSize(s, lod);
    vec2 p = (vec2(p_lod.xy) + 0.5) / size;
    vec4 color = textureLod(s, p, lod);
    return color;
}

vec4 obs_load_3d(sampler3D s, ivec4 p_lod) {
    int lod = p_lod.w;
    vec3 size = textureSize(s, lod);
    vec3 p = (vec3(p_lod.xyz) + 0.5) / size;
    vec4 color = textureLod(s, p, lod);
    return color;
}
```

## OBS-specific constants and functions additions

### `libobs-d3d11`

The prelude of any transpiled vertex or pixel shader before passing them to DirectX as OBS 30 is:
```c
static const bool obs_glsl_compile = false;
```

No `obs_load_2d` or `obs_load_3d` is defined.

### `libobs-opengl`

The prelude of any transpiled vertex or pixel shader before passing them to OpenGL as OBS 30 is:
```c
const bool obs_glsl_compile = true;

vec4 obs_load_2d(sampler2D s, ivec3 p_lod) {
    int lod = p_lod.z;
    vec2 size = textureSize(s, lod);
    vec2 p = (vec2(p_lod.xy) + 0.5) / size;
    vec4 color = textureLod(s, p, lod);
    return color;
}

vec4 obs_load_3d(sampler3D s, ivec4 p_lod) {
    int lod = p_lod.w;
    vec3 size = textureSize(s, lod);
    vec3 p = (vec3(p_lod.xyz) + 0.5) / size;
    vec4 color = textureLod(s, p, lod);
    return color;
}
```

## Writing conventions for matrices

Programmation languages defines two distincts things on this topic around `row-major` and `column-major` matrices.

1. they specifies in which order individual values should be layered out in RAM, physically
    - This is hardcoded in compilators
    - This impacts performance in case of programs running on CPU if there is data caches and RAM / CPU speed difference.
    - In the GPU world, many common CPU world assumptions aren't true about how is it run and what is fast or not.
2. they defines a concrete syntax to access items from a multi-dimentionnal type.

In C, C++, HLSL the syntax is:
```c
some_2d_var[row][col] = value;
```

In GLSL the syntax is:
```c
some_2d_var[col][row] = value;
```

The hardware is not different if running GLSL or HLSL and GPU have many hardcoded functions, there are the one to trust, compilers do the right thing.

Depending how you have filled some matricies and vectors, you may have a point of view of `projected_vec = input_vec * projection_matrix` is correct or `projected_vec = projection_matrix * input_vec` is correct. OBS makes projections for you, `ViewProj` is filled in the right way on both cases, but it may go wrong if you try to alter some of it's values.

As time of writing, I am not confident enough to give instructions of what is a good or a bad idea. I am not a professionnal graphics programmer, if you are: please help us to write a better paragraph here.
