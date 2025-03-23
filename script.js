let buttonele = document.getElementById("btn");
buttonele.addEventListener("click", fetchUser);

function fetchUser() {
  let username = document.getElementById("username").value;
  if (!username.trim()) {
    alert("Please enter a username");
    return;
  }
  const url = `https://api.github.com/users/${username}`;
  fetch(url)
    .then((res) => {
      if (res.status === 404) {
        notfound();
        throw new Error("User not found");
      }
      return res;
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      displayData(data);
    })
    .catch((err) => {
      console.error("Error fetching user data:", err);
    });
}

function displayData(data) {
  const existingCard = document.getElementById("card");
  if (existingCard) {
    existingCard.remove();
  }
  let card = document.createElement("div");
  card.setAttribute("id", "card");

  let profile_img = document.createElement("img");
  profile_img.setAttribute("id", "pic");
  profile_img.setAttribute("src", `${data.avatar_url}`);
  card.appendChild(profile_img);

  let title = document.createElement("h1");
  title.textContent = data.login;
  card.appendChild(title);

  let name = document.createElement("h4");
  name.textContent = `Name: ${data.name}`;
  card.appendChild(name);

  let email = document.createElement("p");
  email.textContent = `Email: ${data.email ? data.email : "No email provided"}`;
  card.appendChild(email);

  let location = document.createElement("p");
  location.textContent = `Location: ${
    data.location ? data.location : "No location provided"
  }`;
  card.appendChild(location);

  let repos = document.createElement("p");
  repos.textContent = `Public Repos: ${data.public_repos}`;
  card.appendChild(repos);

  let followers = document.createElement("p");
  followers.textContent = `Followers: ${data.followers}`;
  card.appendChild(followers);

  let following = document.createElement("p");
  following.textContent = `Following: ${data.following}`;
  card.appendChild(following);

  let url = document.createElement("p");
  let a = document.createElement("a");
  a.textContent = `${data.login}`;
  a.setAttribute("href", `${data.html_url}`);
  url.textContent = `Profile: `;
  url.appendChild(a);
  card.appendChild(url);

  document.body.appendChild(card);
}

function notfound() {
  let card = document.createElement("div");
  card.setAttribute("id", "card");

  let title = document.createElement("h1");
  title.textContent = "User not found";
  card.appendChild(title);

  document.body.appendChild(card);
}
