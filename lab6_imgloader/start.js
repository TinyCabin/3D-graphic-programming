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
  // console.log(vertices);
//	console.log(normals);
 //	console.log(coords);
 //	console.log(triangles);

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


console.log(vertices);
points=triangles.length*3;
console.log("Punkty="+points);
console.log(vert_array);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert_array), gl.STATIC_DRAW);
}


let points = 32;
let gl;

function start() {
    const canvas = document.getElementById("my_canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // FPS Configuration
    const TARGET_FPS = 60;
    const FPS_UPDATE_INTERVAL = 1000; // Update FPS display every second

    // Initialize the WebGL context
    gl = canvas.getContext("webgl2");
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
        frag_color = texture(texture1, TexCoord);
        //frag_color = mix(texture(texture1, TexCoord), texture(texture2, TexCoord), 0.5);

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
    gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 8*4, 6*4);
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

    // Keyboard and mouse setup
    const pressedKeys = {};
    window.addEventListener('keydown', (e) => {
        pressedKeys[e.code] = true;    
        if (e.code === 'Escape') {
            if (confirm('Do you want to close?')) {
                window.close();
            }
        }
    });
    
    let speration = 0;
    let viewMode = 3; 
    window.addEventListener('keydown', (e) => {
        pressedKeys[e.code] = true;    
        if (e.code === 'KeyZ') {
            viewMode = 1; 
            console.log("Switched to anaglyph mode");
        }
        if (e.code === 'KeyX') {
            viewMode = 2; 
            console.log("Switched to side by side mode");
        }
        if (e.code === 'KeyC') {
            viewMode = 3;
            console.log("Switched to mono view mode");
        }
        if (e.code === 'KeyV') {
            speration += 0.01;
        }
        if (e.code === 'KeyB') {
            speration -= 0.01;
        }
    });

    window.addEventListener('keyup', (e) => {
        pressedKeys[e.code] = false;
    });

    // Camera setup with freelook
    let cameraPos = glm.vec3(0, 0, 3);
    let cameraFront = glm.vec3(0, 0, -1);
    let cameraUp = glm.vec3(0, 1, 0);
    let pitch = 0;
    let yaw = -90; // Default looking direction

    
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

    // Texture loading
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
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
    
    const image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
        
        gl.generateMipmap(gl.TEXTURE_2D);   
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);          
    };
    image.crossOrigin = ""; 
    image.src = "https://cdn.pixabay.com/photo/2013/09/22/19/14/brick-wall-185081_960_720.jpg";

    // Texture 2
    const texture2 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, 
                new Uint8Array([255, 0, 0, 255]));
    
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
    image2.src = "https://cdn.pixabay.com/photo/2016/12/18/21/23/brick-wall-1916752_1280.jpg";
        
    // Set up texture uniforms
    gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0); 
    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 1);

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
    }

    //OBJ FILE load:
    

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
        
        // Set up base scene rendering
        renderScene();

        // Apply different stereo modes
        switch (viewMode) {
            case 1: // Anaglyph mode (red-cyan)
                gl.viewport(0, 0, canvas.width, canvas.height);
                
                // Left eye (red)
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, -0.0-speration);
                gl.colorMask(true, false, false, false);
                
                // Bind textures and draw
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture2);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                
                gl.bindTexture(gl.TEXTURE_2D, texture1);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                
                // Clear depth buffer for right eye
                gl.clear(gl.DEPTH_BUFFER_BIT);
                
                // Right eye (cyan)
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, 0.05+speration);
                gl.colorMask(false, true, true, false);
                
                // Bind textures and draw
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture2);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                
                gl.bindTexture(gl.TEXTURE_2D, texture1);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                
                // Reset color mask
                gl.colorMask(true, true, true, true);
                break;
                
            case 2: // Side by side
                // Left eye
                gl.viewport(0, 0, canvas.width / 2, canvas.height);
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, -0.05-speration);
                
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture2);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                
                gl.bindTexture(gl.TEXTURE_2D, texture1);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                
                // Right eye
                gl.viewport(canvas.width / 2, 0, canvas.width / 2, canvas.height);
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, 0.05+speration);
                
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture2);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                
                gl.bindTexture(gl.TEXTURE_2D, texture1);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                break;
                
            case 3: // Mono view (default)
            default:
                gl.viewport(0, 0, canvas.width, canvas.height);
                stereoProjection(-6, 6, -4.8, 4.8, 12.99, -100, 0, 13, 0);
                
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture2);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                
                gl.bindTexture(gl.TEXTURE_2D, texture1);
                gl.drawArrays(gl.TRIANGLES, 0, points);
                break;
        }

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