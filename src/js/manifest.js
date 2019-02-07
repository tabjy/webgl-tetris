// TODO: generate manifests automatically from assets folder
export default {
  // TODO: determine attributes, varyings, uniforms programmatically
  shaders: [
    {
      id: 'passthrough.vert',
      type: 'VERTEX_SHADER',
      url: require('../assets/shaders/passthrough.vert.glsl'),
      attributes: [
        {
          name: 'vPosition',
          type: 'vec4'
        }
      ],
      varyings: [],
      uniforms: []
    },
    {
      id: 'passthrough.frag',
      type: 'FRAGMENT_SHADER',
      url: require('../assets/shaders/passthrough.frag.glsl'),
      attributes: [],
      varyings: [],
      uniforms: [
        {
          name: 'fColor',
          type: 'vec4'
        }]
    }
  ]
}
