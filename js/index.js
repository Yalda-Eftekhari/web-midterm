const nameInput = document.querySelector('#username');
const submitButton = document.querySelector('.submit');
const saveButton = document.querySelector('.save');
const clearButton = document.querySelector('.clear');
const avatar = document.querySelector('.avatar');
const full_name = document.querySelector('.full_name');
const blog = document.querySelector('.blog_address');
const location_ = document.querySelector('.location');
const bio = document.querySelector('.bio');


async function getInfo(e) {
    let username = nameInput.value;
    e.preventDefault();
    try {
        let response = await fetch(`https://api.github.com/users/` + username);
        let obj = await response.json();
        if (response.status != 200) {
            return Promise.reject(`Request failed with error ${response.status}`);
        }
        getUserInfo(obj);
        let data = await JSON.parse(window.localStorage.getItem(username));
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

function getUserInfo(obj) {
    avatar.innerHTML = '<img src="' + obj.avatar_url + '" alt="avatar" class="avatar">';
    full_name.innerHTML = '<span>' + obj.name + '</span>';
    blog.innerHTML = '<span>' + obj.blog + '</span>';
    location_.innerHTML = '<span>' + obj.location + '</span>';
    bio.innerHTML = '<span>' + obj.bio + '</span>';
}

submitButton.addEventListener('click', getInfo);
