angular.module('battleClickApp').controller('topPanelController', ['battleClickService', '$window', function (battleClickService, $window) {
    
    this.battleClickService = battleClickService

    $window.onbeforeunload = () => {
        battleClickService.createCookie()
    }
    

}])