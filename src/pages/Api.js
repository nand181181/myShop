import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Api = () => {
  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(6); // lazy loading count
  const [loading, setLoading] = useState(true);

  // Fetch API using axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (error) {
        console.log("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadMore = () => {
    setVisible((prev) => prev + 6);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </div>
    );
  }
  const handleBuyNow = () => {
    navigate("/login");
  };
  return (
    <Container className="my-4">
        <h2>Rest API Product list</h2>
        <hr/>
      <Row>
        {products.slice(0, visible).map((product) => (
          <Col md={3} sm={6} className="mb-3" key={product.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <Card.Body>
                <Card.Title>{product.title.substring(0, 30)}...</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ${product.price} <br />
                  <strong>Category:</strong> {product.category}
                </Card.Text>
               <button className="btn btn-primary w-100" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Lazy Load Next Button */}
      {visible < products.length && (
        <div className="text-center my-3">
          <Button variant="success" onClick={loadMore}>
            Next (Lazy Load)
          </Button>
        </div>
      )}
    </Container>
  );
};

export default function ApiPage() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Loading Page...</p>}>
      <Api />
    </Suspense>
  );
}
