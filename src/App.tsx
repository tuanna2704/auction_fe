import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Layout, Menu } from 'antd';
import Register from "pages/Register";

const { Header, Content, Footer } = Layout;

const BaseLayout = () => {
  return (
    <Layout className="layout" style={{ height: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1"><Link to="/">Dashboard</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/create-item">Create Item</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/add-deposit">Deposit</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/register">Register</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/login">Login</Link></Menu.Item>
        </Menu>
      </Header>
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
          <Route path="login" element={<>Login Page</>} />
          <Route path="create-item" element={<>Create Item Page</>} />
          <Route path="add-deposit" element={<>Add Deposit Page</>} />
          <Route path="*" element={<>Not Found Page</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
