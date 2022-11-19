import React, { useEffect, useState } from 'react'
import styles from './EditToDoScreen.module.css'
import { getToDo, updateToDo } from '../../actions/toDoListActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'


const EditToDoScreen = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const toDoDetails = useSelector(state => state.toDoDetails)

    const { loading, toDo } = toDoDetails

    const params = useParams();

    const { id } = params

    const [idTodo, setIdToDo] = useState('')
    const [isDone, setIsDone] = useState(false)
    const [header, setHeader] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [files, setFiles] = useState('')
    const [filename, setFilename] = useState('')

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        dispatch(getToDo(id))
        setHeader(toDo.header)
        setDescription(toDo.description)
        setDeadline(toDo.deadline)
        setIdToDo(toDo.id)
        setIsDone(toDo.isDone)
        // setFiles(toDo.files)
    }, [toDo])


    const submitHandler = (e) => {
        let finishedTime = new Date().toISOString().slice(0, 10)
        e.preventDefault()
        dispatch(updateToDo(
            {
                id: idTodo,
                header,
                description,
                isDone,
                deadline: isDone ? finishedTime : deadline,
                files,
            }))
        navigate('/')
    }

    const handleChange = () => {
        setChecked(!checked);
        setIsDone(!isDone)
    };

    const fileUploadHandler = (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            localStorage.setItem("recent-image", reader.result)
            setFiles(reader.result)
        })
        reader.readAsDataURL(e.target.files[0])
    }

    return loading ? <div>No Data</div> : (
        <form
            onSubmit={submitHandler}
            className={styles.container}>
            <input type='text' placeholder='Заголовок' value={header} onChange={(e) => setHeader(e.target.value)} />
            <input type='text' placeholder='Описание' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input
                type='date'
                value={deadline}
                placeholder='Дата завершения'
                onChange={(e) => setDeadline(e.target.value)}
            />
            <input
                type="file"
                name="files[]"
                id="fileUpload"
                onChange={fileUploadHandler}
                accept=".jpg, .jpeg, .png"
                // value={files}
                placeholder='Прикрепленные файлы'
            />
            <p style={{ marginBottom: '0px', marginTop: '30px', fontSize: '12px' }}>
                Поставьте галочку, если задача выполнена
            </p>
            <input
                type='checkbox'
                style={{ width: '10px', marginTop: '10px' }}
                checked={isDone}
                onChange={handleChange}
            />
            <button type='submit'>Update</button>
        </form>
    )
}

export default EditToDoScreen
