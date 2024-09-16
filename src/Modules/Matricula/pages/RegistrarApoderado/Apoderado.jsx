import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Select, Cascader, Button } from "antd";
import { initialFormValues } from "./Data";
import "./Apoderado.css";

const Apoderado = ({ form, onSubmit, values, disabled }) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={values || initialFormValues}
      onFinish={onSubmit}
      disabled={disabled}
    >
      <div className="general h-full first-letter:grid grid-cols-2 ">
        <h2 className="text-center text-2xl">Datos Apoderado</h2>
        <Form.Item
          label="DNI"
          name="dni"
          rules={[{ required: true, message: "Ingrese el DNI!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Nombre"
          name="nombres"
          rules={[{ required: true, message: "Ingrese el nombre!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="apellidos"
          rules={[{ required: true, message: "Ingrese el apellido!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Telefono"
          name="telefono"
          rules={[{ required: true, message: "Ingrese el telefono!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Direccion"
          name="direccion"
          rules={[{ required: true, message: "Ingrese la Direccion!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ocupacion"
          name="ocupacion"
          rules={[{ required: true, message: "Ingrese la ocupacion!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Sexo"
          name="sexo"
          rules={[{ required: true, message: "Seleccione el Sexo!" }]}
        >
          <Radio.Group>
            <Radio value="m"> Masculino </Radio>
            <Radio value="f"> Femenino </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Estado Civil"
          name="estado_civil"
          rules={[{ required: true, message: "Ingrese el estado civil!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Ingrese el correo!" }]}
        >
          <Input type="email" />
        </Form.Item>
      </div>
    </Form>
  );
};

export default Apoderado;
