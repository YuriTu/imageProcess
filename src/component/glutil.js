export const getGlContext = (canvas) => {
    if (!canvas){
        canvas = document.createElement('canvas');
    }
    const validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
    let nameIndex = 0;
    let gl = null;

    while (!gl && nameIndex < validContextNames.length) {
        let contextName = validContextNames[nameIndex];

        try {
            gl = canvas.getContext(contextName);
        } catch (e) {
            gl = null;
        }

        if (!gl || typeof gl.getParameter !== 'function') {
            gl = null;
        }

        nameIndex++;
    }

    return {canvas,gl}
};


export const supportGl = () => {
    return !!getGlContext();
};
