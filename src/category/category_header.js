import { Link } from "react-router-dom";
import style from './category_header.module.scss'
function CategoryHeader({data , classProperty}){
    return (
        <div className={classProperty} >
            {data.map(cateParent => 
                    <div className={style.category} key={cateParent.id} >
                        <div className={style.category_parent}>
                            <Link width='100%' className={style.header_text_dicoration} to={cateParent.url}><div>{cateParent.title}</div></Link>
                            <div className={style.category_subs} >
                                {cateParent.list_sub.map(cateSub =>
                                    <div className={style.category_sub} key={cateSub.id} style={{width : "200px"}} >
                                      <Link className={style.header_text_dicoration} key={cateSub.id} to={cateParent.url + cateSub.url} ><div>{cateSub.title}</div></Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default CategoryHeader