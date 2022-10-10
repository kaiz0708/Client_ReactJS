import { Link } from 'react-router-dom'

function Admin() {
    return (
        <div>
            <Link to='/admin/nguyenkyanh07082003/user'>Quản lí người dùng</Link>
            <Link to='/admin/nguyenkyanh07082003/purchase'>Quản lí đơn hàng</Link>
        </div>
    )
}

export default Admin