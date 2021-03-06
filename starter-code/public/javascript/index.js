const charactersAPI = new APIHandler("http://localhost:8000")

const htmlGenerator = (id, name, occupation, weapon, cartoon) => {
  return `
            <div class="id">ID: ${id}</div>
            <div class="name">Character Name: ${name}</div>
            <div class="occupation">Character Occupation: ${occupation}</div>
            <div class="cartoon">Is a Cartoon?: ${cartoon}</div>
            <div class="weapon">Character Weapon: ${weapon}</div>
            <br> 
          `;
};

$(document).ready(() => {
  document.getElementById('fetch-all').onclick = function() {
    charactersAPI
      .getFullList()
      .then(characters => {
        let html = '';
        // console.log(characters)
        characters.forEach(character => {
          const { id, name, occupation, weapon, cartoon } = character;
          html += htmlGenerator(id, name, occupation, weapon, cartoon);
        });
        document.querySelector('.character-info').innerHTML = html;
      })
      .catch(err => console.error('ERROR: ', err));
  };

  document.getElementById('fetch-one').onclick = () => {
    const id = document.getElementsByName('character-id')[0].value;
    charactersAPI.getOneRegister(id).then(character => {
      const { id, name, occupation, weapon, cartoon } = character;
      console.log(character)
      document.querySelector('.character-info').innerHTML = htmlGenerator(
        id,
        name,
        occupation,
        weapon,
        cartoon
      );
      document.getElementsByName('character-id')[0].value = '';
    });
  };

  document.getElementById('delete-one').onclick = () => {
    const input = document.getElementsByName('character-id-delete')[0];
    charactersAPI.deleteOneRegister(input.value);
    input.value = '';
  };

  
  document.getElementById('edit-character-form').onsubmit = evt => {
    evt.preventDefault();
    const id = document.getElementById('update-id').value;
    const name = document.getElementById('update-name').value;
    const occupation = document.getElementById('update-occupation').value;
    const weapon = document.getElementById('update-weapon').value;
    const cartoon = document.getElementById('update-cartoon').checked;

    charactersAPI
      .updateOneRegister(id, name, occupation, weapon, cartoon)
      .then(character => {
        const { id, name, occupation, weapon, cartoon } = character;
        document.querySelector('.character-info').innerHTML = htmlGenerator(
          id,
          name,
          occupation,
          weapon,
          cartoon
        );
        document.querySelector('#edit-character-form').reset();
      })
      .catch(err => console.error('ERROR: ', err));
  };

  document.getElementById('new-character-form').onsubmit = evt => {
    evt.preventDefault();
    const name = document.getElementById('new-name').value;
    const occupation = document.getElementById('new-occupation').value;
    const weapon = document.getElementById('new-weapon').value;
    const cartoon = document.getElementById('new-cartoon').checked;

    charactersAPI
      .createOneRegister(name, occupation, weapon, cartoon)
      .then(character => {
        const { id, name, occupation, weapon, cartoon } = character;
        document.querySelector('.character-info').innerHTML = htmlGenerator(
          id,
          name,
          occupation,
          weapon,
          cartoon
        );
        document.querySelector('#new-character-form').reset();
      })
      .catch(err => console.error('ERROR: ', err));
  };
});
