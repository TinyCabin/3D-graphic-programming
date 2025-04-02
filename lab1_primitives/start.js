function start() {
    const canvas = document.getElementById("my_canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    console.log("WebGL version: " + gl.getParameter(gl.VERSION));
    console.log("GLSL version: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
    console.log("Vendor: " + gl.getParameter(gl.VENDOR));

    const vsSource = `#version 300 es
        precision highp float;
        in vec2 position;
        void main(void) {
            gl_Position = vec4(position, 0.0, 1.0);
        }`;

    const fsSource = `#version 300 es
        precision highp float;
        out vec4 frag_color;
        uniform vec3 uColor;
        void main(void) {
            frag_color = vec4(uColor, 1.0);
        }`;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vs));
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fs));
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert(gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);

    const uColor = gl.getUniformLocation(program, "uColor");
    let color = [1.0, 0.5, 0.25];
    gl.uniform3fv(uColor, color);

    let vertices = [
        0.0, 0.5,
        0.35, 0.35,
        0.5, 0.0,
        0.35, -0.35,
        0.0, -0.5,
        -0.35, -0.35,
        -0.5, 0.0,
        -0.35, 0.35
    ];

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    let primitive = gl.TRIANGLE_FAN;

    function draw() {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(primitive, 0, vertices.length / 2);
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    window.addEventListener('keydown', function(event) {
        switch (event.key) {
            case '1': primitive = gl.POINTS; break;
            case '2': primitive = gl.LINES; break;
            case '3': primitive = gl.LINE_LOOP; break;
            case '4': primitive = gl.LINE_STRIP; break;
            case '5': primitive = gl.TRIANGLES; break;
            case '6': primitive = gl.TRIANGLE_FAN; break;
            case 'r': color = [1.0, 0.0, 0.0]; break;
            case 'g': color = [0.0, 1.0, 0.0]; break;
            case 'b': color = [0.0, 0.0, 1.0]; break;
        }
        gl.uniform3fv(uColor, color);
    });
}
