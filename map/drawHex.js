var values = {
	amount: 3
};

var createRedMech = function() { 
	redMech = new Raster('redMechImage', view.center);
	visible = false;
	redMech.size.width = 50;
	redMech.size.height = 75;
}

var createHex = function() {
	var group = new Group();

	var hexagon = new Path.RegularPolygon({
		center: view.center,
		sides: 6,
		radius: 75,
		fillColor: 'darkgrey',
		parent: group
	});

	return hexagon;
}

var size = createHex().bounds.size;
for (var y = 0; y < values.amount; y++) {
	for (var x = 0; x < values.amount; x++) {
		var hex = createHex();
		hex.position += size * [x + (y % 2 ? 0.5 : 0), y * 0.75];
	}
}

createRedMech();

var onMouseMove = function(event) {
	project.activeLayer.selected = false;
	if (event.item)
		event.item.selected = true;
}

var onMouseDown = function(event) {
	if (event.item) {
		var selectedHexPosition = event.item.position;
		redMech.setPosition(selectedHexPosition);
		redMech.visible = true;
	}
}

