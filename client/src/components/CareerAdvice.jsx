import React from 'react';
import { Container, Row, Col, Card, CardDeck } from 'react-bootstrap';
import axios from 'axios';

class CareerAdvice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomArticles: [],
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    const pageNum = Math.floor(Math.random() * 3) + 1;
    (console.log(pageNum));
    axios.get('https://www.themuse.com/api/public/posts', {
      params: {
        tag: 'Engineering',
        page: pageNum,
      },
    })
      .then((response) => {
        console.log(response.data.results);
        const articleStart = Math.floor(Math.random() * 9) + 1;
        this.setState({
          isLoaded: true,
          randomArticles: response.data.results.slice(articleStart, articleStart + 6),
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    const { error, isLoaded, randomArticles } = this.state;
    if (error) {
      return <Container>Error</Container>;
    }
    if (!isLoaded) {
      return <Container>Loading...</Container>;
    }
    return (
      <Container>
        <Row className="my-3">
          <Col>
            <h4 className="ml-2">Career advice</h4>
          </Col>
        </Row>
        <Row className="my-3 justify-content-center">
          <CardDeck>
            {/* eslint arrow-body-style: ["error", "always"] */}
            {randomArticles.slice(0, 3).map((article) => {
              return (
                <Card key={article.id} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={article.refs.primary_image} />
                  <Card.Body>
                    <Card.Title>{article.name}</Card.Title>
                    <Card.Text>
                      {article.excerpt}
                    </Card.Text>
                    <Card.Link href={article.refs.landing_page} target="blank">View Article</Card.Link>
                  </Card.Body>
                </Card>
              );
            })}
          </CardDeck>
        </Row>
        <Row className="my-3 justify-content-center">
          <CardDeck>
            {randomArticles.slice(3, 6).map((article) => {
              return (
                <Card key={article.id} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={article.refs.primary_image} />
                  <Card.Body>
                    <Card.Title>{article.name}</Card.Title>
                    <Card.Text>
                      {article.excerpt}
                    </Card.Text>
                    <Card.Link href={article.refs.landing_page} target="blank">View Article</Card.Link>
                  </Card.Body>
                </Card>
              );
            })}
          </CardDeck>
        </Row>
      </Container>
    );
  }
}

export default CareerAdvice;
