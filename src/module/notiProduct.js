import style from './stylenofiProduct.module.scss'
import { FiX } from "react-icons/fi";

function NotiProduct({text , setCheck}){
    return (
        <div className={style.nofitication} >
            <div className={style.form} >
                <div className={style.exit} >
                    <div className={style._exit} onClick={() => {
                        setCheck(false)
                    }} >
                        <FiX style={{fontSize : '20px' , margin : 'auto'}} />
                    </div>
                </div>
                <div className={style.content} >{text}</div>
                <div className={style.btn_exit} >
                    <button className={style.btn_exit_sub} onClick={() => setCheck(false)} >Đóng</button>
                </div>
            </div>
        </div>
    )
}

export default NotiProduct