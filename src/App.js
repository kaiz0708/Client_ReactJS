import Header from "./Header/header";
import Footer from "./Footer/footer";
import Login from './Login/login'
import Signup from './Signup/signup'
import HomePage from './homepage/homepage'
import InforProduct from './Product/InforProduct'
import Product from './Product/Product'
import ProfileUser from './DataUser/ProfileUser'
import CartUser from './DataUser/CartUser'
import PurchaseUser from './DataUser/PurchaseUser'
import Search from './searchProduct/search'
import ManagerUser from './admin/ManagerUser/ManagerUser'
import ManagerPurchase from './admin/ManagerPurchase/ManagerPurchase'
import { Route , Routes} from "react-router-dom"
import { useEffect , useRef } from "react";
import io from 'socket.io-client'; 

function App() {
  let socket = useRef()
  useEffect(() => {
    socket.current = io.connect('http://localhost:3800')
  }, [])

  useEffect(() => {
    socket.current.emit('join', {check : true})
  }, [])

  useEffect(() => {
    socket.current.on('accept' , data => {
      alert('kikikik')
    })
  }, [socket])
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/' >
          <Route path=":url_cate" element={<Product/>}/>
          <Route path=":url_cate/:url_cate_sub" element={<Product/>}/>
        </Route>
        <Route path='/product'>
          <Route path=':title/:id_product' element={<InforProduct socket={socket} />} />
        </Route>
        <Route path='/user/account/profile' element={<ProfileUser/>}/>
        <Route path='/user/account/cart' element={<CartUser/>}/>
        <Route path='/user/account/purchase' element={<PurchaseUser/>}/>
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/admin/nguyenkyanh07082003/user' element={<ManagerUser/>}/>
        <Route path='/admin/nguyenkyanh07082003/purchase' element={<ManagerPurchase socket={socket} />}/>
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
