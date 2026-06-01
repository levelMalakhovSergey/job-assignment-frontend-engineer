import React from "react";
import { Card, Form, Input, Button, Avatar, Typography } from "antd";

import { Layout } from "./components/Layout";
import { PLACEHOLDER_USER_IMAGE } from "./utils/constants";

const { Title, Text } = Typography;

export default function Settings() {
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
              <Avatar size={72} src={PLACEHOLDER_USER_IMAGE} />
              <div className="settings-avatar-info">
                <Text strong>Default avatar</Text>
                <Text type="secondary">
                  Provide a profile image URL to replace this default picture.
                </Text>
              </div>
            </div>

            <Form layout="vertical" className="settings-form">
              <Form.Item label="Profile picture URL">
                <Input placeholder="URL of profile picture" />
              </Form.Item>
              <Form.Item label="Your Name">
                <Input placeholder="Your Name" />
              </Form.Item>
              <Form.Item label="Short bio about you">
                <Input.TextArea rows={6} placeholder="Short bio about you" />
              </Form.Item>
              <Form.Item label="Email">
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Password">
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="large" htmlType="submit">
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
