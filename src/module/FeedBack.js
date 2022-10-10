import axios from 'axios'
import style from './styleFeedBack.module.scss'
import { BiUser , BiLike } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { removeFeedBack, updateListFeedBack } from '../features/feedback/feedback'

let ApiDeleteFeedBack = async (id_feed , id_feed_sub) => {
    let res = await axios.post('http://localhost:3800/delete/feedback' , {
        id_feed,
        id_feed_sub
    })

    let dataResponse = await res.data
    return dataResponse
}


let ApiUpdateFeedBack = async (id_feed, id_feed_sub, content_new) => {
    let res = await axios.post('http://localhost:3800/update/feedback', {
        id_feed,
        id_feed_sub,
        content_new
    })
    let dataResponse = await res.data
    return dataResponse
}

let DeleteFeedBack = (id_feed, id_feed_sub, dispatch) => {
    ApiDeleteFeedBack(id_feed, id_feed_sub).then(res => {
        dispatch(removeFeedBack(res.id_feed_sub))
    })
}

let UpdateFeedBack = (id_feed, id_feed_sub, content_new, dispatch) => {
    ApiUpdateFeedBack(id_feed, id_feed_sub, content_new).then(res => {
        dispatch(updateListFeedBack(res.new_content))
    })
}

let UpdateLike = (socket, stateLike, id, id_feed) => {
    socket.current.emit('update_like', {
        check : stateLike,
        id_feed_sub : id,
        id_feed
    })
}






function FeedBack({data , id_feed, socket}){
    let id_user = localStorage.getItem('id_user')
    console.log(data)
    const dispatch = useDispatch()
    const [ updateFeed, setUpdateFeed ] = useState(false)
    const [ newContent , setNewContent ] = useState('')
    const [ stateLike , setStateLike ] = useState(false)
    const [ like, setLike ] = useState(data.like) 
    useEffect(() => {
        socket.current.on('update_state', content => {
            if(content.id_feed_sub === data.id){
                if(content.check === true){
                    setLike(like + 1)
                }else{
                    setLike(like - 1)
                }
            }
        })
    }, [socket , data, like])
    return (
        <div className={style.feedback_sub} >
            <div className={style.avatar_parent} >
                {data.avatar === ' ' ? <BiUser style={{fontSize : '50px'}} /> : <img className={style.avatar} width={50} height={50} src={data.avatar} alt='kikiki' /> }
            </div>
            <div className={style.content} >
                <div className={style.content_sub} >
                    <div className={style.title_content} >{data.username}</div>
                    <div className={style.title_content} >
                        <span>{data.time} </span>
                        <span>{data.date}</span>
                    </div>
                    <div className={style.content_feedback} >{data.content}</div>
                    <div onClick={() => {
                        UpdateLike(socket, !stateLike, data.id, id_feed)
                        stateLike === false ? setLike(like + 1) : setLike(like - 1)
                        setStateLike(!stateLike)
                    }} ><BiLike style={stateLike ? {color : 'blue'} : null} className={style.status_like} /> <span>{like}</span></div>

                    {updateFeed ? <div className={style.update_feedback} >

                        <input className={style.content_new} onChange={(e) => {
                            setNewContent(e.target.value)
                        }} placeholder='Sửa bình luận' />

                        <div className={style.update_function} >
                            <span className={style.update_function_sub} onClick={() => {
                                UpdateFeedBack(id_feed, data.id, newContent, dispatch)
                            }} >Sửa</span>

                            <span className={style.update_function_sub} onClick={() => {
                                setUpdateFeed(false)
                            }} > Đóng</span>
                        </div>
                        
                    </div> : null}

                </div>
                

                <div className={style.btn_function} >
                    {id_user === data.id_user ? <div>

                    <div className={style.btn_function_sub} onClick={() => {
                        DeleteFeedBack(id_feed, data.id, dispatch)
                    }} >Xóa</div>

                    <div className={style.btn_function_sub} onClick={() => {
                        setUpdateFeed(true)
                    }} >Sửa</div>
                    </div> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default FeedBack