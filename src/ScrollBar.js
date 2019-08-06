import React from 'react';
import './ScrollBar.css';

class ScrollBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.isScrollBarThumbGrabbed = false;

		this.handleMouseDownOnThumb = this.handleMouseDownOnThumb.bind(this);
		this.handleMouseUpOnThumb = this.handleMouseUpOnThumb.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
	}

	componentDidMount() {
		let targetElement = document.getElementById(this.props.for);
		let scrollBar = document.querySelector(`[for="${this.props.for}"]`)
		let thumb = scrollBar.querySelector('.scroll-bar-thumb');
		this.setScrollBarSize(targetElement, scrollBar, thumb);
		thumb.addEventListener('mousedown', this.handleMouseDownOnThumb, true);
		document.addEventListener('mouseup', this.handleMouseUpOnThumb, true);
		document.addEventListener('mousemove', this.handleMouseMove, true);
	}
	componentWillUnmount() {
		let {
			scrollBarThumb
		} = this.getScrollBarElements(this.props.for);
		scrollBarThumb.removeEventListener('mousedown', this.handleMouseDownOnThumb, true);
		document.removeEventListener('mouseup', this.handleMouseUpOnThumb, true);
		document.removeEventListener('mousemove', this.handleMouseMove, true);
	}
	handleMouseDownOnThumb(event) {
		let scrollBarThumb = event.target;
		this.isScrollBarThumbGrabbed = true;
		scrollBarThumb.classList.add('active');
	}
	handleMouseUpOnThumb() {
		let { scrollBarThumb } = this.getScrollBarElements(this.props.for);
		this.isScrollBarThumbGrabbed = false;
		if(scrollBarThumb !== null) {
			scrollBarThumb.classList.remove('active');
			scrollBarThumb = null;
		}
	}
	handleMouseMove(event) {
		let {
			targetElement,
			scrollBarTrack,
			scrollBarThumb
		} = this.getScrollBarElements(this.props.for);
		if(!(this.isScrollBarThumbGrabbed)) {
			return;
		}
		let movement = event.movementX;
		let scrollBarThumbOffset = scrollBarThumb.offsetLeft + movement;
		let scrollBarThumbMaxOffset = scrollBarTrack.clientWidth - scrollBarThumb.clientWidth;
		if(scrollBarThumbOffset < 0) {
			scrollBarThumbOffset = 0;
		} else if(scrollBarThumbOffset > scrollBarThumbMaxOffset) {
			scrollBarThumbOffset = scrollBarThumbMaxOffset;
		}
		let offsetPercentage = scrollBarThumbOffset / scrollBarThumbMaxOffset;
		let targetElementOffset = offsetPercentage * (targetElement.scrollWidth - targetElement.clientWidth);
		targetElement.scrollLeft = targetElementOffset;
		scrollBarThumb.style.left = `${scrollBarThumbOffset}px`;
	}
	setScrollBarSize(targetElement, scrollBar, scrollBarThumb) {
		let width = targetElement.clientWidth;
		let bottom = (targetElement.offsetTop + targetElement.offsetHeight - scrollBar.offsetHeight)
		let left = targetElement.offsetLeft;
		let thumbWidth = (targetElement.clientWidth * targetElement.clientWidth)/targetElement.scrollWidth;
		scrollBar.style.width = `${width}px`;
		scrollBar.style.top = `${bottom}px`;
		scrollBar.style.left = `${left}px`;
		scrollBarThumb.style.width = `${thumbWidth}px`; 
	}
	getScrollBarElements(targetElementID) {
		let targetElement = document.getElementById(targetElementID);
		let scrollBar = document.querySelector(`[for='${targetElementID}']`);
		let scrollBarTrack = scrollBar.querySelector('.scroll-bar-track');
		let scrollBarThumb = scrollBarTrack.querySelector('.scroll-bar-thumb');
		return ({targetElement, scrollBar, scrollBarTrack, scrollBarThumb});
	}


	render() {
		return (
			<div className="scroll-bar" htmlFor={this.props.for}>
				<div className='scroll-bar-track'>
					<div className="scroll-bar-thumb" draggable="true"></div>
				</div>
			</div>
		);
	}
}

export default ScrollBar;