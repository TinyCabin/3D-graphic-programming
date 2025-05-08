let object_number = 1;
let buffer1, buffer2, buffer3, buffer4, buffer5, skyBuffer;
let points1, points2, points3, points4, points5;
let skyTexture

async function loadFile(file) {
    text = await file.text();
    text=text.replaceAll('/', ' ');
    text=text.replaceAll('\n', ' ');
    let arrayCopy = text.split(' ');

    const vertices = [[]];  let licz_vertices = 0;
    const normals = [[]]; let licz_normals = 0;
    const coords = [[]];  let licz_coords = 0;
    const triangles = []; let licz_triangles = 0;


    for (let i=0;i<arrayCopy.length-1;i++)
    {
        if (arrayCopy[i]=='v') {			
        vertices.push([]);
        vertices[licz_vertices].push(parseFloat(arrayCopy[i+1]));
        vertices[licz_vertices].push(parseFloat(arrayCopy[i+2]));
        vertices[licz_vertices].push(parseFloat(arrayCopy[i+3]));
        i+=3;
        licz_vertices++;
        }
        
        if (arrayCopy[i]=='vn') {
        normals.push([]);
        normals[licz_normals].push(parseFloat(arrayCopy[i+1]));
        normals[licz_normals].push(parseFloat(arrayCopy[i+2]));
        normals[licz_normals].push(parseFloat(arrayCopy[i+3]));
        i+=3;
        licz_normals++;
        }
        
        if (arrayCopy[i]=='vt') {
        coords.push([]);
        coords[licz_coords].push(parseFloat(arrayCopy[i+1]));
        coords[licz_coords].push(parseFloat(arrayCopy[i+2]));
        i+=2;
        licz_coords++;
        }
        
        if (arrayCopy[i]=='f') {
            triangles.push([]);
            for (let j=1;j<=9;j++) 
                triangles[licz_triangles].push(parseFloat(arrayCopy[i+j]));
        i+=9;
        licz_triangles++;
        }
    }
  //console.log(vertices);
  //console.log(normals);
  //console.log(coords);
  //console.log(triangles);
  //console.log(triangles.length);

let vert_array=[];

	for (let i = 0; i < triangles.length; i++)
	{
		vert_array.push(vertices[triangles[i][0] - 1][0]);
		vert_array.push(vertices[triangles[i][0] - 1][1]);
		vert_array.push(vertices[triangles[i][0] - 1][2]);	
		vert_array.push(normals[triangles[i][2] - 1][0]);
		vert_array.push(normals[triangles[i][2] - 1][1]);
		vert_array.push(normals[triangles[i][2] - 1][2]);
		vert_array.push(coords[triangles[i][1] - 1][0]);
		vert_array.push(coords[triangles[i][1] - 1][1]);	
	
		vert_array.push(vertices[triangles[i][3] - 1][0]);
		vert_array.push(vertices[triangles[i][3] - 1][1]);
		vert_array.push(vertices[triangles[i][3] - 1][2]);	
		vert_array.push(normals[triangles[i][5] - 1][0]);
		vert_array.push(normals[triangles[i][5] - 1][1]);
		vert_array.push(normals[triangles[i][5] - 1][2]);	
		vert_array.push(coords[triangles[i][4] - 1][0]);
		vert_array.push(coords[triangles[i][4] - 1][1]);	
	
		vert_array.push(vertices[triangles[i][6] - 1][0]);
		vert_array.push(vertices[triangles[i][6] - 1][1]);
		vert_array.push(vertices[triangles[i][6] - 1][2]);	
		vert_array.push(normals[triangles[i][8] - 1][0]);
		vert_array.push(normals[triangles[i][8] - 1][1]);
		vert_array.push(normals[triangles[i][8] - 1][2]);
		vert_array.push(coords[triangles[i][7] - 1][0]);
		vert_array.push(coords[triangles[i][7] - 1][1]);
	}

    switch (object_number) {
        case 1:
            buffer1 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
            points1 = triangles.length * 3;
            break;
        case 2:
            buffer2 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
            points2 = triangles.length * 3;
            break;
        case 3:
            buffer3 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer3);
            points3 = triangles.length * 3;
            break;
        case 4:
            buffer4 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer4);
            points4 = triangles.length * 3;
            break;
        case 5:
            buffer5 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer5);
            points5 = triangles.length * 3;
            break;
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert_array), gl.STATIC_DRAW);
    object_number++;

    console.log(vertices);
    console.log("Punkty=" + triangles.length * 3);
    console.log(vert_array);

}


