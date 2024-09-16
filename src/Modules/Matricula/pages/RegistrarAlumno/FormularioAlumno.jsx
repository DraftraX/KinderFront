import React, { useState } from "react";
import { Button, Steps, Form } from "antd";
import PageLayout from "../../../../components/ComposicionPagina/Layout";
import Alumno from "./Alumno";
import tokenItem from "../../../../utils/TokenItem";
import dayjs from "dayjs";

const { Step } = Steps;

const FormularioAlumno = () => {
  const [current, setCurrent] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [form] = Form.useForm();

  const next = () => {
    form
      .validateFields()
      .then((values) => {
        setFormValues(values);
        setCurrent(current + 1);
        setIsDisabled(true);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
    setIsDisabled(false);
  };

  const handleSubmit = () => {
    const formattedValues = {
      ...formValues,
      fecha_nacimiento: formValues.fecha_nacimiento
        ? dayjs(formValues.fecha_nacimiento).format("YYYY-MM-DD")
        : null,
      lugar_nacimiento: formValues.lugar_nacimiento.join(", "),
    };

    tokenItem
      .post("/alumno/registro", formattedValues)
      .then((response) => {
        console.log("Student registered successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error registering the student:", error);
      });
    console.log("Datos del estudiante: ", formattedValues);
  };

  const steps = [
    {
      title: "Datos Estudiante",
      content: (
        <Alumno
          form={form}
          onSubmit={next}
          values={formValues}
          disabled={false}
        />
      ),
    },
    {
      title: "Confirmar Datos",
      content: <Alumno form={form} values={formValues} disabled={true} />,
    },
  ];

  return (
    <PageLayout>
      <Steps current={current}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </PageLayout>
  );
};

export default FormularioAlumno;
