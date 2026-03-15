import fs from 'fs';
import('./server.js').catch(err => fs.writeFileSync('debug_error.txt', err.stack));
