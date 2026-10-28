*(La vidéo sera sans doute en vertical mais j'ai fait des screens en horizontal pour pas péter le setup)*



### Take a sound/music/beat?  
![Screenshot 2026-10-28 15-24-32.png](Screenshot%202026-10-28%2015-24-32.png)
*signal pur ou fake sinusoide pour forcer des stationnaires*

### Compute its spectrum  
*Waveform, maybe avec un niveau de gris*
![Screenshot 2026-10-28 15-50-07.png](Screenshot%202026-10-28%2015-50-07.png)

### Squish it / Look at it from the top  
*Faux mouvement de squishing ou déplacement vers le "haut"*  
*Waveform AVG; l'image sera + petite en vrai*
![Screenshot 2026-10-28 15-32-18.png](Screenshot%202026-10-28%2015-32-18.png)

### This is a snapshot of the sound at a precise moment.  
#### We add a gradient map, so it's more readable and beautiful.
*Waveform AVG avec gradient map*
![Screenshot 2026-10-28 15-33-46.png](Screenshot%202026-10-28%2015-33-46.png)

### The Human ear works in logarithmic frequencies, so let's compensate for that  
*Waveform AVG*  
vs  
*waveform avec Mel bands*  
![Screenshot 2026-10-28 15-37-02.png](Screenshot%202026-10-28%2015-37-02.png)
*annotation des notes sur axe X pour rendre ça + clair?*

### Let's use a recursion and keep a history of it  
*Recursed waveform avec Mel*
![Screenshot 2026-10-28 15-38-51.png](Screenshot%202026-10-28%2015-38-51.png)

### Looking cool! But now is the best part...  
#### Let's copy the history, shift it in the past and substract  
*Recursed waveform bleu/vert*
![Screenshot 2026-10-28 15-41-29.png](Screenshot%202026-10-28%2015-41-29.png)

### Now we have two signals: 
#### the "rhythmic part" (écoutable?), 
![Screenshot 2026-10-28 15-42-22.png](Screenshot%202026-10-28%2015-42-22.png)
#### and the "changing" (a.k.a. interesting) part.
![Screenshot 2026-10-28 15-42-26.png](Screenshot%202026-10-28%2015-42-26.png)
### Let's also add a Drum (and Snare?) detector.
![Screenshot 2026-10-28 15-43-41.png](Screenshot%202026-10-28%2015-43-41.png)

------------------------

*Transition, écran vide*

### Let's create a ring
*Anneau simple*

### Illuminate it with the "rhythmic" spectrum
*Afficher texture + flèche ou jsp?*

### Make the ring "beat" with the Drum...
*Anneau qui bouge*

### ... and "vibrate" with the Snare
*Anneau qui bouge et tremble*

### Finally, let's make it "interesting" with the changing spectrum
*Traits? couleur differente?*

### Spice it up with some recursions...
*Add recursions*

### And follow the Rule #1
*pause*

### "Everything looks more interesting with a Sobel Filter"
*Visuel Final*













