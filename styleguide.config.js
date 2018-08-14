const path = require('path');
const glob = require('glob');

module.exports = {
  title: 'React Style Guide Example',
  components: './src/index.tsx',
  //propsParser: require('react-docgen-typescript').withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } }).parse,
  showSidebar: false,
  styles: {
		Playground: {
			preview: {
				paddingLeft: 0,
				paddingRight: 0,
				borderWidth: [[0, 0, 0, 0]],
				borderRadius: 0,
			},
    },
  },
};