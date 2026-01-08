
Shadertastic is made to allow everyone to write their own effects, without the hussle of writing an OBS plugin.  
All you need to do is to create two files, one describing the effect and its parameters and the other being the shader.

## Prerequites
- Shadertastic installed in your OBS (see [Installation](../installation.md)),
- some knowledge of HLSL/GLSL (TODO ADD SITE FOR BEGINNERS),
- basic knowledge of the JSON syntax.

## Setting up your configuration
You will need to configure Shadertastic and choose a folder where you will put your own effects. 
If you didn't configure it yet, follow these steps:

- Open OBS
- Go to `Tools > Shadertastic Settings` and choose the folder where you want to put your custom effects:
  ![type:video](howto_config.mp4)  
  For this example, we'll assume that you've chosen `C:\Users\John\Documents\Shadertastic-effects`
- Check the `Developer mode` to activate it. It will be useful to hot reload the effects you are creating.
- In the folder you've chosen, download [the custom effect templates](https://github.com/xurei/shadertastic-custom-effect-templates)
You should have this structure:  
  ```
  C:\Users\John\Documents\Shadertastic-effects
    ∟ filters
      ∟ template
    ∟ transitions
      ∟ template
  ```
- (in the future, optionnal) Download and install the Shadertastic SDK and unzip it in your chosen folder.

