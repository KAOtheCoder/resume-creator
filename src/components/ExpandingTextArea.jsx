import React from "react";
import "./ExpandingTextArea.css";

class ExpandingTextArea extends React.Component {
    static defaultProps = {
        onChange: (event) => {}
    }

    constructor(props) {
        super(props);

        this.textareaRef = React.createRef();
        this.updateSize = this.updateSize.bind(this);
    }

    render() {
        return (
            <textarea
            className="ExpandingTextArea"
            ref={this.textareaRef}
            placeholder={this.props.placeholder}
            defaultValue={this.props.defaultValue}
            onChange={(event) => {
                this.updateSize();
                this.props.onChange(event)
            }}
            />
        );
    }

    updateSize() {
        const textarea = this.textareaRef.current;
        if (textarea) {
            const EXTRA_HEIGHT = 20;
            const MIN_HEIGHT = 40;
            const MAX_HEIGHT = 150;

            textarea.style.height = "auto";
            const height = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, textarea.scrollHeight + EXTRA_HEIGHT));
            textarea.style.height = `${height}px`;
        }
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