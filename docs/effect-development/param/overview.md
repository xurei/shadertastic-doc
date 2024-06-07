TODO 


Copié collé de ChatGPT pour les details des params depui Gaussian Blur : 

name

Description: A unique identifier for the parameter, used programmatically.
Value: "blur_level_x" for the first parameter, "blur_level_y" for the second parameter
Purpose: It specifies the internal name of the parameter, which is used in the code to reference this specific setting.
label

Description: A human-readable label for the parameter.
Value: "Blur level (X)" for the first parameter, "Blur level (Y)" for the second parameter
Purpose: It provides a user-friendly name for the parameter, which can be displayed in the UI.
type

Description: The data type of the parameter.
Value: "int"
Purpose: It specifies that the parameter is an integer.
slider

Description: Indicates whether a slider control should be used for this parameter in the UI.
Value: true
Purpose: It allows the user to adjust the parameter using a slider.
min

Description: The minimum value that the parameter can take.
Value: 0
Purpose: It sets the lower bound for the parameter value.
max

Description: The maximum value that the parameter can take.
Value: 100
Purpose: It sets the upper bound for the parameter value.
default

Description: The default value of the parameter.
Value: 10
Purpose: It specifies the initial value for the parameter when the effect is first applied or reset.
In summary, this JSON object defines a Gaussian Blur effect with two adjustable parameters: blur_level_x and blur_level_y. Each parameter is an integer that can be adjusted using a slider within a range of 0 to 100, with a default value of 10. The steps field indicates that the process involves two main stages.
