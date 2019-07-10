const charactersAPI = new APIHandler("http://localhost:8000")

$(document).ready(() => {
  document.getElementById('fetch-all').onclick = function () {
    charactersAPI.getFullList().then(response => {
      console.log(response.data);
    })
      .catch(err => {
        console.log(err);
      });
  }

  document.getElementById('fetch-one').onclick = function () {
    let id = document.getElementById('fetch-one-id').value;
    charactersAPI.getOneRegister(id).then(response => {
      console.log(response.data);
      document.getElementsByClassName('name')[0].innerHTML = response.data.name;
      document.getElementsByClassName('occupation')[0].innerHTML = response.data.occupation;
      document.getElementsByClassName("cartoon")[0].innerHTML=response.data.cartoon;
      document.getElementsByClassName("weapon")[0].innerHTML=response.data.weapon;

    })
      .catch(err => {
        console.log(err);
      });
  };


  document.getElementById('delete-one').onclick = function () {

  }

  document.getElementById('edit-character-form').onsubmit = function () {

  }

  document.getElementById('new-character-form').onsubmit = function () {

  }
})
