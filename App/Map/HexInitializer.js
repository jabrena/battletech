define([], function() {
	var getHexSize = function(hexRadius) {
	    var xHexSize = hexRadius*Math.sqrt(2.25);
	    var yHexSize = hexRadius*Math.sqrt(3);
	    return { width: xHexSize, height: yHexSize };
	}

	return { getHexSize: getHexSize };
});