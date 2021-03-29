//House Moses//
var submit = document.querySelector('.submit').addEventListener("click", submitPost)
var checkout = document.getElementsByClassName("checkout");
var checkin = document.getElementsByClassName("checkin");

function submitPost(event) {
  event.preventDefault()
  const title = document.querySelector('input[name="title"]').value;
  const author = document.querySelector('input[name="author"]').value;
  fetch('library', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      author: author,
    }),
  })
    .then((data) => {
      console.log(data);
      window.location.reload(true);
    });
}

Array.from(checkin).forEach(function(element) {
  element.addEventListener('click', function() {
  let _id = event.target.dataset.value;
  let checkinText = event.target.dataset.value === "Available"
    fetch('library', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_id": _id
        })
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(checkout).forEach(function(element) {
  element.addEventListener('click', function() {
  let _id = event.target.dataset.value;
  let shouldCheckout = document.querySelector('.availability').innerText === "Available"
    fetch('library', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_id": _id,
          "shouldCheckout": shouldCheckout 
        })
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});
