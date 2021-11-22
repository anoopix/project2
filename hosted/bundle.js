"use strict";

var handleChirp = function handleChirp(e) {
  e.preventDefault();
  $("#chirperMsg").animate({
    width: 'hide'
  }, 350);

  if ($("#chirp").val() == '') {
    handleError("You need to type in something in order to make a chirp!");
    return false;
  }

  sendAjax('POST', $("#chirpForm").attr("action"), $("#chirpForm").serialize(), function () {
    loadChirpsFromServer();
  });
  return false;
};

var ChirpForm = function ChirpForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "chirpForm",
    onSubmit: handleChirp,
    name: "chirpForm",
    action: "/maker",
    method: "POST",
    className: "chirpForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "chirp"
  }, "Make a chirp: "), /*#__PURE__*/React.createElement("input", {
    id: "chirp",
    type: "text",
    name: "chirp",
    placeholder: "Chirp"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "chirpSend",
    type: "submit",
    value: "Chirp"
  }));
};

var ChirpList = function ChirpList(props) {
  if (props.chirps.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "chirpList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyChirp"
    }, "You haven't chirped yet!"));
  }

  var chirpNodes = props.chirps.map(function (chirp) {
    return /*#__PURE__*/React.createElement("div", {
      key: chirp._id,
      className: "chirp"
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/img/default_avatar.png",
      alt: "default avatar",
      className: "chirpFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "chirpText"
    }, chirp.chirp), /*#__PURE__*/React.createElement("h3", {
      className: "dateText"
    }, "Chirped at ", chirp.createdData), /*#__PURE__*/React.createElement("button", {
      id: "likeBtn"
    }, "Like"), /*#__PURE__*/React.createElement("button", {
      id: "rechirpBtn"
    }, "Rechirp"), /*#__PURE__*/React.createElement("button", {
      id: "replyBtn"
    }, "Reply"), /*#__PURE__*/React.createElement("button", {
      id: "commentsBtn"
    }, "Comments"));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "chirpList"
  }, chirpNodes);
};

var loadChirpsFromServer = function loadChirpsFromServer() {
  sendAjax('GET', '/getChirps', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ChirpList, {
      chirps: data.chirps
    }), document.querySelector("#chirps"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChirpForm, {
    csrf: csrf
  }), document.querySelector("#makeChirp"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ChirpList, {
    chirps: []
  }), document.querySelector("#chirps"));
  loadChirpsFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#chirperMsg").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#chirperMsg").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
