module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['js', 'jsx'],
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
};
