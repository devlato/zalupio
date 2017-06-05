#!/usr/bin/env node

process.title = 'zalupio';

require('../lib/bin').run(null, function(err){
	if(err){
		process.exit(1);
	}
});
