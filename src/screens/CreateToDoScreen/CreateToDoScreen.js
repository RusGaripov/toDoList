import React, { useState } from 'react'
import styles from './CreateToDoScreen.module.css'
import { createToDo } from '../../actions/toDoListActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import uniqid from 'uniqid';


const CreateToDoScreen = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [header, setHeader] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [isDone, setIsDone] = useState(false)
    const [files, setFiles] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createToDo(
            {
                id: uniqid(),
                header,
                description,
                deadline,
                files,
                isDone,
            }))
        navigate('/')
    }

    const fileUploadHandler = (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setFiles(reader.result)
        })
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <form onSubmit={submitHandler} className={styles.container}>
            <input type='text' placeholder='Заголовок' onChange={(e) => setHeader(e.target.value)} />
            <input type='text' placeholder='Описание' onChange={(e) => setDescription(e.target.value)} />
            <input
                type='date'
                placeholder='Дата завершения'
                onChange={(e) => setDeadline(e.target.value)}
            />
            <p style={{ marginBottom: '0px' }}>Файлы .docx | .jpg | .png</p>
            <input
                type="file"
                name="files[]"
                id="fileUpload"
                onChange={fileUploadHandler}
            />
            <button type='submit'>Create</button>
        </form>
    )
}

export default CreateToDoScreen
