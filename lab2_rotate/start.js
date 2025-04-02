function start() {
    const canvas = document.getElementById("my_canvas");

    // Initialize the WebGL context
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    console.log("WebGL version: " + gl.getParameter(gl.VERSION));
    console.log("GLSL version: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
    console.log("Vendor: " + gl.getParameter(gl.VENDOR));

    const vs = gl.createShader(gl.VERTEX_SHADER);  
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();

    const vsSource = 
        `#version 300 es    
        precision highp float;

        in vec3 position;
        in vec3 color;

        uniform mat4 model;
        uniform mat4 view;
        uniform mat4 proj;

        out vec3 fragColor;

        void main(void)
        {
            gl_Position = proj * view * model * vec4(position, 1.0);
            fragColor = color;
        }
        `;

    const fsSource = 
        `#version 300 es
        precision highp float;
        
        in vec3 fragColor;
        out vec4 frag_color;
        void main(void)
        {
            frag_color = vec4(fragColor, 1.0);
        }`;

    // Compile vertex shader
    gl.shaderSource(vs, vsSource);     
    gl.compileShader(vs);
    if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vs));
        console.log("\nVertex Shader ERROR\n");
        return;
    }

    // Compile fragment shader
    gl.shaderSource(fs, fsSource);     
    gl.compileShader(fs);
    if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fs));
        console.log("\nFragment Shader ERROR");
        return;
    }

    // Link program
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
        -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,
         0.5, -0.5, -0.5,  0.0, 0.0, 1.0,
         0.5,  0.5, -0.5,  0.0, 1.0, 1.0,
         0.5,  0.5, -0.5,  0.0, 1.0, 1.0,
        -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,
        -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,
    
        -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,
         0.5, -0.5,  0.5,  1.0, 0.0, 1.0,
         0.5,  0.5,  0.5,  1.0, 1.0, 1.0,
         0.5,  0.5,  0.5,  1.0, 1.0, 1.0,
        -0.5,  0.5,  0.5,  0.0, 1.0, 0.0,
        -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,
    
        -0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
        -0.5,  0.5, -0.5,  1.0, 1.0, 1.0,
        -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
        -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
        -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,
        -0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
    
         0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
         0.5,  0.5, -0.5,  1.0, 1.0, 1.0,
         0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
         0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
         0.5, -0.5,  0.5,  0.0, 0.0, 0.0,
         0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
    
        -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
         0.5, -0.5, -0.5,  1.0, 1.0, 1.0,
         0.5, -0.5,  0.5,  1.0, 0.0, 1.0,
         0.5, -0.5,  0.5,  1.0, 0.0, 1.0,
        -0.5, -0.5,  0.5,  0.0, 0.0, 0.0,
        -0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
    
        -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,
         0.5,  0.5, -0.5,  1.0, 1.0, 1.0,
         0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
         0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
        -0.5,  0.5,  0.5,  0.0, 0.0, 0.0,
        -0.5,  0.5, -0.5,  0.0, 1.0, 0.0
        ];

    // Create and bind vertex buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex attributes
    const positionAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 6*4, 0);

    const colorAttrib = gl.getAttribLocation(program, "color");
    gl.enableVertexAttribArray(colorAttrib);
    gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 6*4, 3*4);

    // Uniform locations
    let uniModel = gl.getUniformLocation(program, 'model');
    let uniView = gl.getUniformLocation(program, 'view');
    let uniProj = gl.getUniformLocation(program, 'proj');

    // Camera setup
    let cameraPos = glm.vec3(0,0,3);
    let cameraFront = glm.vec3(0,0,-1);
    let cameraUp = glm.vec3(0,1,0);
    let obrot = 0.0;

    // Keyboard handling
    const pressedKeys = {};
    window.addEventListener('keydown', (e) => {
        pressedKeys[e.code] = true;
        
        // Optional: Add escape key handling
        if (e.code === 'Escape') {
            if (confirm('Do you want to close?')) {
                window.close();
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        pressedKeys[e.code] = false;
    });

    function updateCamera() {
        const cameraSpeed = 0.1;

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
        if (pressedKeys['KeyD']) { // Rotate right
            obrot += 0.05;
            cameraFront.x = Math.sin(obrot);
            cameraFront.z = -Math.cos(obrot);
        }
        if (pressedKeys['KeyA']) { // Rotate left
            obrot -= 0.05;
            cameraFront.x = Math.sin(obrot);
            cameraFront.z = -Math.cos(obrot);
        }
    }

    function draw() {
        // Clear the canvas
        gl.clearColor(0.2, 0.3, 0.3, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        // Update camera
        updateCamera();

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
        mat4.perspective(proj, 
            60 * Math.PI / 180, 
            gl.canvas.clientWidth / gl.canvas.clientHeight, 
            0.1, 
            100.0
        );

        // Set uniform matrices
        gl.uniformMatrix4fv(uniModel, false, model);
        gl.uniformMatrix4fv(uniView, false, view);
        gl.uniformMatrix4fv(uniProj, false, proj);

        // Draw the cube
        gl.drawArrays(gl.TRIANGLES, 0, punkty);

        // Request next animation frame
        window.requestAnimationFrame(draw);
    }

    // Start the rendering
    draw();

    // Optional: Mouse click handler
    window.addEventListener('mousedown', e => {
        const x = e.offsetX;
        const y = e.offsetY;
        console.log(`Mouse clicked at x: ${x}, y: ${y}`);
    });
}