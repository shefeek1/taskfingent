import React, { useState } from 'react'
import { Navbar, Container, Nav, Button, Row, Col, InputGroup, FormControl, Form , Table, Alert} from 'react-bootstrap'

function Home() {
  const [table, setTable] = useState(false)
  const [item, setitem] = useState(0)
  const [rmvbtn,setremovebtn]=useState(0)
  const [removeitem, setremoveitem] = useState(0)
  const [rowCount, setrowCount] = useState(0)
  // const [adder, setadder]=useState(false)
  const [addbtn, setaddBtn] = useState(false)
  const [products, setProducts] = useState([])

    function addRow(){
      setitem(rowCount)
      // setadder(!adder)
      // console.log("No of item is", item);
  }
  // console.log("No of item is", item);

  const items = []

  for (let i = 1; i <= item; i++) {
    items.push(
      <Form onSubmit={add}>
        <Col lg={6} style={{ marginLeft: "25%", backgroundColor:"red" }}>

          <InputGroup >
            <FormControl
              placeholder="Product Code"
              aria-label="Product Code"
              name="productcode"
              aria-describedby="basic-addon1"

            />
            <FormControl
              placeholder="Product Name"
              aria-label="Product Name"
              name="productname"
              aria-describedby="basic-addon1"

            />
            <FormControl
              placeholder="Quantity"
              aria-label="Quantity"
              name="productqty"
              aria-describedby="basic-addon1"

            />
            <Button variant="dark" type='submit' style={{ border: "1px solid grey" }}>ADD </Button>
          </InputGroup>

        </Col>

      </Form>
    )
  }
  const removitems = []
  for (let i = 1; i <= removeitem; i++) {
    removitems.push(
      <Form onSubmit ={remove}>


        <Col lg={6} style={{ marginLeft: "25%" }}>

          <InputGroup  >
            <FormControl
              placeholder ="Product Code"
              aria-label="Product Code"
              name="productcode"
              aria-describedby="basic-addon1"

            />
            <FormControl
              placeholder="Quantity"
              aria-label="Quantity"
              name="productqty"
              aria-describedby="basic-addon1"

            />
            <Button variant="dark" type='submit' style={{ border: "1px solid grey" }}>Update </Button>
          </InputGroup>

        </Col>
      </Form>

    )

  }

  function add(event){
    event.preventDefault()
   // alert("clicked")
  
   let pcode = event.target.productcode.value
   let pname = event.target.productname.value
   let pqty  = event.target.productqty.value
   const prd = { pcode, pname, pqty }
   

   if (pcode !== "" & pname !== "" & pqty !== "")
   {
    setProducts([...products, prd])
    alert("Item added")
    console.log(products);
   }

   for (let item of products) {
   if (pcode !== "" & pname !== "" & pqty !== "") {
      if (item.pcode == pcode) {
        let newqty = Number(item.pqty) + Number(pqty)
        setProducts([...products, item.pqty = newqty])
        console.log(" new product is ",products);
       }
    }
  }


  }
  function remove(event)
  {
    event.preventDefault()

    let pcod = event.target.productcode.value
    let pqnty = event.target.productqty.value

    let index = products.findIndex(data => data.pcode == pcod)
    alert("Items removed successfully.")
    
    if (products[index].pqty <  pqnty  ){
      pqnty = products[index].pqty
    }

    setProducts([...products, products[index].pqty -=  pqnty ])
  }

  return (
    <div><Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Product Inventory</Navbar.Brand>
        <Nav className="me-auto">
          <Button variant="light" onClick={() =>{ setaddBtn(!addbtn)
           setTable(false)
           setremovebtn(false)}}
          >Add Products</Button>
        </Nav>

        <Nav className="me-auto">
          <Button variant="light" onClick={()=>{
            setremovebtn(!rmvbtn)
             setTable(false)
             setaddBtn(false)
          }}>Remove Products</Button>
        </Nav>

        <Nav className="me-auto">
          <Button variant="light" onClick={()=>
          {
          setTable(!table)
          setaddBtn(false)
          setremovebtn(false)
          }}>List Products</Button>

        </Nav>
      </Container>
    </Navbar>

      {addbtn ?
        <Row>
          <Col lg={4} md={4} sm={10} xs={12} style={{ marginLeft: "32%", marginTop: "50px" }}>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter number of products to be added"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setrowCount(e.target.value)}

              />
              <Button variant="dark" onClick={addRow} >ADD </Button>
            </InputGroup>
          </Col>
        </Row>
        : null}
        {rmvbtn ?
        <Row>
          <Col lg={4} style={{ marginLeft: "32%", marginTop: "50px" }}>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter no of item to be removed"
                aria-label="itemremove"
                aria-describedby="basic-addon1"
                onChange={(e) =>  setrowCount(e.target.value)}
              />
              <Button variant="dark" onClick={()=>setremoveitem(rowCount)} >Enter</Button>
            </InputGroup>
          </Col>
          {removitems}
        </Row>


        : null
      }

{(addbtn) ? items : null}

{(table) ? <Col lg={6} style={{ marginLeft: "25%", marginTop: "50px" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>

              <th>Product Code</th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>

            {

              products.map((item) =>
                item.pcode ?

                  <tr>

                    <td>{item.pcode}</td>
                    <td>{item.pname}</td>
                    <td>{item.pqty}</td>
                  </tr> : null
              )
            }
          </tbody>
        </Table>
      </Col>:null}
    
    </div>
  )
}

export default Home