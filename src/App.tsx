import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { Layout } from 'antd';
import store from "store";
import { Provider } from "react-redux";
import Header from "components/Header";
import Register from "pages/Register";
import Login from "pages/Login";
import AddDeposit from "pages/AddDeposit";
import { useEffect } from "react";
import { getUserInfo } from "utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "store/user.reducer";

const { Content, Footer } = Layout;

const BaseLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bootstrap = async () => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const response = await getUserInfo();
      if (response.id) {
        dispatch(setUser(response));
      }
    } else {
      navigate('/login');
    }
  }

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <Layout className="layout" style={{ height: '100vh' }}>
      <Header />
      <Content style={{ padding: '0 50px', height: 'calc(100vh - 64px)' }}>
        <div className="site-layout-content" style={{ minHeight: 'calc(100vh - 138px)' }}>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} Your Website Name
      </Footer>
    </Layout>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<>Home</>} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="create-item" element={<>Create Item Page</>} />
            <Route path="add-deposit" element={<AddDeposit />} />
            <Route path="*" element={<>Not Found Page</>} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App;
