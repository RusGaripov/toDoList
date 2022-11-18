import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToDos, deleteToDo } from '../../actions/toDoListActions'
import { Link } from 'react-router-dom'
import styles from './ToDoListScreen.module.css'

const ToDoListScreen = () => {

    const dispatch = useDispatch()

    const toDoList = useSelector(state => state.toDoList)


    const { toDos, loading } = toDoList

    const today = Math.floor(Date.now() / 1000)

    useEffect(() => {
        dispatch(getToDos())
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
                    {toDos.map((toDo) => {
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
                                <td>{toDo.files}</td>
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
