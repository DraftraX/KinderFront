import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, Avatar, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import sidebarItems from "./data";
import { Link } from "react-router-dom";
import tokenItem from "../../utils/TokenItem";

const { Header, Content, Footer, Sider } = Layout;

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({
    name: "Guest",
    avatar:
      "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
    tipoUsuario: "guest",
  });

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        console.error(
          "No se encontró el nombre de usuario en el localStorage."
        );
        return;
      }

      try {
        const response = await tokenItem.get(`/usuario/usuario/${username}`);
        if (response.data && response.data.length > 0) {
          const userData = response.data[0];

          setUser((data) => ({
            ...data,
            name: userData.username || data.name,
            avatar: userData.avatar || data.avatar,
            tipoUsuario: userData.perfil.perfil || data.tipoUsuario,
          }));
          console.log("Datos del usuario:", userData);
          console.log("Perfil del usuario:", userData.perfil.perfil);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    fetchData();
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const transformMenuItems = (items) => {
    const filteredItems = items.filter((item) => {
      if (user.tipoUsuario === "ADMINISTRADOR") {
        return true;
      } else if (user.tipoUsuario === "DUEÑO") {
        return item.label !== "Administrador";
      } else if (user.tipoUsuario === "DIRECTOR") {
        return item.label !== "Administrador";
      } else if (user.tipoUsuario === "PROFESOR") {
        const excludeLabels = [
          "Administrador",
          "Seguridad",
          "Planificacion",
          "Caja",
          "Reportes",
          "Inscribir Alumno",
          "Inscribir Apoderado",
        ];
        return !excludeLabels.includes(item.label);
      } else if (user.tipoUsuario === "SECRETARIA") {
        const excludeLabels = ["Administrador", "Seguridad", "Planificacion"];
        return !excludeLabels.includes(item.label);
      }
      return item.label === "Pagina Principal";
    });

    return filteredItems.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.to ? <Link to={item.to}>{item.label}</Link> : item.label,
      children: item.children ? transformMenuItems(item.children) : null,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        {user.name}
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        {user.tipoUsuario}
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#fff" }}
        width={200}
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          defaultSelectedKeys={[""]}
          defaultOpenKeys={[""]}
          style={{ height: "100%" }}
          items={transformMenuItems(sidebarItems)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Dropdown menu={menu} placement="bottomRight">
              <Avatar src={user.avatar} />
            </Dropdown>
          </div>
        </Header>
        <Content className="m-4 p-4 bg-white ">{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Team programming ©{new Date().getFullYear()} Created by The
          chamaquitos EIRL
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
