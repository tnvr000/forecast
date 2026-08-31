import React from 'react';
import './AutoCompleteSearchBox.css';

class AutoCompleteSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			originalText: this.props.defaultText,
      text: this.props.defaultText,
      suggestions: [],
		}

    this.handleOnChangeText = this.handleOnChangeText.bind(this);
		this.handleOnKeyUpText = this.handleOnKeyUpText.bind(this);
		this.selectSuggestion = this.selectSuggestion.bind(this);
  }

  handleOnChangeText(event) {
    const text = event.target.value;
    const regex = new RegExp(`^${text}`, "i");
    let suggestions
    if(text.length > 0) {
      suggestions = this.props.context.filter(item => (regex.test(item))).sort();
    } else {
      suggestions = [];
		}
    this.setState({text, suggestions})
  }

  handleOnKeyUpText(event) {
		if(event.key === "Escape") {
			this.setState((state) => {
				const text = state.originalText;
				return ({text, suggestions: []});
			});
		}
	}
	
	selectSuggestion(selectSuggestionText) {
		if(this.props.suggestionSelected !== undefined) {
			this.props.suggestionSelected(selectSuggestionText);
		}
		this.setState({
			originalText: selectSuggestionText,
			text: selectSuggestionText,
			suggestions: []
		});
	}

  render() {
		const { text, suggestions } = this.state
    return (
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
    );
  }
}

class Suggestion extends React.Component {
	constructor(props) {
		super(props);

		this.handleOnClickListItem = this.handleOnClickListItem.bind(this);
	}

	handleOnClickListItem(event) {
		this.props.selectSuggestion(event.target.innerText);
	}

	render() {
		const suggestions = this.props.suggestions;
		if (suggestions.length > 0) {
			const listItems = suggestions.map((item) => {
				return (
					<li key={item} onClick={this.handleOnClickListItem}>
						{item}
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