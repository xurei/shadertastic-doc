## Brief description
A Shader (more specifically a Pixel Shader) is a script running on your GPU,
allowing alter an image or a frame for each pixel.

The main difference with code running on your CPU is that **it is executed in parallel, on time per pixel**.  
This video from NVIDIA explains how a shader works in a simplified manner:
![type:video](https://www.youtube.com/embed/-P28LKWTzrI?si=kElHGJcO7RMw45ZE)

Shadertastic uses Pixel Shaders to create its effects. 

## How to think in Shaders
When you develop a Shader, you have a few important things to consider:
1. tu bosses pixel par pixel, tu peux pas communiquer entre les pixels
2. le code qui est exécuté peut se traduire vulgairement : "Quelle est la couleur que je dois mettre pour ce pixel (X,Y) ?"  
   In other words, a Pixel Shader works backwards compared to the intuitive interpretation.  
   (mettre l'exemple du décallage vers la gauche ?)  
   (faire l'analogie avec les maths ?)
3. les fors, c'est **très** couteux. Les shaders aiment pas trop ça.
4. récupérer un pixel d'une texture est très lent.
5. ?? les dimensions d'une texture est toujours dans le range [0,1]

