import React from "react";
import { Card, Form, Input, Button, Typography, Space, message } from "antd";
import { useHistory } from "react-router-dom";

import { useCreateArticle } from "../hooks/useCreateArticle";

import { Layout } from "../components/Layout";

const { Title, Paragraph } = Typography;

export default function Editor() {
  const history = useHistory();
  const createMutation = useCreateArticle();

  const onFinish = async (values: any) => {
    const { title, description, body, tags } = values;
    const tagList = typeof tags === "string" && tags.trim() ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [];

    try {
      const article = await createMutation.mutateAsync({ title, description, body, tagList });
      message.success("Article created");
      history.push(`/${article.slug}`);
    } catch (err: any) {
      message.error(err?.message || "Failed to create article");
    }
  };
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

            <Form layout="vertical" className="editor-form" onFinish={onFinish} name="editorForm">
              <Form.Item name="title" label="Article Title" rules={[{ required: true, message: 'Please enter a title' }]}>
                <Input size="large" placeholder="Article Title" />
              </Form.Item>
              <Form.Item name="description" label="What’s this article about?" rules={[{ required: true, message: 'Please enter a short description' }]}>
                <Input placeholder="A short description of your article" />
              </Form.Item>
              <Form.Item name="body" label="Write your article (in markdown)" rules={[{ required: true, message: 'Please write the article body' }]}>
                <Input.TextArea rows={10} placeholder="Write your article (in markdown)" />
              </Form.Item>
              <Form.Item name="tags" label="Enter tags">
                <Input placeholder="tag1, tag2, tag3" />
              </Form.Item>
              <Form.Item>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button type="primary" size="large" htmlType="submit" loading={createMutation.isLoading}>
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
