/**
 * Higher level component. (STATEFUL)
 * It performs calls to the server and pass its state down to the children
 */
import * as React from "react";
import { Col, Container, Row, Nav } from "react-bootstrap";
import { IArticle, NewsServer } from "../API/NewsAPI";
import { AppNavBars } from "./AppNavBars";
import { HeadlinesContainer } from "./HeadlinesContainer";

interface INewsContainerProps {}

interface INewsContainerState {
  Articles: IArticle[];
}

export class NewsContainer extends React.PureComponent<
  INewsContainerProps,
  INewsContainerState
> {
  public constructor(p: INewsContainerProps) {
    super(p);
    this.state = {
      Articles: [],
    };
  }

  /** Following the Guidelines of react in this phase we will subscribe our listeners and perform fetching data. */
  public componentDidMount() {
    this._fetchHeadlines();
  }

  public render(): JSX.Element {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Nav.Link href="./">
                <h1 style={{ color: "#d30d1d" }}>The Newsroom</h1>
              </Nav.Link>
            </Col>
          </Row>

          <AppNavBars OnSearchNews={this._searchNews} />
          <HeadlinesContainer Articles={this.state.Articles} />
        </Container>
      </div>
    );
  }

  /**
   * Call the API to fetch data by a specific string
   * @argument string
   */
  private readonly _searchNews = async (query: string) => {
    const result = await NewsServer.GetArticlesByKeyword(query);
    if (!result) {
      throw new Error("API returned false. Articles not loaded");
    }

    this.setState({
      Articles: result.articles,
    });
  };

  /**
   * Initial fetch to render Headlines
   */
  private readonly _fetchHeadlines = async () => {
    const result = await NewsServer.GetNewsHeadlines();
    if (!result) {
      throw new Error("API returned false. Articles not loaded");
    }

    this.setState({
      Articles: result.articles,
    });
  };
}
