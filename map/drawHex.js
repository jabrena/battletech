var values = {
	amount: 3
};

var group = new Group();

var hexagon = new Path.RegularPolygon({
	center: view.center,
	sides: 6,
	radius: 75,
	fillColor: 'darkgrey',
	parent: group
});

group.remove();


group = new Group();
var size = hexagon.bounds.size;
for (var y = 0; y < values.amount; y++) {
	for (var x = 0; x < values.amount; x++) {
		var copy = hexagon.clone();
		copy.position += size * [x + (y % 2 ? 0.5 : 0), y * 0.75];
		group.addChild(copy);
	}
}