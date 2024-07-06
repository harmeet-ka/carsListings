import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Col,  Button } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const CarDetail = ({ car }) => {
  const { make, model, year, price, description, specifications, images } = car;
console.log(car,"car")
  return (
    <Container>
      <Head>
        <title>{make} {model} - Car Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-center my-4">{make} {model}</h1>

        {/* Image Carousel */}
        {/* <Carousel className="mb-4">
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img style={{maxHeight:"100vh"}}
                className="d-block w-100"
                src={image}
                alt={`${make} ${model}`}
              />
            </Carousel.Item>
          ))}
        </Carousel> */}
       <Carousel> 
       {images.map((image, index) => (
                  <div> 
                      <img  className="d-block w-80 p-5" src={image} alt={`${make} ${model}`}/> 
                      <p className="legend">{`Image ${index+1}`}</p> 
  
                  </div> ))}
                        </Carousel>
        {/* Car Details */}
        <Row>
          <Col>
            <p><strong>Year:</strong> {year}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Description:</strong> {description}</p>
          </Col>
          <Col>
            <p><strong>Specifications:</strong></p>
            <ul>
              <li><strong>Engine:</strong> {specifications.engine}</li>
              <li><strong>Transmission:</strong> {specifications.transmission}</li>
              <li><strong>Mileage:</strong> {specifications.mileage}</li>
              <li><strong>Fuel Type:</strong> {specifications.fuelType}</li>
            </ul>
          </Col>
        </Row>

        {/* Back to Home Page Button */}
        <Link href="/">
          <Button variant="secondary" className="mt-3">Back to Home</Button>
        </Link>
      </main>
    </Container>
  );
};

export default CarDetail;

export async function getServerSideProps({ params }) {
  const { id } = params;

  // Fetch specific car details based on id from the JSON file
  const res = await fetch(`${process.env.BASE_URL}/cars.json`);
  const cars = await res.json();
  const car = cars.find(car => car.id === parseInt(id));

  return {
    props: {
      car,
    },
  };
}
