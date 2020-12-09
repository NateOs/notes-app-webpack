import { generateLastEdited, initializeEditPage } from './views'
import { updateNote, getNotes, removeNote, saveNotes } from './notes'

const noteId = location.hash.substring(1)
const notes = getNotes()
const titleEle = document.querySelector('#note-title')
const bodyEle = document.querySelector('#note-body')
const dateElement = document.querySelector('#last-edited')

initializeEditPage(noteId)

//updating title
titleEle.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

//updating body
bodyEle.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

//removing note from edit page
document.querySelector('#remove-note').addEventListener('click', () => {
    removeNote(noteId)
    location.assign('/index.html')//redirection
})

//updating notes
window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})