import React, { Component } from "react";
import { Form, Input, InputNumber, Button, Radio } from "antd";
class FormComponent extends Component {
  initInputElement = (item) => {
    return (
      <Form.Item
        rules={item.rule}
        label={item.label}
        name={item.name}
        key={item.name}
      >
        <Input />
      </Form.Item>
    );
  };
  initSelectElement = (item) => {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        min={item.min}
        rules={item.rule}
        max={item.max}
      >
        <InputNumber />
      </Form.Item>
    );
  };
  initButtonElement = (item) => {
    return (
      <Form.Item key={item.name}>
        <Button htmlType={item.htmlType} type="primary">
          提交
        </Button>
      </Form.Item>
    );
  };
  initRadioElement = (item) => {
    return (
      <Form.Item key={item.name} label={item.label} name={item.name}>
        <Radio.Group>
          <Radio value={false}>禁止</Radio>
          <Radio value={true}>启用</Radio>
        </Radio.Group>
      </Form.Item>
    );
  };
  initForm = () => {
    const { formConfig } = this.props;

    if (!formConfig || (formConfig && formConfig.length === 0)) {
      return false;
    }
    const formList = [];
    formConfig.forEach((item) => {
      if (item.type === "Input") {
        formList.push(this.initInputElement(item));
      }
      if (item.type === "Select") {
        formList.push(this.initSelectElement(item));
      }
      if (item.type === "Radio") {
        formList.push(this.initRadioElement(item));
      }
      if (item.type === "Button") {
        formList.push(this.initButtonElement(item));
      }
      
    });
    return formList;
  };
  onSubmit = (value) => {
    console.log(value);
  };
  render() {
    return (
      <>
        <Form onFinish={this.onSubmit}>{this.initForm}</Form>
      </>
    );
  }
}

export default FormComponent;
