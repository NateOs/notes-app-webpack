import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

//Generate NoteDOM
const generateNoteDom = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    // const button = document.createElement('button')
    const statusEl = document.createElement('p')

    // //setup the remove notes button
    // button.textContent = 'x'
    // noteEl.appendChild(button)
    
    // button.addEventListener('click', () => {        
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })

    //setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.setAttribute('href', `/edit.html#${note.id}`)
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //Setup the status message  
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

// Render Application Notes
const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDom(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (noteId) => {
    const notes = getNotes()
    const titleEle = document.querySelector('#note-title')
    const bodyEle = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')

    const note = notes.find( (note) =>  note.id === noteId)

    if (!note) {
        location.assign('/index.html')
    }

    titleEle.value = note.title
    bodyEle.value = note.body
    dateElement.textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`
}

//Generate Last Edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export {
    generateNoteDom,
    generateLastEdited,
    renderNotes,
    initializeEditPage
}