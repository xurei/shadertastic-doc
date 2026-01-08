## Filter Reference

### Implicitly defined shader uniforms

Shaders are compiled code, and parameters are bound to them at run time by the graphics application that use them.

Shadertastic, for all it's filters, will bind and update at each frame following parameters:

```hlsl
uniform float time;            // Time since the shader is running. Goes from 0 to 1 for transition effects; goes from 0 to infinity for filter effects
uniform texture2d image;       // Texture of the source (filters only)
uniform texture2d tex_interm;  // Intermediate texture where the previous step will be rendered (for multistep effects)
uniform float upixel;          // Width of a pixel in the UV space
uniform float vpixel;          // Height of a pixel in the UV space
uniform float rand_seed;       // Seed for random functions
uniform int current_step;      // index of current step (for multistep effects)
uniform int nb_steps;          // number of steps (for multistep effects)
```
It will also generate the shader-side declarations so you have to not declare yourself (leave this as comment in `main.hlsl`).
