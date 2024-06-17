module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.js'],
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	moduleFileExtensions: ['js'],
	transform: {
		'^.+\\.(js)$': 'babel-jest',
	},
};