## Your first filter: Color Adjust
We will write a very simple filter that multiply each color channel (red, green, blue, alpha) with a number between 0.0 and 2.0.  
This is obviously a very simple, low-value effect, and you should probably not actually use it (the Color Correction from OBS is much better).
However, it is a good start to understand how everything works.
[//]: # (The code of this effect can be found here: AJOUTER LIEN GITHUB OU GIST)

- In `C:\Users\John\Documents\Shadertastic-effects\filters`, copy the `template` folder and rename it as `color-adjust`
- The structure should look like this:
  ```
  C:\Users\John\Documents\Shadertastic-effects
    ∟ ...
    ∟ filters
      ∟ color-adjust
        ∟ meta.json
        ∟ main.hlsl
      ∟ ...
  ```
- Change `meta.json` to this:  
  ```json
  {
    "label": "Color Adjust",
    "revision": 1,
    "steps": 1,
    "input_time": false,
    "parameters": [
      {
        "name": "red_amount",
        "label": "Red",
        "type": "double",
        "slider": true,
        "min": 0.0,
        "max": 2.0,
        "default": 1.0,
        "step": 0.01
      },
      {
        "name": "green_amount",
        "label": "Green",
        "type": "double",
        "slider": true,
        "min": 0.0,
        "max": 2.0,
        "default": 1.0,
        "step": 0.01
      },
      {
        "name": "blue_amount",
        "label": "Blue",
        "type": "double",
        "slider": true,
        "min": 0.0,
        "max": 2.0,
        "default": 1.0,
        "step": 0.01
      },
      {
        "name": "alpha_amount",
        "label": "Alpha",
        "type": "double",
        "slider": true,
        "min": 0.0,
        "max": 2.0,
        "default": 1.0,
        "step": 0.01
      }
    ]
  }
  ```
  This file describes the filter and its parameters.  
  Some parameters are automatically added to all filters (see [Filter Reference](effect-filter.md)).  
  Here, we will use the `image` parameter, which is a texture that contains the source being filtered.
- At this point, you should have a filter that works. Let's check that.  
  In OBS, create a source of your choice, select it, and with "Filters" and "+" buttons,
  add a Effect Filter of "Shadertastic" kind. Select the effect "Color Adjust" in the effect dropdown.
  ![Scren record of OBS with the template filter](getting-started-filter-1.gif)
  You should see the source being flipped horizontally. 
  This is the effect implemented in the template file. Now, let's change this with the behaviour we expect.
- In `main.hlsl`, locate the line starting with `// Specific parameters of the shader`:
  ```hlsl
  // Specific parameters of the shader. They must be defined in the meta.json file next to this one.
  uniform float random_amount;
  ```  
  Replace it with:
  ```hlsl
  // Specific parameters of the shader. They must be defined in the meta.json file next to this one.
  uniform float red_amount;
  uniform float green_amount;
  uniform float blue_amount;
  uniform float alpha_amount;
  ```
  Those lines define the variables in the shader that are linked to the custom parameters defined in `meta.json`.  

- !!! warning
      It is important that the name of the parameters are the same in `meta.json` (the "name" field) and `main.hlsl` (name of the variable).
      That is how Shadertastic will understand what is what, and how it should genertate the UI in OBS.

- In `main.hlsl`, locate the `EffectLinear` function:  
  ```hlsl
  float4 EffectLinear(float2 uv)
  {
    // -----> YOUR CODE GOES HERE <-----
  
    // Here is a basic example that will flip the image
    uv[0] = 1-uv[0];
    return image.Sample(textureSampler, uv);
  }
  ```
  Replace it with: 
  ```hlsl
  float4 EffectLinear(float2 uv)
  {
    // Pick the currently processed pixel from the image texture and store it as a float4
    float4 pixel = image.Sample(textureSampler, uv);

    // Multiply the color channels with the matching parameter we defined 
    pixel.r *= red_amount;
    pixel.g *= green_amount;
    pixel.b *= blue_amount;
    pixel.a *= alpha_amount;

    // Return the modified pixel as the result
    return pixel;
  }
  ```
  - Let's look at the changes we've made. 
    In OBS, select the filter "Shadertastic" you've previously created, and click the "Reload" button.
    (if you don't see it, make sure you have checked the `Developer Mode` in the Shadertastic Settings)
    ![Scren record of OBS with the color adjust filter](getting-started-filter-2.gif)
  - Congratulation! You just created your very first effect. 
    This is a very simple one, but hopefully you better understand now how to create your own.

Now, let's go further and write a transition.
  
---------------------------------

## Your first transition: Slide Scene
As you will see, writing a transition is basically the same process as writing a filter. A few things are different,
but in essence, if you understood how to write a filter, writing a transition should be easy.

!!! notice 
    The most notable difference between a filter and a transition is:
    
    - a filter takes an `image` parameter (*i.e.* the image being filtered), 
    - a transition takes two parameters: `tex_a` and a `tex_b` (*i.e.* the image of the "previous" scene and the "next" scene) 

We will write a transition that will move the "previous" scene to the left, and show the "next" scene underneath.  
The scene will not move at the same speed based on the vertical position of the pixel.
An image is probably more explainatory than words:

(GIF DE L'EFFET)

The code of this effect can be found here: AJOUTER LIEN GITHUB OU GIST

- In `C:\Users\John\Documents\Shadertastic-effects\transitions`, create a new folder named `slide-scene`
- In this folder, add two text files: `meta.json` and `main.hlsl`. The structure should look like this:
  ```
  C:\Users\John\Documents\Shadertastic-effects
    ∟ transitions
      ∟ meta.json
      ∟ main.hlsl
  ```


[//]: # (## How does an effect work with Shadertastic ?)
[//]: # (An effect in Shadertatic is composed of two files:)
[//]: # ()
[//]: # (- `meta.json` that describes the effect and its parameters)
[//]: # (- `main.hlsl` that contains the shader code.)
[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (## Filter or Transition ?)
[//]: # (Shadertastic allow you to make two kind of effects: **Filters** and **Transitions**.)  
[//]: # (These function in a similar manner, but some common parameters are only available in one or the other.)
[//]: # (For example, a transition always has a `time` parameter, going from 0.0 to 1.0.) 
[//]: # (A filter may not have it, depending on its configuration.)
[//]: # ()
[//]: # (## Votre première transition)
[//]: # (- déformer/déplacer l'image ? <-- transi)
[//]: # (AJOUTER LIEN GITHUB OU GIST)
[//]: # (### Setup du dossier du filtre)
[//]: # (### meta.json)
[//]: # (### main.hlsl)
[//]: # ()
[//]: # ()
[//]: # (## Packaging your effect)
[//]: # (Comment créer un fichier .shadertastic)
