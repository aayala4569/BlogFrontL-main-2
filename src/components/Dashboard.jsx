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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddBlogItems,
  checkToken,
  LoggedInData,
  getBlogItems,
  GetblogItemsByUserId,
  updateBlogItems
} from "../Services/DataService";
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = () => {
  let navigate = useNavigate();
  useEffect(() => {
    //useEffect is the first thing that fires on load
    //put any logic we want to fire onload
    //our effect will fire if we have a change in the state in our depenency
    if (!checkToken()) {
      navigate("/Login");
    } else {
      setTimeout(async () => {
        let loggedInData = LoggedInData();
        console.log(loggedInData);
        let userBlogItems = await GetblogItemsByUserId(loggedInData.userId);
        setBlogItems(userBlogItems);
        console.log(userBlogItems);
        setIsLoading(false);
      }, 1000);
    }

    // let userInfo = LoggedInData();
    // console.log(userInfo);
  }, []);

  //functions
  const handleSetTitle = (e) => setBlogTitle(e.target.value);
  const handleBlogDescription = (e) => setBlogDescription(e.target.value);
  const handleTag = (e) => setBlogTags(e.target.value);
  const handleCategory = (e) => setBlogCategory(e.target.value);
  // const handleSaveImage= ({target}) => setBlogImage(target.files[0]);
 
  const handleClose = () => setShow(false);
  
  //handle show
  const handleShow = (e,{id,userId, publishername,title,image, description,category,tag,isDelted,isPublished}) => {
    setShow(true);
    if (e.target.textContent == "Add Blog Item") {
      setEdit(false);
      
    } else {
      setEdit(true);
      // console.log(blogData);
    }
    setBlogId(id);
    setUserId(userId);
    setPublishername(publishername);
    setBlogImage(image);
    setBlogTitle(title);
    setBlogDescription(description);
    setBlogCategory(category);
    setBlogTags(tag);
    setIsDelted(isDelted);
    setIsPublished(isPublished);
  };

  const [blogUserId, setBlogUserId] = useState(0);
  const [blogpublishername, setBlogpublishername] = useState("")

  //create useStates for our forms
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogItems, setBlogItems] = useState([]);
  const [blogId, setBlogId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [Publishername, setPublishername] = useState("");

  //bools
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelted, setIsDelted] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const handleSave = async ({target:{textContent}}) => {
    // let { publishername, userId } = LoggedInData();
    const Published = {
      Id: blogId,
      UserId: blogUserId,
      Publishername: blogpublishername,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Date: new Date(),
      Category: blogCategory,
      Tag: blogTags,
      IsDelted: false,
      IsPublished: textContent == "Save" || textContent == "Save Changes" ? false: true,
    };
    console.log(Published);
    handleClose();

    let result = false;

    if(edit) {
      result = await updateBlogItems(Published);
    }else {
      result = await AddBlogItems(Published);
    }


    // let result = await AddBlogItems(Published);

    if (result) {
      let userBlogItems = await GetblogItemsByUserId(blogUserId);
      console.log(userBlogItems);
      setBlogItems(userBlogItems);
      console.log(userBlogItems, "yes it works");
    }else {
      alert(`Blog Item not ${edit ? "Updated" : "Added"}`)
    }
  };
  // const handleSaveWithUnpublish = async () => {
  //   let { publishername, userId } = LoggedInData();
  //   const notPublished = {
  //     Id: 0,
  //     UserId: userId,
  //     Publishername: publishername,
  //     Title: blogTitle,
  //     Image: blogImage,
  //     Description: blogDescription,
  //     Date: new Date(),
  //     Category: blogCategory,
  //     Tag: blogTags,
  //     IsDelted: false,
  //     IsPublished: false,
  //   };
  //   console.log(notPublished);
  //   handleClose();
  //   let result = await AddBlogItems(notPublished);

  //   if (result) {
  //     let userBlogItems = await GetblogItemsByUserId(userId);
  //     setBlogItems(userBlogItems);
  //   }
  // };

    //handlePublish 

    const handlePublish = async (item) => {
      console.log("first");
      item.isPublished = !item.isPublished;

      let result = await updateBlogItems(item);
      if(result) 
      {
        let userBlogItems = await GetblogItemsByUserId(blogUserId)
        setBlogItems(userBlogItems);
        console.log(userBlogItems);
      }else{
        alert(`Blog item not ${edit ? "Updated" : "Added"}`);
      }

    }



  //handle our image
  const handleImage = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
    // setBlogImage(target.files[0])
  };

  return (
    <>
      <Container>
        <Button className="me-3" variant="outline-primary" onClick={(e)=> handleShow(e, {blogId,userId,publishername:"", title:"",image:"", description:"",category:"", tag:"",isDelted:false, isPublished:false})}>
          Add Blog Item
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ background: "#2f2f2f" }} closeButton>
            <Modal.Title style={{ background: "#2f2f2f" }}>
              {edit ? "Edit" : "Add"} Blog Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "#2f2f2f" }}>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={blogTitle}
                  onChange={handleSetTitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={blogDescription}
                  onChange={handleBlogDescription}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Category">
                <Form.Select
                  aria-label="Default select example"
                  value={blogCategory}
                  onChange={handleCategory}
                >
                  <option>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Sport">Sports</option>
                  <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tags"
                  value={blogTags}
                  onChange={handleTag}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Image">
                <Form.Label>Pick an Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select Image from file"
                  accept="image/png, image/jpg"
                  // value={blogImage}
                  onChange={handleImage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ background: "#2f2f2f" }}>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        

        <Row>
          <Col>
          {isLoading ?<> <Spinner animation="border" variant="info" /> <h1>Loading ....</h1></> : 
            blogItems.length == 0 ? (
              <h1 className="text-center">
                No Blog Items. Add a Blog Item Above
              </h1>
            ) : (
              <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Publish</Accordion.Header>
                  <Accordion.Body
                    style={{ backgroundColor: "#3f3f3f", color: "azure" }}
                    >
                    {blogItems.map((item, i) =>
                      item.isPublished ? (
                        <ListGroup key={i}>
                          {item.title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2">
                              Delete
                            </Button>
                            <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item) }>Edit</Button>
                            <Button variant="outline-primary mx-2" onClick={() => handlePublish(item)}>
                              Unpublish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                      )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Unpublished</Accordion.Header>
                  <Accordion.Body
                    style={{ backgroundColor: "#3f3f3f", color: "azure" }}
                    >
                    {blogItems.map((item, i) =>
                      !item.isPublished ? (
                        <ListGroup key={i}>
                          {item.title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2">
                              Delete
                            </Button>
                            <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item) }>Edit</Button>
                            <Button variant="outline-primary mx-2" onClick={() => handlePublish(item)}>
                              Publish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                      )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
