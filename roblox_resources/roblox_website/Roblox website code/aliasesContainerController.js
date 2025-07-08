import { CurrentUser, EventStream } from 'Roblox';
import aliasesModule from '../aliasesModule';

function aliasesContainerController($scope, $rootScope) {
  'ngInject';

  $scope.init = function () {
    $rootScope.isAliasesLoaded = true;
  };

  $scope.init();
}
aliasesModule.controller('aliasesContainerController', aliasesContainerController);

export default aliasesContainerController;
