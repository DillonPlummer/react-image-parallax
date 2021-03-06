import React, { Component, PropTypes } from 'react';

const NoOverFlow = ({ children }) =>
  <div style={{ overflow: 'hidden' }}>
    {children}
  </div>;

const TextOverlay = ({text}) =>
  <div style={{
              position: absolute;
              top: 50%;
              width: 100%;
              text-align: center;
              color: #2A2A2A;
              font-size: 27px;
              letter-spacing: 8px;
              text-transform: uppercase;
             }}>
    {text}
  </div>
              
              
export default class ImageParallax extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    scale: PropTypes.number.isRequired,
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      imageHeight: 0,
      moveDown: 0
    };
  }

  onImageLoad = ({ target: {clientHeight} }) => {
    this.setState({
      imageHeight: clientHeight
    });
    setTimeout(() => {
      this.onScroll();
    });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { imageHeight } = this.state;
    const { scale } = this.props;
    const screenHeight = window.innerHeight;
    const offsetTop = this.fold.getBoundingClientRect().top;
    const ratio = Math.min(1, Math.max(0, (offsetTop + imageHeight) / (screenHeight + imageHeight)));
    const moveDown = (ratio - 1/2) * (1 - 1/scale) * imageHeight;
    this.setState({
      moveDown
    });
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { children } = this.props;
    const { moveDown } = this.state;
    return (
      <NoOverFlow>
        <span ref={(elem) => this.fold = elem}></span>
        { children({ y: moveDown }, this.onImageLoad) }
      </NoOverFlow>
    );
  }
}
