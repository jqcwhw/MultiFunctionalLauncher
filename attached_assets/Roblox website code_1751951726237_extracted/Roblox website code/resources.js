import { EnvironmentUrls } from 'Roblox';
import aliasesModule from '../aliasesModule';

const aliasesResources = {
  templateUrls: {
    aliasesContainer: 'aliases-container'
  },

  httpUrlConfig: {
    getTags: {
      url: `${EnvironmentUrls.contactsApi}/v1/user/get-tags`,
      withCredentials: true
    },
    setUserTag: {
      url: `${EnvironmentUrls.contactsApi}/v1/user/tag`,
      withCredentials: true
    },
    getFriendsStatus: {
      url: `${EnvironmentUrls.friendsApi}/v1/users/{userId}/friends/statuses`,
      withCredentials: true
    },
    getAliasesGuacConfig: {
      url: `${EnvironmentUrls.apiGatewayUrl}/universal-app-configuration/v1/behaviors/aliases/content`,
      withCredentials: true
    }
  },

  modals: {
    changeAlias: {
      templateUrl: 'change-alias-modal',
      controllerName: 'changeAliasController'
    }
  },

  maxCharactersForUserTag: 20,
  friendsStatus: {
    friends: 'Friends'
  },
  responseStatus: {
    moderated: 'Moderated'
  }
};

aliasesModule.constant('aliasesResources', aliasesResources);

export default aliasesResources;
