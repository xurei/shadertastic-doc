# Parameters Reference
## Common parameters
Each shader always these parameters. Shadertastic wil automatically fill them, you don't have control over them.

They can be safely ignored when you don't need them in you effect.

| Parameter (HLSL)       | Description                                                                                                  |
|------------------------|--------------------------------------------------------------------------------------------------------------|
| `float time`           | Time since the shader is running. Goes from 0 to infinity for filter effects, 0 to 1 for transition effects<br>(see the ["time" parameter type](time.md))                    |
| `float delta_time`     | Time elapsed since the previous frame                                                                        |
| `int frame_index`      | Number of frames since the filter has been activated, or reset<br>(see the ["time" parameter type](time.md)) |
| `float upixel`         | Width of a pixel in the UV space; equivalent of 1.0 / texture_width                                          |
| `float vpixel`         | Height of a pixel in the UV space; equivalent of 1.0 / texture_height                                        |
| `float rand_seed`      | Seed for pseudo-random functions; when used, allows effect to be different every time                        |
| `int nb_steps`         | number of steps (for multisteps effects)                                                                     |
| `int current_step`     | index of current step (for multistep effects)                                                                |
| `texture2d tex_interm` | Intermediate texture where the previous step will be rendered (for multistep effects)                        |

#### Filter Specific common parameters

| Parameter (HLSL)       | Description                                                                                    |
|------------------------|------------------------------------------------------------------------------------------------|
| `texture2d image`      | Texture of the source                                             |

#### Transition Specific common parameters

| Parameter (HLSL)       | Description                                                                                    |
|------------------------|------------------------------------------------------------------------------------------------|
| `texture2d tex_a`      | Texture of the previous scene                                           |
| `texture2d tex_b`      | Texture of the next scene                                           |

## Custom parameters
You can define you own parameters and how they are rendered in the OBS User Interface.

For convenience, parameter types are separated in their own sub-page.
