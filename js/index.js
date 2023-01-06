const nameInput = document.querySelector('#username');
const submitButton = document.querySelector('.submit');
const saveButton = document.querySelector('.save');
const clearButton = document.querySelector('.clear');
const avatar = document.querySelector('.avatar');
const full_name = document.querySelector('.full_name');
const blog = document.querySelector('.blog_address');
const location_ = document.querySelector('.location');
const bio = document.querySelector('.bio');
const alertresult = document.querySelector('.alert_result');


async function getInfo(e) {
    let username = nameInput.value;
    e.preventDefault();
    try {
        let response = await fetch(`https://api.github.com/users/` + username);
        let obj = await response.json();
        if (response.status != 200) {
            if(response.status == 404)
                alerting("User not found")
            else if(response.status == 403)
                alerting("API rate limit exceeded")
            else
                alerting("Error")
            return Promise.reject(`Request failed with error ${response.status}`);
        }
        getUserInfo(obj);
    } catch (e) {
        alerting("Invalid input!");
    }
}

function getUserInfo(obj) {
    avatar.innerHTML = '<img src="' + obj.avatar_url + '" alt="avatar" class="avatar">';
    if (obj.name == null)
        full_name.innerHTML = '<span>' + "name: " + '</span>';
    else
        full_name.innerHTML = '<span>' + "name: " + obj.name + '</span>';
    if (obj.blog == null)
        blog.innerHTML = '<span>' + "blog: " + '</span>';
    else
        blog.innerHTML = '<span>' + "blog: " + obj.blog + '</span>';
    if (obj.location == null)
        location_.innerHTML = '<span>' + "location: " + '</span>';
    else
        location_.innerHTML = '<span>' + "location: " + obj.location + '</span>';
    if (obj.bio == null)
        bio.innerHTML = '<span>' + "bio: " + '</span>';
    else
        bio.innerHTML = '<span>' + "bio: " + obj.bio + '</span>';
}


function alerting(title) {
    alertresult.style.display = "block";
    alertresult.innerHTML = "<span>" + title + "</span>";
    setTimeout(() => {
        alertresult.style.display = "none";
    }, 3500);
}

submitButton.addEventListener('click', getInfo);