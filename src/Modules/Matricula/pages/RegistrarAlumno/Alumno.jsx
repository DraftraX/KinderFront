import React, { useState, useEffect } from "react";
import { Form, Input, Radio, Select, Cascader, DatePicker } from "antd";
import tokenItem from "../../../../utils/TokenItem";
import { initialFormValues } from "./Data";
import "./Alumno.css";
import dayjs from "dayjs";

const Alumno = ({ form, onSubmit, values, disabled }) => {
  const [apoderados, setApoderados] = useState([]);
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    tokenItem
      .get("/apoderado/todos")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setApoderados(response.data);
        } else {
          console.error(
            "Formato de respuesta incorrecto para apoderados:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error al cargar apoderados:", error);
      });

    tokenItem
      .get("/aula/todos")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setAulas(response.data);
        } else {
          console.error(
            "Formato de respuesta incorrecto para aulas:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error al cargar aulas:", error);
      });
  }, []);

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{
        ...values,
        fecha_nacimiento: values.fecha_nacimiento
          ? dayjs(values.fecha_nacimiento)
          : null,
      }}
      onFinish={onSubmit}
      disabled={disabled}
    >
      <div className="general h-full first-letter:grid grid-cols-2 ">
        <h2 className="text-center text-2xl">Datos Estudiante</h2>
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
          label="Fecha de Nacimiento"
          name="fecha_nacimiento"
          rules={[
            { required: true, message: "Seleccione la fecha de nacimiento!" },
          ]}
        >
          <DatePicker />
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
          label="Direccion"
          name="direccion"
          rules={[{ required: true, message: "Ingrese la Direccion!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lugar Nacimiento"
          name="lugar_nacimiento"
          rules={[
            { required: true, message: "Seleccione el Lugar de nacimiento!" },
          ]}
        >
          <Cascader
            options={[
              {
                value: "San Martin",
                label: "SAN MARTIN",
                children: [
                  {
                    value: "San Martin",
                    label: "SAN MARTIN",
                    children: [
                      {
                        value: "tarapoto",
                        label: "TARAPOTO",
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Apoderado"
          name="id_apoderado"
          rules={[{ required: true, message: "Seleccione una opción!" }]}
        >
          <Select>
            {apoderados.map((apoderado) => (
              <Select.Option key={apoderado.id} value={apoderado.id}>
                {apoderado.nombres}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Aula"
          name="id_aula"
          rules={[{ required: true, message: "Seleccione una opción!" }]}
        >
          <Select>
            {aulas.map((aula) => (
              <Select.Option key={aula.id} value={aula.id}>
                {aula.nombre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default Alumno;
