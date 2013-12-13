var require = {
    baseUrl: '../App',
    paths: {
        'Squire'          : '../spec/libs/Squire/Squire',
        'acceptanceTest' : '../spec/acceptanceTests',
        'unitTest'       : '../spec/unitTests',
    },
};

var expect = chai.expect;
 
mocha.setup({
    ui: 'bdd'
});

var runMocha = function() {
    mocha.run();
};
