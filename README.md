# WebGL 3D Graphics Project

This project demonstrates a series of WebGL-based 3D graphics using the HTML5 Canvas and JavaScript. The main goal is to gradually build up the functionality for a 3D scene as: basic primitives, rotation, and mouse-based camera control.

## Project Structure

- **lab1_primitives**: Basic 3D primitives (cube) rendered using WebGL.
- **lab2_rotate**: Adding rotation to the 3D object.
- **lab3_mouse**: Implementing mouse-based camera control for a freelook-style navigation.

---

### Controls:
- **W**: Move forward.
- **S**: Move backward.
- **A**: Strafe left.
- **D**: Strafe right.
- **Mouse Movement**: Look around (in Lab 3).
- **Click**: Lock mouse pointer (in Lab 3).
- **Esc**: Close the window (prompt on Escape key press).

---

# WebGL 3D Graphics Project

This project demonstrates interactive 3D graphics rendered with WebGL2 using HTML5 Canvas and JavaScript. It supports custom object loading, texture mapping, lighting, and a basic skybox implementation.

## 💡 Features

- Basic geometric primitives (cube)
- OBJ file loader (supports vertices, normals, texture coordinates)
- Mouse and keyboard-based free-look navigation
- Textures and multi-texturing
- Phong lighting model (ambient, diffuse, and specular)
- Skydome (inverted cube/sphere)
- FPS setup for consistent rendering

## 🎮 Controls

- **W / A / S / D**: Move forward / left / backward / right  
- **Mouse Movement**: Look around  
- **Left Click**: Lock mouse pointer  
- **Esc**: Unlock pointer (shows prompt on release)  
- **Z**: Switch to 3D view mode  
- **X**: Switch to VR view mode  
- **C**: Switch to normal view mode  
- **V**: Move both objects farther apart (in 3D/VR view)  
- **B**: Bring both objects closer (in 3D/VR view)


## 📦 Advanced Features

- **OBJ Loader**: Load external `.obj` files and convert them to buffers.
- **Lighting**: Per-fragment Phong shading based on camera and light position.
- **Skydome**: Render a scaled inverted cube to simulate a sky environment.
- **Texture Mapping**: Multi-texture support via GLSL `sampler2D`.


---
