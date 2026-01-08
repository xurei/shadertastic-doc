## Brief description
A Shader (more specifically a Pixel Shader) is a script running on your GPU,
allowing to alter an image or a frame for each pixel.

The main difference with code running on your CPU is that **it is executed in parallel, on time per pixel**.  
There is 3 great handmade drawings helping catch this idea here: [https://thebookofshaders.com/01/](https://thebookofshaders.com/01/) (see Why are shaders fast?)

Shadertastic uses Pixel Shaders to create its effects (also named Fragment Shaders).

## What can you do with a Shader

## How to think in Shaders
When you develop a Shader, you have a few important things to consider:

1. Pixel Shader code is ran by the GPU for each pixel and you can't have the *result* of computation from one pixel to compute an other
    - In a context of a particular pixel being processed, you typically query the current pixel value and you can query (it's called `Sample()`) a few other *input* pixels from different coordinates than the current one. To mix values and make a blur effect for example.
    - Advanced: there is some specific and limited functions to get the discrete difference/derivative of input variables (see ddx and ddy in HLSL)
2. From the shader programmer perspective, pixel coordinates are in `uv` space.
    - It's a 2D cartesian coordinate system with (0.0,0.0) at left top corner and (1.0,1.0) right bottom corner
    - everything is using floats. And it's fine, even for pixel-perfect retro 8-bit things. As distrubing as fine.
3. From the shader programmer perspective, a color value is a `float4` ranging from 0.0 to 1.0
4. You write the code that will return a color value for the pixel at *current coordinates* given as input of your code. 
    - You don't choose/set the uv of the resulting pixel. You can query input pixel values at arbitrary location.
    - In other words, a Pixel Shader works backwards compared to the intuitive interpretation.
    - If you write a shader that make the result image shifted to the *left* by 20%:
        - in `uv[0]` is `0.0` at left side of the image and growing while going to the right. 
        - you may think "just subtract something to result uv". You can't.
        - you have to think : "what are the coordinates of the input pixel I want to read then return as result at current coordinates ?"
        - you will need to `return image.Sample(textureSampler, uv + float2(0.2, 0.0));
5. While many trigonometric and math functions are fast and hardware-accelerated, you can't run much code in the time budget of 60FPS
    - `for` loops are available, they can be very costly. Should never iterate hundred of times.
    - `image.Sample()` is the most costly thing you can image to do as a beginner. Matrix multiplication is very cheap as comparison point.

