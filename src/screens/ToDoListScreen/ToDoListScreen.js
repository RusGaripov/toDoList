import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToDos, deleteToDo } from '../../actions/toDoListActions'
import { Link } from 'react-router-dom'
import styles from './ToDoListScreen.module.css'


const ToDoListScreen = () => {

    // refs - для картинок
    const refs = useRef([])

    // refs2 - для файлов docx
    const refs2 = useRef([])

    const dispatch = useDispatch()

    const toDoList = useSelector(state => state.toDoList)


    const { toDos, loading } = toDoList

    const today = Math.floor(Date.now() / 1000)

    useEffect(() => {

        dispatch(getToDos())

        for (let i = 0; i < toDos.length; i++) {
            if (toDos[i].file) {
                if (toDos[i].file.toString().slice(0, 10) === 'data:image') {
                    refs.current[i].setAttribute("src", toDos[i].file)
                }

                else {
                    refs2.current[i].setAttribute("href", toDos[i].file)
                }
            }
        }

    }, [dispatch])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteToDo(id))
        }
    }
    return loading ? <div>No Data</div> : (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Заголовок</th>
                        <th>Описание</th>
                        <th>Статус задачи</th>
                        <th>Дата завершения</th>
                        <th>Прикрепленные файлы</th>
                        <th style={{ 'minWidth': '100px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {toDos.map((toDo, index) => {
                        return (
                            <tr key={toDo.id}>
                                <td>{toDo.header}</td>
                                <td>{toDo.description}</td>
                                {toDo.isDone ?
                                    <td style={{ background: 'rgb(130, 255, 102)' }}>Задача выполнена</td>
                                    :
                                    <td> Задача не выполнена</td>
                                }
                                {new Date(toDo.deadline).getTime() / 1000 - today > 0 || toDo.isDone
                                    ?
                                    <td>{toDo.deadline}</td>
                                    :
                                    <td style={{ background: 'red' }}>{toDo.deadline}</td>
                                }
                                <td>
                                    {toDo.file&&toDo.file.toString().slice(0, 10) === "data:image" ? <img
                                        className={styles.image}
                                        ref={(element) => { refs.current[index] = element }}
                                        src=""
                                        alt="Preview"
                                    /> :
                                        <a 
                                        ref={(element) => { refs2.current[index] = element }} 
                                        href="/">Скачать файл
                                        </a>
                                    }
                                </td>
                                <td className={styles.editButtons}>
                                    <Link to={`/edit/${toDo.id}`}><button className={styles.edit}>Edit</button></Link>
                                    <button onClick={() => deleteHandler(toDo.id)} className={styles.delete}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <Link to='/create'>
                <button className={styles.create}>Create</button>
            </Link>
        </div>
    )
}

export default ToDoListScreen
