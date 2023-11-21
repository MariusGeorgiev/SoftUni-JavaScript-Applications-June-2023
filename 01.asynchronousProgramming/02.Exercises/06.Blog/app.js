// TODO:
// attachEvents
// get/load all posts data
// add post options to 'select (update html)
// load data per post by postId
// show post data (update html)
// get/load all coments data
// filter coments based od the selected post
// show filtered coments (update html)

function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener('click', loadPosts)
    document.getElementById("btnViewPost").addEventListener('click', viewPost)
}

async function loadPosts(e) {
    //console.log("...loadPosts...");
    document.getElementById("post-body").innerHTML = "";
    document.getElementById("post-title").innerHTML = "Post Details";
    document.getElementById("post-comments").innerHTML = "";

    const url = "http://localhost:3030/jsonstore/blog/posts";

    const response = await fetch(url);

    const data = await response.json();

    document.getElementById("posts").innerHTML = "";

    Object.entries(data).forEach(([key, value]) => {
        const optionElem = document.createElement("option");
        optionElem.value = key;
        optionElem.textContent = value.title
        document.getElementById("posts").appendChild(optionElem);
    });

    
}

async function viewPost(e) {
    //console.log("...viewPost...");

    let postId = "";
    document.querySelectorAll("option").forEach((o) => {
        if (o.selected) {
            postId = o.value;
        }
    });

    const postUrl = `http://localhost:3030/jsonstore/blog/posts/${postId}`;
    const postResponse = await fetch(postUrl);
    const postData = await postResponse.json();

    document.getElementById("post-title").textContent = postData.title;
    document.getElementById("post-body").textContent = postData.body;

    const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
    const commentsResponse = await fetch(commentsUrl);
    const commentsData = await commentsResponse.json();

    const filteredComments = Object.values(commentsData).filter(
        (x) => x.postId === postId
    );


    document.getElementById("post-comments").innerHTML = "";

    filteredComments.forEach((c) => {
        const liElem = document.createElement("li");
        liElem.textContent = c.text;
        liElem.id = c.id;
        document.getElementById("post-comments").appendChild(liElem);
    });
}

attachEvents();