#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 cc_FragTexCoord1;

void main(void)
{
    vec4 c = texture2D(CC_Texture0, cc_FragTexCoord1);
    gl_FragColor = vec4(0.0235*c.w, 0.259*c.w, 0.369*c.w, c.w);
}