function start() {
    const canvas = document.getElementById("my_canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // FPS Configuration
    const TARGET_FPS = 60;
    const FPS_UPDATE_INTERVAL = 1000; // Update FPS display every second

    // Initialize the WebGL context
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    // Vertex Shader
    const vsSource = 
    `#version 300 es    
    precision highp float;

    in vec3 position;
    in vec3 color;
    in vec2 aTexCoord;

    out vec2 TexCoord;
    out vec3 fragColor;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 proj;

    void main(void)
    {
        TexCoord = aTexCoord;
        fragColor = color;
        gl_Position = proj * view * model * vec4(position, 1.0);
    }`;


    // Fragment Shader
    const fsSource = 
    `#version 300 es
    precision highp float;
    
    in vec3 fragColor;
    in vec2 TexCoord;

    uniform sampler2D texture1;
    uniform sampler2D texture2;

    out vec4 frag_color;
    void main(void)
    {
        //frag_color = vec4(fragColor, 1.0);

        //frag_color = texture(texture1, TexCoord);
        //frag_color = mix(texture1,TexCoord);
        frag_color = mix(texture(texture1, TexCoord), texture(texture2, TexCoord), 0.5);

    }`;


 // Shader compilation and program setup
    const vs = gl.createShader(gl.VERTEX_SHADER);  
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();

    gl.shaderSource(vs, vsSource);     
    gl.compileShader(vs);
    if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vs));
        console.log("\nVertex Shader ERROR\n");
        return;
    }

    gl.shaderSource(fs, fsSource);     
    gl.compileShader(fs);
    if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fs));
        console.log("\nFragment Shader ERROR");
        return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert(gl.getProgramInfoLog(program));
        return;
    }

    gl.useProgram(program);

    // Cube data 
    let punkty = 36;
    var vertices = [
        -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,   0.0, 0.0,
         0.5, -0.5, -0.5,  0.0, 0.0, 1.0,   1.0, 0.0,
         0.5,  0.5, -0.5,  0.0, 1.0, 1.0,   1.0, 1.0,
         0.5,  0.5, -0.5,  0.0, 1.0, 1.0,   1.0, 1.0,
        -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,   0.0, 1.0,
        -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,   0.0, 0.0,
    
        -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,   0.0, 0.0,
         0.5, -0.5,  0.5,  1.0, 0.0, 1.0,   1.0, 0.0,
         0.5,  0.5,  0.5,  1.0, 1.0, 1.0,   1.0, 1.0,
         0.5,  0.5,  0.5,  1.0, 1.0, 1.0,   1.0, 1.0,
        -0.5,  0.5,  0.5,  0.0, 1.0, 0.0,   0.0, 1.0,
        -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,   0.0, 0.0,
    
        -0.5,  0.5,  0.5,  1.0, 0.0, 1.0,   0.0, 0.0,
        -0.5,  0.5, -0.5,  1.0, 1.0, 1.0,   1.0, 0.0,
        -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,   1.0, 1.0,
        -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,   1.0, 1.0,
        -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,   0.0, 1.0,
        -0.5,  0.5,  0.5,  1.0, 0.0, 1.0,   0.0, 0.0,
    
         0.5,  0.5,  0.5,  1.0, 0.0, 1.0,   0.0, 0.0,
         0.5,  0.5, -0.5,  1.0, 1.0, 1.0,   1.0, 0.0,
         0.5, -0.5, -0.5,  0.0, 1.0, 0.0,   1.0, 1.0,
         0.5, -0.5, -0.5,  0.0, 1.0, 0.0,   1.0, 1.0,
         0.5, -0.5,  0.5,  0.0, 0.0, 0.0,   0.0, 1.0,
         0.5,  0.5,  0.5,  1.0, 0.0, 1.0,   0.0, 0.0,
    
        -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,   0.0, 0.0,
         0.5, -0.5, -0.5,  1.0, 1.0, 1.0,   1.0, 0.0,
         0.5, -0.5,  0.5,  1.0, 0.0, 1.0,   1.0, 1.0,
         0.5, -0.5,  0.5,  1.0, 0.0, 1.0,   1.0, 1.0,
        -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,   0.0, 1.0,
        -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,   0.0, 0.0,
    
        -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,   0.0, 0.0,
         0.5,  0.5, -0.5,  1.0, 1.0, 1.0,   1.0, 0.0,
         0.5,  0.5,  0.5,  1.0, 0.0, 1.0,   1.0, 1.0,
         0.5,  0.5,  0.5,  1.0, 0.0, 1.0,   1.0, 1.0,
        -0.5,  0.5,  0.5,  0.0, 0.0, 0.0,   0.0, 1.0,
        -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,   0.0, 0.0
        ];
 
    // Create and bind vertex buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex attributes -----------------------
    const positionAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 8*4, 0);

    const colorAttrib = gl.getAttribLocation(program, "color");
    gl.enableVertexAttribArray(colorAttrib);
    gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 8*4, 3*4);

    const texCoord = gl.getAttribLocation(program, "aTexCoord");
    gl.enableVertexAttribArray(texCoord);
    gl.vertexAttribPointer(texCoord,2,gl.FLOAT,false, 8*4,6*4);
    //-------------------------------------------

    
    // Uniform locations
    let uniModel = gl.getUniformLocation(program, 'model');
    let uniView = gl.getUniformLocation(program, 'view');
    let uniProj = gl.getUniformLocation(program, 'proj');

    // Mouse look setup
    let lastX = canvas.width / 2;
    let lastY = canvas.height / 2;
    let firstMouse = true;
    const sensitivity = 0.1;
    const fpsDisplay = document.createElement('div');
    fpsDisplay.id = 'fps';
    fpsDisplay.style.position = 'absolute';
    fpsDisplay.style.top = '10px';
    fpsDisplay.style.left = '10px';
    fpsDisplay.style.color = 'white';
    fpsDisplay.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(fpsDisplay);

    // Frame rate tracking variables
    let lastFrameTime = 0;
    let fpsUpdateTime = 0;
    let frameCount = 0;

    // Keyboard and mouse setup (remains the same as in original code)
    const pressedKeys = {};
    window.addEventListener('keydown', (e) => {
        pressedKeys[e.code] = true;    
        if (e.code === 'Escape') {
            if (confirm('Do you want to close?')) {
                window.close();
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        pressedKeys[e.code] = false;
    });

    // Camera setup with freelook (similar to original)
    let cameraPos = glm.vec3(0, 0, 3);
    let cameraFront = glm.vec3(0, 0, -1);
    let cameraUp = glm.vec3(0, 1, 0);
    let pitch = 0;
    let yaw = -90; // Default looking direction

    
    // Mouse movement handling (similar to original)
    canvas.addEventListener('mousemove', (e) => {
        if (!document.pointerLockElement) return;

        const sensitivity = 0.1;
        const xpos = e.movementX;
        const ypos = e.movementY;

        yaw += xpos * sensitivity;
        pitch -= ypos * sensitivity; 

        pitch = Math.max(-89, Math.min(89, pitch));

        // Update camera front vector
        cameraFront.x = Math.cos(glm.radians(yaw)) * Math.cos(glm.radians(pitch));
        cameraFront.y = Math.sin(glm.radians(pitch));
        cameraFront.z = Math.sin(glm.radians(yaw)) * Math.cos(glm.radians(pitch));
        cameraFront = glm.normalize(cameraFront);
    });

    // Pointer lock for mouse look
    canvas.addEventListener('click', () => {
        canvas.requestPointerLock();
    });

    function updateCamera(deltaTime) {
        const cameraSpeed = 5 * deltaTime; // Time-based movement

        if (pressedKeys['KeyW']) { // Forward
            cameraPos.x += cameraSpeed * cameraFront.x;
            cameraPos.y += cameraSpeed * cameraFront.y;
            cameraPos.z += cameraSpeed * cameraFront.z;
        }
        if (pressedKeys['KeyS']) { // Backward
            cameraPos.x -= cameraSpeed * cameraFront.x;
            cameraPos.y -= cameraSpeed * cameraFront.y;
            cameraPos.z -= cameraSpeed * cameraFront.z;
        }
        if (pressedKeys['KeyD']) { // Strafe right
            let cameraRight = glm.normalize(glm.cross(cameraFront, cameraUp));
            cameraPos.x += cameraRight.x * cameraSpeed;
            cameraPos.y += cameraRight.y * cameraSpeed;
            cameraPos.z += cameraRight.z * cameraSpeed;
        }
        if (pressedKeys['KeyA']) { // Strafe left
            let cameraRight = glm.normalize(glm.cross(cameraFront, cameraUp));
            cameraPos.x -= cameraRight.x * cameraSpeed;
            cameraPos.y -= cameraRight.y * cameraSpeed;
            cameraPos.z -= cameraRight.z * cameraSpeed;
        }
    }

        //TEXTURE
        const texture1 = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture1);

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,width, height, border, srcFormat, srcType, pixel);
        const image = new Image();

        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, texture1);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,srcFormat, srcType, image);
            
            gl.generateMipmap(gl.TEXTURE_2D);   
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);          
        };
        image.crossOrigin = ""; 
        image.src = "https://cdn.pixabay.com/photo/2013/09/22/19/14/brick-wall-185081_960_720.jpg"
        //

        //TEXTURE 2
            const texture2 = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture2);
            
            // Temporary texture while loading
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, 
                        new Uint8Array([255, 0, 0, 255])); // Red placeholder
            
            // Load the second texture
            const image2 = new Image();
            image2.onload = function() {
                gl.bindTexture(gl.TEXTURE_2D, texture2);
                gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image2);
                
                gl.generateMipmap(gl.TEXTURE_2D);   
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);          
            };
        image2.crossOrigin = ""; 
        image2.src = "https://cdn.pixabay.com/photo/2016/12/18/21/23/brick-wall-1916752_1280.jpg"
            

        //TEXUTRE MIX

    gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0); 
    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 1);



    function draw(currentTime) {
        // Calculate delta time
        currentTime *= 0.001; // Convert to seconds
        const deltaTime = Math.min(currentTime - (lastFrameTime || currentTime), 0.1); // Limit max delta
        lastFrameTime = currentTime;

        // FPS Calculation
        frameCount++;
        const currentUpdateTime = performance.now();
        
        // Update FPS display every second
        if (currentUpdateTime - fpsUpdateTime >= FPS_UPDATE_INTERVAL) {
            const fps = (frameCount / ((currentUpdateTime - fpsUpdateTime) / 1000)).toFixed(1);
            fpsDisplay.textContent = `FPS: ${fps}`;
            
            // Reset counters
            frameCount = 0;
            fpsUpdateTime = currentUpdateTime;
        }

        // Clear the canvas
        gl.clearColor(0.2, 0.3, 0.3, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        // Update camera
        updateCamera(deltaTime);

        // Create matrices
        const model = mat4.create();
        const view = mat4.create();
        const proj = mat4.create();
        
        // Rotate model slightly
        mat4.rotate(model, model, -25 * Math.PI / 180, [0, 0, 1]);

        // Set up view matrix
        const lookAtTarget = {
            x: cameraPos.x + cameraFront.x,
            y: cameraPos.y + cameraFront.y,
            z: cameraPos.z + cameraFront.z
        };
        mat4.lookAt(view, 
            [cameraPos.x, cameraPos.y, cameraPos.z], 
            [lookAtTarget.x, lookAtTarget.y, lookAtTarget.z], 
            [cameraUp.x, cameraUp.y, cameraUp.z]
        );

        // Set up projection matrix
        mat4.perspective(proj, 60 * Math.PI / 180, 
            gl.canvas.clientWidth / gl.canvas.clientHeight, 
            0.1, 
            100.0
        );

        // Set uniform matrices
        gl.uniformMatrix4fv(uniModel, false, model);
        gl.uniformMatrix4fv(uniView, false, view);
        gl.uniformMatrix4fv(uniProj, false, proj);

        //Drawing cube with texures (Adding texures)
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture1);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, texture2);

        // Draw the cube
        gl.drawArrays(gl.TRIANGLES, 0, 36);


        
        // Limit frame rate and request next animation frame
        setTimeout(() => {
            window.requestAnimationFrame(draw);
        }, 1000 / TARGET_FPS);
    }

    // Start the rendering
    window.requestAnimationFrame(draw);

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    });
}