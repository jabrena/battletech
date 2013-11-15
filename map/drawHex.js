var HEX_RADIUS = 75;
var MAP_WIDTH = 9;
var MAP_HEIGHT = 5;

var createMapMatrix = function(columns, rows) {
	var matrix = [];
	for (var column = 0; column < columns; column++) {
		var verticalArray = [];
		for (var row = 0; row < rows; row++) {
			verticalArray[row] = 1;
		}
		matrix[column] = verticalArray;
	}
	return matrix;
}

var map = {
	path: new Path(),
	size: {
		hexHeight: MAP_HEIGHT,
		hexWidth: MAP_WIDTH
	},
	matrix: createMapMatrix(MAP_HEIGHT, MAP_WIDTH)
}

console.log(map.matrix);

var topLeftPoint = new Point(HEX_RADIUS, HEX_RADIUS);

var createRedMech = function() { 
	redMech = new Raster('redMechImage', topLeftPoint);
	redMech.size.width = 50;
	redMech.size.height = 75;
	redMech.path = new Path();
	redMech.path.strokeColor = 'red';
	redMech.path.closed = false;
}

var createHex = function() {
	var group = new Group();

	var hexagon = new Path.RegularPolygon({
		center: topLeftPoint,
		sides: 6,
		radius: HEX_RADIUS,
		fillColor: 'darkgrey',
		parent: group
	});

	return hexagon;
}

var size = createHex().bounds.size;
for (var y = 0; y < map.size.hexHeight; y++) {
	for (var x = 0; x < map.size.hexWidth; x++) {
		var hex = createHex();
		map.path.add(hex);
		hex.position += size * [x + (y % 2 ? 0.5 : 0), y * 0.75];
	}
}

createRedMech();

var canMove = function(currentPosition, newPosition) {
	var xDiff = Math.abs(newPosition.x - currentPosition.x);
	var yDiff = Math.abs(newPosition.y - currentPosition.y);
	var MaxDistance = 2*HEX_RADIUS;

	console.log("xDiff: " + xDiff);
	console.log("yDiff: " + yDiff);

	return	(xDiff < MaxDistance && yDiff < MaxDistance);
}

var drawPath = function(currentPosition, newPosition) {
	redMech.path.removeSegments();
	redMech.path = new Path(currentPosition, newPosition);
	redMech.path.strokeColor = 'red';
	redMech.path.closed = false;
}

var onMouseMove = function(event) {
	project.activeLayer.selected = false;
	if (event.item) {
		drawPath(redMech.position, event.item.position);
		event.item.selected = true;
	}
}

var onMouseDown = function(event) {
	if (event.item) {
		var selectedHexPosition = event.item.position;
		if(canMove(redMech.position, selectedHexPosition)) {
			redMech.setPosition(selectedHexPosition);
		}
	}
}

