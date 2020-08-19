/**
 * Nav bar class.
 * Manage the logic of user interaction to browse the web site
 */
import * as React from "react";
import { Nav, Form, FormControl, Button, Navbar } from "react-bootstrap";

interface IAppNavBarsProps {
  OnSearchNews: (query: string) => void;
}

interface IAppNavBarsState {
  Query: string;
}

export class AppNavBars extends React.PureComponent<
  IAppNavBarsProps,
  IAppNavBarsState
> {
  public constructor(p: IAppNavBarsProps) {
    super(p);
    this.state = {
      Query: null,
    };
  }

  public render(): JSX.Element {
    return (
      /* TODO Expand nav links, adding logic to have a user friendly behavior */
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#link">Login</Nav.Link>
            <Nav.Link href="#link">Today</Nav.Link>
            <Nav.Link href="#link">Topic</Nav.Link>
            <Nav.Link href="#link">Podcast</Nav.Link>
          </Nav>

          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onKeyPress={this._enterKeyPressed}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this._onTextChange(e)
              }
            />
            <Button variant="outline-success" onClick={this._onSearch}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  /** Store the input text in the state */
  private readonly _onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      Query: e.currentTarget.value as string,
    });
  };

  /** Call the search callback on Enter key pressed. */
  private readonly _enterKeyPressed = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this._onSearch();
    }
  };

  /** Call the callback to the main container to fetch articles by a specific keyword. */
  private readonly _onSearch = () => {
    const s = this.state;
    // perform only if the state contains some characters
    if (s.Query && s.Query.trim().length > 0) {
      this.props.OnSearchNews(s.Query);
    }
  };
}
