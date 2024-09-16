import React, { useState } from "react";
import { Button, Steps, Form, message } from "antd";
import PageLayout from "../../../../components/ComposicionPagina/Layout";
import Apoderado from "./Apoderado";
import tokenItem from "../../../../utils/TokenItem";

const { Step } = Steps;

const FormularioApoderado = () => {
  const [current, setCurrent] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [form] = Form.useForm();

  const next = () => {
    form
      .validateFields()
      .then((values) => {
        setFormValues(values);
        setCurrent(current + 1);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleFinish = async () => {
    try {
      const response = await tokenItem.post("/apoderado/registro", formValues);
      message.success("Apoderado registrado exitosamente");
      console.log("Apoderado creado:", response.data);
      setCurrent(0);
    } catch (error) {
      console.error("Error al registrar apoderado:", error);
      message.error("Error al registrar apoderado");
    }
    console.log("datos enviado", formValues);
  };

  const steps = [
    {
      title: "Datos Apoderado",
      content: <Apoderado form={form} onSubmit={next} values={formValues} />,
    },
    {
      title: "Confirmar Datos",
      content: <Apoderado form={form} values={formValues} disabled={true} />,
    },
  ];

  return (
    <PageLayout>
      <Steps current={current}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Siguiente
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleFinish}>
            Finalizar
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Anterior
          </Button>
        )}
      </div>
    </PageLayout>
  );
};

export default FormularioApoderado;
