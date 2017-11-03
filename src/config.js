'use strict';

module.exports = function(set, get, has) {

	set('db.mongodb', 'mongodb://127.0.0.1/pratice_node_project');
	set('web.port', 3000);
	set('web.session.secret', 'test');
	
};