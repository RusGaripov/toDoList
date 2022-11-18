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
                isDone
            }))
        navigate('/')
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
            <input
                type="file"
                placeholder='Прикрепленные файлы'
                onChange={(e) => {
                    setFiles(e.target.files[0].name)
                }
                }
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                multiple
            />
            <button type='submit'>Create</button>
        </form>
    )
}

export default CreateToDoScreen
