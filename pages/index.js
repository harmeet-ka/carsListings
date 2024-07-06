// pages/index.js

import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Col, Card, Form, Pagination } from 'react-bootstrap';
import { useState } from 'react';
import styles from '../styles/SearchBar.module.css';
const Home = ({ cars }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(6); // Number of cars per page

  // Filtering cars based on search term
  const filteredCars = cars.filter(car =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.year.toString().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  return (
    <Container>
      <Head>
        <title>Car Listings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="text-center my-4" style={{marginLeft:"15px"}}>Car Listings</h2>

        {/* Search Bar */}
        <Form.Group controlId="search" style={{marginLeft:"15px"}} >
          <Form.Control
            type="text"
                   className="search-bar"
            placeholder="Search by make, model, year..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>

        {/* Car Listings */}
        <Row xs={1} md={2} lg={3} className="g-4 " style={{marginLeft:"15px"}}>
          {currentCars.map(car => (
            <Col key={car.id} style={{marginTop:"20px"}}>
              <Card>
                <Card.Img variant="top" src={`cars/${car.images[0]}`} alt={`${car.make} ${car.model}`} />
                <Card.Body>
                  <Card.Title>{car.id}. {car.make} {car.model}</Card.Title>
                  <Card.Text>Year: {car.year}</Card.Text>
                  <Card.Text>Price: ${car.price}</Card.Text>
                  <Link href={`/cars/${car.id}`} legacyBehavior>
                    <a className="btn btn-primary" style={{color:"blue"}}>View Details</a>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <Pagination className="my-4 justify-content-center" style={{display:"flex",justifyContent:"center"}}>
          {Array.from({ length: Math.ceil(filteredCars.length / carsPerPage) }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </main>
    </Container>
  );
};

export default Home;

export async function getServerSideProps() {
  // Fetch car data from the JSON file
  const res = await fetch(`${process.env.BASE_URL}/cars.json`);
  const cars = await res.json();

  return {
    props: {
      cars,
    },
  };
}
