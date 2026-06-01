import React from "react";
import { Card, Form, Input, Button, Typography, Space } from "antd";

import { Layout } from "./components/Layout";

const { Title, Paragraph } = Typography;

export default function Editor() {
  return (
    <Layout>
      <div className="editor-page">
        <div className="container">
          <Card className="editor-card">
            <div className="editor-header">
              <Title level={2}>Create a New Article</Title>
              <Paragraph type="secondary">
                Write something great. Use markdown syntax for a nicer article preview.
              </Paragraph>
            </div>

            <Form layout="vertical" className="editor-form">
              <Form.Item label="Article Title">
                <Input size="large" placeholder="Article Title" />
              </Form.Item>
              <Form.Item label="What’s this article about?">
                <Input placeholder="A short description of your article" />
              </Form.Item>
              <Form.Item label="Write your article (in markdown)">
                <Input.TextArea rows={10} placeholder="Write your article (in markdown)" />
              </Form.Item>
              <Form.Item label="Enter tags">
                <Input placeholder="tag1, tag2, tag3" />
              </Form.Item>
              <Form.Item>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button type="primary" size="large">
                    Publish Article
                  </Button>
                  <Paragraph type="secondary" className="editor-note">
                    You can add comma-separated tags to categorize the article.
                  </Paragraph>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
