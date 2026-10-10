import React from 'react';
import { searchCoordinates } from '../../services/Geocoding/GeocodingService';
import './AutoCompleteSearchBox.css';

const SEARCH_DEBOUNCE_MS = 300;

class AutoCompleteSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalText: this.props.defaultText,
      text: this.props.defaultText,
      suggestions: [],
    };

    this.searchTimer = null;
    this.requestId = 0;

    this.handleOnChangeText = this.handleOnChangeText.bind(this);
    this.handleOnKeyUpText = this.handleOnKeyUpText.bind(this);
    this.selectSuggestion = this.selectSuggestion.bind(this);
    this.scheduleSearch = this.scheduleSearch.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.searchTimer);
  }

  handleOnChangeText(event) {
    const text = event.target.value;
    this.setState({ text });
    this.scheduleSearch(text);
  }

  scheduleSearch(text) {
    clearTimeout(this.searchTimer);
    // Invalidate any in-flight request so a stale response cannot overwrite newer results.
    const requestId = ++this.requestId;

    if (text.trim().length === 0) {
      this.setState({ suggestions: [] });
      return;
    }

    this.searchTimer = setTimeout(() => {
      searchCoordinates(text)
        .then((locations) => {
          if (requestId !== this.requestId) {
            return;
          }
          this.setState({ suggestions: locations });
        })
        .catch((error) => {
          if (requestId !== this.requestId) {
            return;
          }
          console.error('AutoCompleteSearchBox: geocoding search failed', error);
          this.setState({ suggestions: [] });
        });
    }, SEARCH_DEBOUNCE_MS);
  }

  handleOnKeyUpText(event) {
    if (event.key === 'Escape') {
      clearTimeout(this.searchTimer);
      this.requestId++;
      this.setState((state) => {
        const text = state.originalText;
        return ({ text, suggestions: [] });
      });
    }
  }

  selectSuggestion(location) {
    if (this.props.suggestionSelected !== undefined) {
      this.props.suggestionSelected(location);
    }
    clearTimeout(this.searchTimer);
    this.requestId++;
    this.setState({
      originalText: location.name,
      text: location.name,
      suggestions: []
    });
  }

  render() {
    const { text, suggestions } = this.state
    return (
      <div className="search-bar-container">
        <div className="auto-complete-search-box-container">
          <div className="search-box-container">
            <input
              type="text"
              value={text}
              onChange={this.handleOnChangeText}
              onKeyUp={this.handleOnKeyUpText}
            />
          </div>
          <Suggestion
            suggestions={suggestions}
            selectSuggestion={this.selectSuggestion}
          />
        </div>
      </div>
    );
  }
}

class Suggestion extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClickListItem = this.handleOnClickListItem.bind(this);
  }

  handleOnClickListItem(location) {
    this.props.selectSuggestion(location);
  }

  render() {
    const suggestions = this.props.suggestions;
    if (suggestions.length > 0) {
      const listItems = suggestions.map((item) => {
        const label = [item.name, item.admin1, item.country].filter(Boolean).join(', ');
        return (
          <li
            key={`${item.name}-${item.latitude}-${item.longitude}`}
            onClick={() => this.handleOnClickListItem(item)}
          >
            {label}
          </li>
        );
      });
      return (
        <div className="suggestions-container">
          <ul>
            {listItems}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default AutoCompleteSearchBox;
