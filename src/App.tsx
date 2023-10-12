import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Layout } from 'antd';
import Header from "components/Header";
import Register from "pages/Register";
import Login from "pages/Login";

const { Content, Footer } = Layout;

const BaseLayout = () => {
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
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<>Home</>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="create-item" element={<>Create Item Page</>} />
          <Route path="add-deposit" element={<>Add Deposit Page</>} />
          <Route path="*" element={<>Not Found Page</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
