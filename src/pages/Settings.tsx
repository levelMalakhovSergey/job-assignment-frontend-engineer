import React from "react";
import { Card, Form, Input, Button, Avatar, Typography, message } from "antd";
import { useAtomValue } from "jotai";

import { Layout } from "../components/Layout";
import { PLACEHOLDER_USER_IMAGE } from "../utils/constants";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { userAtom } from "../store/auth";

const { Title, Text } = Typography;

export default function Settings() {
  const user = useAtomValue(userAtom);
  const update = useUpdateUser();

  const onFinish = async (values: any) => {
    // prepare payload: only send fields that are present
    const payload: Record<string, any> = {};
    if (values.image) payload.image = values.image;
    if (values.username) payload.username = values.username;
    if (values.bio) payload.bio = values.bio;
    if (values.email) payload.email = values.email;
    if (values.password) payload.password = values.password;

    try {
      await update.mutateAsync(payload);
      message.success("Settings updated");
    } catch (e: any) {
      message.error(e?.message || "Failed to update settings");
    }
  };

  return (
    <Layout>
      <div className="settings-page">
        <div className="container">
          <Card className="settings-card">
            <div className="settings-header">
              <Title level={2}>Your Settings</Title>
              <Text type="secondary">
                Keep your profile up to date so your readers can recognize you.
              </Text>
            </div>

            <div className="settings-avatar">
              <Avatar size={72} src={user?.image || PLACEHOLDER_USER_IMAGE} />
              <div className="settings-avatar-info">
                <Text strong>Profile avatar</Text>
                <Text type="secondary">
                  Provide a profile image URL to replace this picture.
                </Text>
              </div>
            </div>

            <Form
              layout="vertical"
              className="settings-form"
              onFinish={onFinish}
              initialValues={{
                image: user?.image || "",
                username: user?.username || "",
                bio: user?.bio || "",
                email: user?.email || "",
              }}
            >
              <Form.Item name="image" label="Profile picture URL">
                <Input placeholder="URL of profile picture" />
              </Form.Item>
              <Form.Item name="username" label="Your Name">
                <Input placeholder="Your Name" />
              </Form.Item>
              <Form.Item name="bio" label="Short bio about you">
                <Input.TextArea rows={6} placeholder="Short bio about you" />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="large" htmlType="submit" loading={update.isLoading}>
                  Update Settings
                </Button>
              </Form.Item>
            </Form>

            <div className="settings-logout">
              <a className="btn btn-outline-danger" href="/#/logout">
                Or click here to logout.
              </a>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
