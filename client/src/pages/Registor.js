import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Registor = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log("Success:", values);
      await axios.post("http://localhost:3001/api/v1/users/register", values);
      console.log("Success:", values);

      message.success("Register Successfully");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  return (
    <>
      <Header />

      <div className="container" style={{ minHeight: "78vh" }}>
        <div className="row my-5">
          <div className="card col-md-6 mx-auto p-0">
            <div className="register-page bg-light p-5 ">
              <div className="register-page bg-light">
                {Loading && <Spinner />}
                <Form
                  className=""
                  layout="vertical"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Username"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                        unique: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    size="large"
                    className="p-0 m-0 d-inline-block clear-fix"
                  >
                    <Link className="" to="/login">
                      I have Already account
                    </Link>
                  </Form.Item>

                  <Form.Item {...tailLayout} size="large" className="pt-0 mt-0">
                    <Button
                      type="primary"
                      className="float-end"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Registor;
