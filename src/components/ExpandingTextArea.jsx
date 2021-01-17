import React from "react";
import "./ExpandingTextArea.css";

class ExpandingTextArea extends React.Component {
    constructor(props) {
        super(props);

        this.textarea = React.createRef();
        this.updateSize = this.updateSize.bind(this);
    }

    render() {
        return (
            <textarea
            className="ExpandingTextArea"
            ref={this.textarea}
            placeholder={this.props.placeholder}
            onChange={(event) => this.handleOnChange(event)}
            />
        );
    }

    handleOnChange(event) {
        this.updateSize();
        this.props.onChange(event);
    }

    updateSize() {
        const textarea = this.textarea.current;

        const EXTRA_HEIGHT = 20;
        const MIN_HEIGHT = 40;
        const MAX_HEIGHT = 150;

        textarea.style.height = "auto";
        const height = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, textarea.scrollHeight + EXTRA_HEIGHT));
        textarea.style.height = `${height}px`;
    }

    componentDidMount() {
        this.updateSize();

        window.addEventListener("resize", this.updateSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSize);
    }
}

export default ExpandingTextArea;