function cube() {
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
    return vertices;
}

// Skydome - using a large inverted cube for simplicity
function skydome() {
    // Use the cube function but scale it much larger and invert normals
    const skyVertices = cube();
    const scale = 100.0; // Large scale for the skydome
    
    // Scale vertices
    for (let i = 0; i < skyVertices.length; i += 8) {
        skyVertices[i] *= scale;
        skyVertices[i+1] *= scale;
        skyVertices[i+2] *= scale;
        
        // Invert normals for inside viewing
        skyVertices[i+3] *= -1;
        skyVertices[i+4] *= -1;
        skyVertices[i+5] *= -1;
    }
    
    return skyVertices;
}

function loadTextures(texture, src) {
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
    
    const image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
        
        gl.generateMipmap(gl.TEXTURE_2D);   
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);          
    };
    image.crossOrigin = ""; 
    image.src = src;
}

function initalGL(canvas){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    // Initialize the WebGL context
    gl = canvas.getContext("webgl2");
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
}

function initialShaders(){
    
    // Vertex Shader
    vsSource = 
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
    fsSource = 
    `#version 300 es
    precision highp float;
    
    in vec3 fragColor;
    in vec2 TexCoord;

    uniform sampler2D texture1;
    uniform sampler2D texture2;

    out vec4 frag_color;
    void main(void)
    {
        frag_color = texture(texture1, TexCoord);
        //frag_color = mix(texture(texture1, TexCoord), texture(texture2, TexCoord), 0.5);

    }`;
}

function compileShader(vs, fs, program){

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
}


let points = 36;
let gl;

