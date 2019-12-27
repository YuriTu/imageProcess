import {getGlContext} from "./glutil";

let gl = null;
let canvas = null;
class Render {
    constructor(props) {
        this._init = () => {
            this._initGL();
        };

        this._initGL = () => {
            let o = getGlContext();
            gl = o.gl;
            canvas = o.canvas;
        }

        this._init();
    }

    render(){

    }

}
