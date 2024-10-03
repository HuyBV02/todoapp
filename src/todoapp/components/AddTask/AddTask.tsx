import { Button, Form, Select, Space, Input } from "antd";
import { Link,useNavigate  } from "react-router-dom";
import { ToDo } from "../../../types/todo.type";
import { useState } from "react";
import { useAppDispatch } from "../../../store";
import { addTask } from "../../todo.slice";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const initialValues: ToDo = {
  title: "",
  description: "",
  types: [],
  isCompleted: false,
  createdAt: new Date().toISOString(),
  id: "",
};

export default function AddTask() {
  const [formData, setFormData] = useState<ToDo>(initialValues);
  const dispatch = useAppDispatch();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = (value: ToDo) => {
    dispatch(addTask(value));
    navigate("/");

  };

  console.log(formData);

  return (
    <div className="mt-[100px]">
      <Form
        className="flex-form p-10 border border-gray-200 rounded-lg shadow-xl"
        name="validate_other"
        {...formItemLayout}
        onFinish={() => handleSubmit(formData)}
        initialValues={{
          "color-picker": null,
        }}
        style={{
          maxWidth: 1000,
          margin: "auto",
          minHeight: "50vh",
          marginBottom: 0,
        }}
      >
        <Form.Item>
          <span className="font-bold text-lg">
            <span style={{ opacity: "0" }}>ToDo App</span>{" "}
            <span> Add task</span>
          </span>
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="types"
          label="Labels"
          rules={[
            {
              required: true,
              message: "Please select your types!",
              type: "array",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Please select labels..."
            value={formData.types}
            onChange={(value) => handleInputChange("types", value)}
          >
            <Option value="1">Work</Option>
            <Option value="2">Study</Option>
            <Option value="3">Entertainment</Option>
            <Option value="4">Family</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button>
              <Link to="/">Home</Link>
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
