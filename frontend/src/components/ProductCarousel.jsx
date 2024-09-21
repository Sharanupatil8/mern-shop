import { Link } from 'react-router-dom';
import { Carousel, Image, Row, Col } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Row className="align-items-center">
              <Col md={6} xs={12}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className='d-block w-100'
                  style={{ objectFit: 'cover' }}
                  fluid
                />
              </Col>
              <Col md={6} xs={12} className="text-center text-md-right mt-3 mt-md-0">
                <Carousel.Caption className='carousel-caption'>
                  <h2 className='text-white'>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Col>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
