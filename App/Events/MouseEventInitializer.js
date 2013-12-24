define(['radio'], function(radio) {
    var _leftMouseButton = {
    	isDown: false,
    	clickedAt: {
    		x: undefined,
    		y: undefined
    	}
    }

    var _mouseDragEvent = {
    	clickedAt: {
    		x: undefined,
    		y: undefined
    	},
    	drugTo: {
    		x: undefined,
    		y: undefined
    	}
    }

    _setLeftMouseButton = function(isDown, x, y) {
    	_leftMouseButton.isDown = isDown;
    	_leftMouseButton.clickedAt.x = x;
    	_leftMouseButton.clickedAt.y = y;
    }

    _setMouseDragEvent = function(drugToX, drugToY, _leftMouseButton) {
    	_mouseDragEvent.drugTo.x = drugToX;
    	_mouseDragEvent.drugTo.y = drugToY;
    	_mouseDragEvent.clickedAt.x = _leftMouseButton.clickedAt.x;
    	_mouseDragEvent.clickedAt.y = _leftMouseButton.clickedAt.y;
    }

    var _leftMouseButtonAction = function(e) {
    	return e.which === 1;
    }

	var initMouseEvents = function($canvas) {
	    $canvas.on('mousedown', function(e) {
	        if (_leftMouseButtonAction(e)) {
	        	_setLeftMouseButton(true, e.offsetX, e.offsetY);
            radio('mouseDownEvent').broadcast(_leftMouseButton);
	        }
	    });

	    $canvas.on('mouseup', function(e) {
	        if (_leftMouseButtonAction(e)) {
	        	_setLeftMouseButton(false);
	        }
	    });

	    $canvas.on('mousemove', function(e) {
	        if (_leftMouseButton.isDown) {
				_setMouseDragEvent(e.offsetX, e.offsetY, _leftMouseButton);
        		radio('mouseDragEvent').broadcast(_mouseDragEvent);
	        }
	    });
	}

	return { initMouseEvents: initMouseEvents }
});