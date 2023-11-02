import {
  Button,
  Container,
  Form,
  Modal,
  Accordion,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap/";
import React, {useEffect} from "react";
import { useState } from "react";
import { getPublishedBlogItems } from "../Services/DataService";

const BlogPage = () => {
  const [blogItems, setBlogItems] = useState([]);

  useEffect(() => {
    getThePublishedItems();
  }, []);

  const getThePublishedItems = async () => {
    let publishedItems = await getPublishedBlogItems();
    console.log(publishedItems);
    setBlogItems(publishedItems);
  };

  return (
    <Container>
      <Row>
        <Col>
          {blogItems.map((item, i) => (
            <div key={i}>
              {i % 2 == 0 ? (
                <Row key={i}>
                  <Col md={6}>
                    <Row style={{ border: "solid" }}>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={12}
                        >
                        <h2>{item.title}</h2>
                      </Col>
                      <Col md={12}>
                        <Row>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={6}
                            >
                            <h2>{item.publishername}</h2>
                          </Col>
                          <Col className="d-flex justify-content-center" md={6}>
                          <p>{item.date}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={12}
                        >
                        <img src={item.image} width="800px" height="400px"/>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    style={{ border: "solid" }}
                    className="d-flex justify-content-center"
                    md={6}
                    >
                    <p>{item.description}</p>
                  </Col>
                </Row>
              ) : (
                <Row key={i}>
                  <Col
                    style={{ border: "solid" }}
                    className="d-flex justify-content-center"
                    md={6}
                    >
                    <p>{item.description}</p>
                  </Col>
                  <Col md={6}>
                    <Row style={{ border: "solid" }}>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={12}
                        >
                        <h2>{item.title}</h2>
                      </Col>
                      <Col md={12}>
                        <Row>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={6}
                            >
                            <h2>{item.publishername}</h2>
                          </Col>
                          <Col className="d-flex justify-content-center" md={6}>
                          <p>{item.date}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={12}
                        >
                        <img src={item.image} width="800px" height="400px"/>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
            
          </div>
          ))}
        </Col>
      </Row>
      </Container>
      );
};

export default BlogPage;
