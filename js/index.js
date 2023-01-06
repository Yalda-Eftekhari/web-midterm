// setting the variables to connect to the html
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

// This function is used to check if the user is already in the local storage and if not,
//  it will fetch the data from the API and save it to the local storage
// if there is an error, it will alert the user
async function getInfo(e) {
    let username = nameInput.value;
    let data = await JSON.parse(window.localStorage.getItem(username));
    e.preventDefault();
    try {
        if (data != null) {
            getUserInfo(data);
            alerting("Loaded From Local Storage.");
        }
        else{
            let response = await fetch(`https://api.github.com/users/` + username);
            let obj = await response.json();
            if (response.status != 200) {
                if(response.status == 404)
                    alerting("User not found")
                else
                    alerting("Error")
                return Promise.reject(`Request failed with error ${response.status}`);
            }
            getUserInfo(obj);
            window.localStorage.setItem(username, JSON.stringify(obj));
        }
    } catch (e) {
        alerting("An Error Occured");
    }
}

// getUserInfo is used to display the relevant information to the user and if there is no information it will leave it blank
function getUserInfo(obj) {
    avatar.innerHTML = '<img src="' + obj.avatar_url + '" alt="avatar" class="avatar">';
    if (obj.name == null)
        full_name.innerHTML = '<span>' + "Full Name: " + '</span>';
    else
        full_name.innerHTML = '<span>' + "Full Name: " + obj.name + '</span>';
    if (obj.blog == null)
        blog.innerHTML = '<span>' + "Blog Address: " + '</span>';
    else
        blog.innerHTML = '<span>' + "Blog Address: " + obj.blog + '</span>';
    if (obj.location == null)
        location_.innerHTML = '<span>' + "Location: " + '</span>';
    else
        location_.innerHTML = '<span>' + "Location: " + obj.location + '</span>';
    if (obj.bio == null)
        bio.innerHTML = '<span>' + "Bio: " + '</span>';
    else
        bio.innerHTML = '<span>' + "Bio: " + obj.bio + '</span>';
}

// alerting is used to display the alert to the user
function alerting(title) {
    alertresult.style.display = "block";
    alertresult.innerHTML = "<span>" + title + "</span>";
    setTimeout(() => {
        alertresult.style.display = "none";
    }, 3500);
}

// submitButton is used to call the getInfo function
submitButton.addEventListener('click', getInfo);
// this will clear the local storage
window.localStorage.clear();