function start() {

    // FPS Configuration
    const TARGET_FPS = 60;
    const FPS_UPDATE_INTERVAL = 1000; // Update FPS display every second
    
    // Camera setup with freelook
    let cameraPos = glm.vec3(0, 0, 3);
    let cameraFront = glm.vec3(0, 0, -1);
    let cameraUp = glm.vec3(0, 1, 0);
    let pitch = 0;
    let yaw = -90; // Default looking direction

    let speration = 0;
    let viewMode = 3; 

    // Frame rate tracking variables
    let lastFrameTime = 0;
    let fpsUpdateTime = 0;
    let frameCount = 0;



    function vertexBinding(){

        // // Create and bind vertex buffer
        // const vertexBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube()), gl.STATIC_DRAW);

        // Vertex attributes -----------------------
        const positionAttrib = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionAttrib);
        gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 8*4, 0);

        const colorAttrib = gl.getAttribLocation(program, "color");
        gl.enableVertexAttribArray(colorAttrib);
        gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 8*4, 3*4);

        const texCoord = gl.getAttribLocation(program, "aTexCoord");
        gl.enableVertexAttribArray(texCoord);
        gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 8*4, 6*4);
        //-------------------------------------------
    }

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

    function updateFps(){
        // FPS Calculation
        frameCount++;
        const currentUpdateTime = performance.now();
        
        // Update FPS display every second
        if (currentUpdateTime - fpsUpdateTime >= FPS_UPDATE_INTERVAL) {
            const fps = (frameCount / ((currentUpdateTime - fpsUpdateTime) / 1000)).toFixed(1); 
            fpsElement.textContent = `fps: ${fps}`;   
            
            // Reset counters
            frameCount = 0;
            fpsUpdateTime = currentUpdateTime;
        }
    }

    function renderScene() {
        // Create matrices
        const model = mat4.create();
        const view = mat4.create();
        
        // Rotate model slightly
        mat4.rotate(model, model, 0 * Math.PI / 180, [0, 0, 1]);

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

        // Set uniform matrices
        gl.uniformMatrix4fv(uniModel, false, model);
        gl.uniformMatrix4fv(uniView, false, view);

         // Draw skydome first (with depth function modified)
         gl.depthFunc(gl.LEQUAL); // Important for skydome!
         gl.bindBuffer(gl.ARRAY_BUFFER, skyBuffer);
         vertexBinding();
         gl.bindTexture(gl.TEXTURE_2D, skyTexture);
         gl.drawArrays(gl.TRIANGLES, 0, 36); // Sky dome has 36 vertices (cube)
         gl.depthFunc(gl.LESS); // Reset depth func
 
         // Draw each of the 5 models with their respective textures
         if (buffer1 && points1) {
             gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
             vertexBinding();
             gl.bindTexture(gl.TEXTURE_2D, texture1);
             gl.drawArrays(gl.TRIANGLES, 0, points1);
         }
 
         if (buffer2 && points2) {
             gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
             vertexBinding();
             gl.bindTexture(gl.TEXTURE_2D, texture2);
             gl.drawArrays(gl.TRIANGLES, 0, points2);
         }
 
         if (buffer3 && points3) {
             gl.bindBuffer(gl.ARRAY_BUFFER, buffer3);
             vertexBinding();
             gl.bindTexture(gl.TEXTURE_2D, texture3);
             gl.drawArrays(gl.TRIANGLES, 0, points3);
         }
 
         if (buffer4 && points4) {
             gl.bindBuffer(gl.ARRAY_BUFFER, buffer4);
             vertexBinding();
             gl.bindTexture(gl.TEXTURE_2D, texture4);
             gl.drawArrays(gl.TRIANGLES, 0, points4);
         }
 
         if (buffer5 && points5) {
             gl.bindBuffer(gl.ARRAY_BUFFER, buffer5);
             vertexBinding();
             gl.bindTexture(gl.TEXTURE_2D, texture5);
             gl.drawArrays(gl.TRIANGLES, 0, points5);
         }
    }

    function renderTextureScene(texture){ 
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawArrays(gl.TRIANGLES, 0, points);
    }

    // Stereoscopic projection function
    function stereoProjection(_left, _right, _bottom, _top, _near, _far, _zero_plane, _dist, _eye) {
        // Perform the perspective projection for one eye's subfield.
        // The projection is in the direction of the negative z-axis.
        
        let _dx = _right - _left;
        let _dy = _top - _bottom;

        let _xmid = (_right + _left) / 2.0;
        let _ymid = (_top + _bottom) / 2.0;

        let _clip_near = _dist + _zero_plane - _near;
        let _clip_far = _dist + _zero_plane - _far;

        let _n_over_d = (_clip_near / _dist);

        let _topw = _n_over_d * _dy / 2.0;
        let _bottomw = -_topw;
        let _rightw = _n_over_d * (_dx / 2.0 - _eye); 
        let _leftw = _n_over_d * (-_dx / 2.0 - _eye);

        const proj = mat4.create();
        mat4.frustum(proj, _leftw, _rightw, _bottomw, _topw, _clip_near, _clip_far);
        mat4.translate(proj, proj, [-_xmid - _eye, -_ymid, 0]);  

        let uniProj = gl.getUniformLocation(program, 'proj');       
        gl.uniformMatrix4fv(uniProj, false, proj);	
    }


    
    const canvas = document.getElementById("my_canvas");
    initalGL(canvas);

    //Initial shaders 
    initialShaders();

    // Shader compilation and program setup
    const vs = gl.createShader(gl.VERTEX_SHADER);  
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
   
    //Compile shaders
    compileShader(vs,fs,program);
   
    const cubeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube()), gl.STATIC_DRAW);
    
    // Create skydome and its buffer
    skyBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, skyBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(skydome()), gl.STATIC_DRAW);


    vertexBinding();
    
    // Uniform locations
    let uniModel = gl.getUniformLocation(program, 'model');
    let uniView = gl.getUniformLocation(program, 'view');
    let uniProj = gl.getUniformLocation(program, 'proj');

    // Mouse look setup
    let lastX = canvas.width / 2;
    let lastY = canvas.height / 2;
    let firstMouse = true;
    const sensitivity = 0.1;


    const fpsElement = document.getElementById('fps');



    // Texture loading
    const texture1 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    const src1 = "https://cdn.pixabay.com/photo/2013/09/22/19/14/brick-wall-185081_960_720.jpg";
    loadTextures(texture1, src1);

    const texture2 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    const src2 = "https://cdn.pixabay.com/photo/2016/12/18/21/23/brick-wall-1916752_1280.jpg";
    loadTextures(texture2, src2);

    const texture3 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture3);
    const src3 = "https://cdn.pixabay.com/photo/2013/07/12/17/47/texture-152459_1280.png";
    loadTextures(texture3, src3);

    const texture4 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture4);
    const src4 = "https://cdn.pixabay.com/photo/2015/11/04/17/22/panorama-1023053_1280.jpg";
    loadTextures(texture4, src4);

    const texture5 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture5);
    const src5 = "https://cdn.pixabay.com/photo/2015/12/03/08/50/wood-texture-1074134_1280.jpg";
    loadTextures(texture5, src5);
    
    // Skydome texture
    skyTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, skyTexture);
    const skySrc = "https://images.unsplash.com/photo-1557971370-e7298ee473fb?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    loadTextures(skyTexture, skySrc);
        
    // Set up texture uniforms
    // gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0); 



    function draw(currentTime) {
        // Calculate delta time
        currentTime *= 0.001; // Convert to seconds
        const deltaTime = Math.min(currentTime - (lastFrameTime || currentTime), 0.1); // Limit max delta
        lastFrameTime = currentTime;

        updateFps();

        // Clear the canvas //prep canvas
        gl.clearColor(0.2, 0.3, 0.3, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        // Update camera
        updateCamera(deltaTime);


        // Apply different stereo modes
        switch (viewMode) {
            case 1: // Anaglyph mode (red-cyan)
                gl.viewport(0, 0, canvas.width, canvas.height);
                
                // Left eye (red)
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, -0.0-speration);
                gl.colorMask(true, false, false, false);
                
                // Bind textures and draw
                renderScene();
                
                
                // Clear depth buffer for right eye
                gl.clear(gl.DEPTH_BUFFER_BIT);
                
                // Right eye (cyan)
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, 0.05+speration);
                gl.colorMask(false, true, true, false);
                
                // Bind textures and draw
                renderScene();
                
                // Reset color mask
                gl.colorMask(true, true, true, true);
                break;
                
            case 2: // Side by side
                // Left eye
                gl.viewport(0, 0, canvas.width / 2, canvas.height);
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, -0.05-speration);
                
                renderScene();
                
                // Right eye
                gl.viewport(canvas.width / 2, 0, canvas.width / 2, canvas.height);
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, 0.05+speration);
                
                renderScene();
                break;
                
            case 3: // Mono view (default)
            default:
                gl.viewport(0, 0, canvas.width, canvas.height);
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, 0);
                
                renderScene();
                break;
        }

        // Limit frame rate and request next animation frame / scheduling next frame
        setTimeout(() => {
            window.requestAnimationFrame(draw);
        }, 1000 / TARGET_FPS);
    }

    // Start the rendering
    window.requestAnimationFrame(draw);
    
//-------------------------
//Window & canvas eventListeners


    // Keyboard and mouse setup
    const pressedKeys = {};

    window.addEventListener('keydown', (e) => {
        pressedKeys[e.code] = true;
        
        // Obsługa wszystkich klawiszy w jednym miejscu
        switch (e.code) {
            case 'Escape':
                if (confirm('Do you want to close?')) {
                    window.close();
                }
                break;
            case 'KeyZ':
                viewMode = 1;
                console.log("Switched to anaglyph mode");
                break;
            case 'KeyX':
                viewMode = 2;
                console.log("Switched to side by side mode");
                break;
            case 'KeyC':
                viewMode = 3;
                console.log("Switched to mono view mode");
                break;
            case 'KeyV':
                speration += 0.01;
                break;
            case 'KeyB':
                speration -= 0.01;
                break;
        }
    });

    window.addEventListener('keyup', (e) => {
        pressedKeys[e.code] = false;
    });
    
    // Mouse movement handling
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

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    });
}