export default {
  shaders: [
    {
      id: 'passthrough.frag',
      type: 'FRAGMENT_SHADER',
      url: require('../shaders/passthrough.frag.glsl'),
      attributes: [],
      varyings: [
        {
          name: 'vColor',
          type: 'vec4'
        }],
      uniforms: []
    },
    {
      id: 'passthrough.vert',
      type: 'VERTEX_SHADER',
      url: require('../shaders/passthrough.vert.glsl'),
      attributes: [
        {
          name: 'vPosition'
        }
      ],
      varyings: [
        {
          name: 'vColor',
          type: 'vec4'
        }
      ]
    }
  ]
}
