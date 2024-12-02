import { Button, Form, Select, Space, Input } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToDo } from "../../../types/todo.type";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { editTask } from "../../todo.slice";
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

export default function EditTask() {
  const [formData] = Form.useForm();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const {id} = useParams();

  const editingData = useSelector((state: RootState) => state.todo.editing);

  useEffect(() => {
    formData.setFieldsValue(editingData || initialValues);
  }, [editingData, formData]);

  const handleSubmit = (value: ToDo) => {
    dispatch(editTask(value));
    formData.resetFields(); 
    navigation("/");
  };

  console.log("form", formData.getFieldsValue());

  return (
    <div className="mt-[100px]">
      <Form
        form={formData}
        className="flex-form p-10 border border-gray-200 rounded-lg shadow-xl"
        name="validate_other"
        {...formItemLayout}
        onFinish={(values)=>handleSubmit({...values, id: id})}
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
            <span> Edit task</span>
          </span>
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
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
          <Select mode="multiple" placeholder="Please select labels...">
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
              <Link to="/">Cancel</Link>
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
