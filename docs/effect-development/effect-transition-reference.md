## Transition Reference

### Implicitly defined shader uniforms

Shaders are compiled code, and parameters are bound to them at run time by the graphics application that use them.

Shadertastic, for all it's transitions, will bind and update at each frame following parameters:

```hlsl
// Time since the shader is running. Goes from 0 to 1 for transition effects; goes from 0 to infinity for filter effects
uniform float time;
// Texture of the previous frame (transitions only)
uniform texture2d tex_a;
// Texture of the next frame (transitions only)
uniform texture2d tex_b;
// Intermediate texture where the previous step will be rendered (for multistep effects)
uniform texture2d tex_interm;
// Width of a pixel in the UV space
uniform float upixel;
// Height of a pixel in the UV space
uniform float vpixel;
// Seed for random functions
uniform float rand_seed;
// index of current step (for multistep effects)
uniform int current_step;
// number of steps (for multisteps effects)
uniform int nb_steps;
```
It will also generate the shader-side declarations so you have to not declare yourself (leave this as comment in `main.hlsl`).
