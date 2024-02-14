const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
popupTitle = popupBox.querySelector('header p'),
closeIcon = document.querySelector('header i'),
titleEl = document.querySelector('input'),
descEl = document.querySelector('textarea'),
addBtn = document.querySelector('button ');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let notes = [];

let isUpdate = false, updateId;

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onClick="() => updateNote(${index}, '${note.title}', '${note.description}')" class="uil uil-edit"></i>
                                <i onClick="() => deleteNote(${index})" class="uil uil-trash"></i>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liTag);
    });
}

function deleteNote(noteId) {
    let confirmDelete = confirm("Delete this note?");
    if (!confirmDelete) return;
    notes.splice(noteId, 1); 
    showNotes();
}

function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    titleEl.value = title;
    descEl.value = desc;
    addBtn.innerText = 'Update Note';
    popupTitle.innerText = 'Editing a Note';
    popupBox.classList.add('show');
}

function addOrUpdateNote() {
    let noteTitle = titleEl.value,
    noteDesc = descEl.value,
    noteDate = `${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`;

    if (isUpdate) {
        notes[updateId] = { title: noteTitle, description: noteDesc, date: noteDate };
        isUpdate = false; // Reset the flag
    } else {
        notes.push({ title: noteTitle, description: noteDesc, date: noteDate });
    }

    titleEl.value = '';
    descEl.value = '';
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.remove('show');

    showNotes(); 
}

addBox.addEventListener('click', () => {
    titleEl.value = '';
    descEl.value = '';
    isUpdate = false;
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.add('show');
});

closeIcon.addEventListener('click', () => {
    isUpdate = false;
    titleEl.value = '';
    descEl.value = '';
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.remove('show');
});

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addOrUpdateNote(); 
});
