/**
 * Container for the Headlines news (STATELESS)
 * Defined from the parent what needs to be rendered.
 */
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { IArticle } from "../API/NewsAPI";

interface IHeadlinesContainerProps {
  Articles: IArticle[];
}

export class HeadlinesContainer extends React.PureComponent<
  IHeadlinesContainerProps
> {
  public render(): JSX.Element {
    const p = this.props;
    // Get all the article without content
    // TODO refactor this and below the other filter. Better ways to do these actions.
    const sideArticle = p.Articles.filter((y) => !y.content);

    return (
      <Row>
        <Col sm="8">
          {
            // Get all the article with content
            p.Articles.filter((y) => y.content).map((art, i) => {
              const content = art.content.split("[");

              return (
                <React.Fragment key={i}>
                  <div
                    className="article-container"
                    onClick={() => window.open(art.url)}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <h5 className="author-header">{art.author}</h5>
                    <h3 style={{ textAlign: "center" }}>{art.title}</h3>
                    <img src={art.urlToImage} alt="" width={"100%"} />
                    <p style={{ fontSize: "larger" }}>{content[0]}</p>
                  </div>
                </React.Fragment>
              );
            })
          }
        </Col>

        <Col sm="4">
          {sideArticle.map((art, i) => (
            <React.Fragment key={i}>
              <div
                className="article-container"
                onClick={() => window.open(art.url)}
              >
                <h6 className="author-header">{art.author}</h6>
                <h5>{art.title}</h5>
                <img src={art.urlToImage} alt="" width={"100%"} />
              </div>
            </React.Fragment>
          ))}
        </Col>
      </Row>
    );
  }
}
