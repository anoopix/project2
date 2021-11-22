const handleChirp = (e) => {
    e.preventDefault();

    $("#chirperMsg").animate({ width: 'hide' }, 350);

    if ($("#chirp").val() == '') {
        handleError("You need to type in something in order to make a chirp!");
        return false;
    }

    sendAjax('POST', $("#chirpForm").attr("action"), $("#chirpForm").serialize(), function() {
        loadChirpsFromServer();
    });

    return false;
};

const ChirpForm = (props) => {
    return(
        <form id="chirpForm" onSubmit={handleChirp} name="chirpForm" action="/maker" method="POST" className="chirpForm">
            <label htmlFor="chirp">Make a chirp: </label>
            <input id="chirp" type="text" name="chirp" placeholder="Chirp"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="chirpSend" type="submit" value="Chirp" />
        </form>
    );
};

const ChirpList = function(props){
    if(props.chirps.length === 0){
        return(
            <div className="chirpList">
                <h3 className="emptyChirp">You haven't chirped yet!</h3>
            </div>
        );
    }

    const chirpNodes = props.chirps.map(function(chirp){
        return(
            <div key={chirp._id} className="chirp">
                <img src="assets/img/default_avatar.png" alt="default avatar" className="chirpFace"/>
                <h3 className="chirpText">{chirp.chirp}</h3>
                <h3 className="dateText">Chirped at 5:00 pm on Nov 21, 2021 {chirp.createdData}</h3>
                <button id="likeBtn">Like</button>
                <button id="rechirpBtn">Rechirp</button>
                <button id="replyBtn">Reply</button>
                <button id="commentsBtn">Comments</button>
            </div>
        );
    });

    return(
        <div className="chirpList">
            {chirpNodes}
        </div>
    );
};

const loadChirpsFromServer = () => {
    sendAjax('GET', '/getChirps', null, (data) => {
        ReactDOM.render(
            <ChirpList chirps={data.chirps} />,
            document.querySelector("#chirps")
        );
    });
};

const setup = function(csrf){
    ReactDOM.render(
        <ChirpForm csrf={csrf} />,
        document.querySelector("#makeChirp")
    );

    ReactDOM.render(
        <ChirpList chirps={[]} />,
        document.querySelector("#chirps")
    );

    loadChirpsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});