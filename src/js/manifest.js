export default {
  shaders: [
    {
      id: 'passthrough.vert',
      type: 'VERTEX_SHADER',
      url: require('../assets/shaders/passthrough.vert.glsl'),
      attributes: [
        {
          name: 'vPosition',
          type: 'vec4'
        },
        {
          name: 'vColor',
          type: 'vec4'
        }
      ],
      varyings: [
        {
          name: 'fColor',
          type: 'vec4'
        }
      ]
    },
    {
      id: 'passthrough.frag',
      type: 'FRAGMENT_SHADER',
      url: require('../assets/shaders/passthrough.frag.glsl'),
      attributes: [],
      varyings: [
        {
          name: 'fColor',
          type: 'vec4'
        }],
      uniforms: []
    }
  ]
}
