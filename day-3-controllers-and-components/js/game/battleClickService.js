angular.module('battleClickApp').service('battleClickService', ['$interval', '$window', '$cookies', function ($interval, $window, $cookies) {

    this.total = 0

    this.resetColor = "GRAY"

    this.leftClicks = 0

    this.leftButtonColor = "GRAY"

    this.leftPrice = 10

    this.centerClicks = 0

    this.centerValue = 1

    this.rightClicks = 0

    this.rightButtonColor = "GRAY"

    this.rightPrice = 100

    let autoClickId = []

    let updateColors = () => {
        this.leftButtonColor = (this.total >= 10) ? "WHITE" : "GRAY";
        this.rightButtonColor = (this.total >= 100) ? "WHITE" : "GRAY";
        this.resetColor = (this.centerClicks >= 1) ? "WHITE" : "GRAY";
    }

    let add = () => {
        this.total += this.centerValue
        this.centerClicks += 1
        updateColors()
    }

    this.add = () => {
        this.total += this.centerValue
        this.centerClicks += 1
        updateColors()
    }

    this.multiply = () => {
        if (this.total >= 10) {
            this.centerValue *= 1.2
            this.total -= 10
            this.leftClicks += 1
            updateColors()
        }
    }

    this.reset = () => {
        this.total = 0;
        this.centerValue = 1;
        this.leftClicks = 0;
        this.centerClicks = 0;
        this.rightClicks = 0;
        for (let id of this.autoClickId) {
            $interval.cancel(id)
        }
        this.autoClickId = []
        updateColors()
    }

    this.autoClick = () => {
        if (this.total >= 100) {
            this.total -= this.rightPrice
            autoClickId.push($interval(add, 1000))
            this.rightClicks++
            updateColors()
        }
    }

    this.createCookie = () => {
        $cookies.put("ctotal", this.total)
        $cookies.put("cleftClicks", this.leftClicks)
        $cookies.put("cleftPrice", this.leftPrice)
        $cookies.put("ccenterClicks", this.centerClicks)
        $cookies.put("ccenterValue", this.centerValue)
        $cookies.put("crightClicks", this.rightClicks)
        $cookies.put("crightPrice", this.rightPrice)
        $cookies.put("cautoClickId", autoClickId)
    }

    if ($cookies.get('ccenterClicks')) {
        this.total = parseFloat($cookies.get('ctotal'))
        this.leftClicks = parseFloat($cookies.get('cleftClicks'))
        this.leftPrice = parseFloat($cookies.get('cleftPrice'))
        this.centerClicks = parseFloat($cookies.get('ccenterClicks'))
        this.centerValue = parseFloat($cookies.get('ccenterValue'))
        this.rightClicks = parseFloat($cookies.get('crightClicks'))
        this.rightPrice = parseFloat($cookies.get('crightPrice'))
        autoClickId = []
        for (let i = 0; i < this.rightClicks; i++) {
            autoClickId.push($interval(add, 1000))
            this.rightClicks++
        }
        updateColors();
    }

    if (this.centerClicks !== 0) {
        updateColors()
    }

}])