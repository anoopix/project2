const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#chirperMsg").animate({ width: 'toggle' }, 350);
}

const sendAjax = (action, data) => {
    $.ajax({
        cache: false,
        type: "POST",
        url: action,
        data: data,
        dataType: "json",
        success: (result, status, xhr) => {
            $("#chirperMsg").animate({ width: 'hide' }, 350);

            window.location = result.redirect;
        },
        error: (xhr, status, error) => {
            const messageObj = JSON.parse(xhr.responseText);

            handleError(messageObj.error);
        }
    });
}

$(document).ready(() => {
    $("#signupForm").on("submit", (e) => {
        e.preventDefault();

        $("#chirperMsg").animate({ width: 'hide' }, 350);

        if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("All fields are required");
            return false;
        }

        if ($("#pass").val() !== $("#pass2").val()) {
            handleError("Passwords do not match");
            return false;
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

        return false;
    });

    $("#loginForm").on("submit", (e) => {
        e.preventDefault();

        $("#chirperMsg").animate({ width: 'hide' }, 350);

        if ($("#user").val() == '' || $("#pass").val() == '') {
            handleError("Username or password is empty");
            return false;
        }

        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
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