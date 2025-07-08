import angular from 'angular';
import aliasesModule from '../aliasesModule';

function changeAliasController(
  $scope,
  $log,
  contactsService,
  $uibModalInstance,
  injectedData,
  aliasesLayoutService,
  aliasesResources
) {
  'ngInject';

  $scope.modalData = injectedData;
  $scope.modalLayout = angular.copy(aliasesLayoutService.changeAliasModalLayout);
  $scope.saveUserTag = function() {
    const profileUserId = $scope.modalData.library.currentProfileUserId;
    const { userTag } = $scope.modalData.library;
    const originalUserTag = $scope.modalData.library.currentUserTag;

    contactsService.setUserTag(profileUserId, userTag).then(
      function success(result) {
        $scope.modalData.library.currentUserTag = $scope.modalData.library.userTag;
        $uibModalInstance.dismiss();
      },
      function error(result) {
        if (result && result.data) {
          const { status } = result.data;
          const { setUserTagResponses } = $scope.modalLayout;
          if (status === aliasesResources.responseStatus.moderated) {
            $scope.modalData.library.userTag = ''; // clean it up based on design request
            $scope.modalLayout.displayError = setUserTagResponses.moderationError;
          }
        }
        $scope.modalLayout.isRequestFailed = true;
      }
    );
  };

  $scope.close = function() {
    $scope.modalData.library.userTag = $scope.modalData.library.currentUserTag;
    $uibModalInstance.dismiss();
  };

  $scope.resetInputStatus = function() {
    $scope.modalLayout.isRequestFailed = false;
  };
}
aliasesModule.controller('changeAliasController', changeAliasController);

export default changeAliasController;
