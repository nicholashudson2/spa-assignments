$(document).ready(() => {
    let total = 0
    let add = 1
    let leftButtonClicks = 0
    let centerButtonClicks = 0
    let autoClickers = 0
    let autoClickId = []

    let formatButtons = () => {
        (total < 10) ? $("#leftButton").css("background-color", "GRAY") : $("#leftButton").css("background-color", "WHITE");
        (total < 100) ? $("#rightButton").css("background-color", "GRAY") : $("#rightButton").css("background-color", "WHITE");
        (total === 0 && centerButtonClicks === 0) ? $("#resetButton").css("background-color", "GRAY") : $("#resetButton").css("background-color", "WHITE");
        $("#clickCounter").html(centerButtonClicks)
        $('#total').html('Total: ' + total.toFixed(2))
        $("#centerButton").html(add.toFixed(2))
        $("#multiplierCounter").html("Multiplied: " + leftButtonClicks + " Times")
        $('#header').html('Total: ' + total.toFixed(2))
        $("#autoClickCount").html("Added: " + autoClickers)
    }

    let autoClick = () => {
        if (total >= 100) {
            total = total - 100
            autoClickId.push(setInterval(() => $("#centerButton").trigger("click"), 1000))
            formatButtons()
        }
    }

    let restartAutoClick = () => {
        autoClickId.push(setInterval(() => $("#centerButton").trigger("click"), 1000))
        formatButtons()
    }

    let reset = (event) => {
        total = 0;
        add = 1;
        leftButtonClicks = 0;
        centerButtonClicks = 0;
        autoClickers = 0;
        for (let id of autoClickId) {
            clearInterval(id)
        }
        autoClickId = []
    }

    let createCookie = () => {
        setCookie('totalCookie', total, 7)
        setCookie('addCookie', add, 7)
        setCookie('leftButtonClicksCookie', leftButtonClicks, 7)
        setCookie('centerButtonClicksCookie', centerButtonClicks, 7)
        setCookie('autoClickIdCookie', autoClickId, 7)
        setCookie('autoClickersCookie', autoClickers, 7)
    }

    if (getCookie('totalCookie') !== 0) {
        total = parseFloat(getCookie('totalCookie'))
        add = parseFloat(getCookie('addCookie'))
        leftButtonClicks = parseFloat(getCookie('leftButtonClicksCookie'))
        centerButtonClicks = parseFloat(getCookie('centerButtonClicksCookie'))
        autoClickers = parseFloat(getCookie('autoClickersCookie'))
        autoClickId = []
        for (let i = 0; i < autoClickers; i++) {
            restartAutoClick()
        }
        formatButtons();
    }

    $("#leftButton").click((event) => {
        if (total >= 10) {
            add = add * 1.2
            leftButtonClicks++
            total = total - 10
            formatButtons()
        }
    })

    $("#centerButton").click((event) => {
        total = total + add
        centerButtonClicks++
        formatButtons()
    })

    $("#rightButton").click((event) => {
        autoClick()
        autoClickers++
        formatButtons()
    })

    $("#resetButton").click((event) => {
        reset()
        formatButtons()
        window.refresh()
    })

    $(window).on("unload", ((event) => {
        createCookie()
    }))

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

})