import angular from 'angular';
import { importFilesUnderPath, templateCacheGenerator } from 'roblox-es6-migration-helper';

import '../../../css/aliases/aliases.scss';

// import main module definition.
import aliasesModule from './aliasesModule';

importFilesUnderPath(require.context('./constants/', true, /\.js$/));
importFilesUnderPath(require.context('./directives/', true, /\.js$/));
importFilesUnderPath(require.context('./controllers/', true, /\.js$/));
importFilesUnderPath(require.context('./services/', true, /\.js$/));

const templateContext = require.context('./', true, /\.html$/);

templateCacheGenerator(angular, 'aliasesAppTemplates', templateContext);

// shim aliases in global.
window.aliases = aliasesModule;

export default aliasesModule;
