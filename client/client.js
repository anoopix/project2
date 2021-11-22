$(document).ready(() => {
    $("#signupForm").on("submit", (e) => {

    });

    $("#loginForm").on("submit", (e) => {

    });

    $("#chirpForm").on("submit", (e) => {
        e.preventDefault();

        $("#chirperMsg").animate({ width: 'hide' }, 350);

        if ($("#chirp").val() == '') {
            handleError("You need to type in something in order to make a chirp!");
            return false;
        }

        sendAjax($("#chirpForm").attr("action"), $("#chirpForm").serialize());

        return false;
    });
});