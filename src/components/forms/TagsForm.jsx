import React from "react";
import createChangeProxy from "../../ChangeProxy";
import CollapsibleList from "../CollapsibleList";
import KeyGenerator from "../../KeyGenerator";
import CollapsibleListTitle from "../CollapsibleListTitle";

class TagsForm extends React.Component {
    static defaultProps = {
        onTagsChange: (tags) => {} 
    }

    constructor(props) {
        super(props);

        if (this.props.tags === undefined) {
            this.tags = [];
            this.tags.onTagsChange(this.tags);
        }
        else {
            this.tags = this.props.tags;
        }

        this.tagsProxy = createChangeProxy(this.tags, () => this.props.onTagsChange(this.tags));
        this.keyGenerator = new KeyGenerator();
        this.state = {tagKeys: this.keyGenerator.generateKeys(this.tags.length)};
    }

    render() {
        return (
            <CollapsibleList
            title="Tags"
            addable
            addLabel="Add Tag"
            onAdd={() => this.addTag()}
            elements={this.getElements()}
            />
        );
    }

    getElements() {
        const elements = [];

        for (let i = 0; i < this.state.tagKeys.length; ++i)
            elements.push(
                <CollapsibleListTitle
                key={this.state.tagKeys[i]}
                title={this.tags[i]}
                titleEditable
                onTitleChange={(title) => this.tagsProxy[i] = title}
                deletable
                onDelete={() => this.deleteTag(i)}
                movableUp={i > 0}
                onMoveUp={() => this.moveTagUp(i)}
                movableDown={i < this.state.tagKeys.length - 1}
                onMoveDown={() => this.moveTagDown(i)}
                />
            );

        return elements;
    }

    addTag() {
        this.setState(
            (state) => {
                const key = this.keyGenerator.generateKey();
                this.tagsProxy.push("tag" + key);
                return {tagKeys: [...state.tagKeys, key]};
            }
        );
    }

    deleteTag(index) {
        this.setState(
            (state) => {
                this.tagsProxy.splice(index, 1);
                const keys = [...state.tagKeys];
                keys.splice(index, 1);
                return {tagKeys: keys};
            }
        );
    }

    moveTagUp(index) {
        this.swapTags(index - 1, index);
    }

    moveTagDown(index) {
        this.swapTags(index, index + 1);
    }

    swapTags(indexFirst, indexSecond) {
        this.setState(
            (state) => {
                [this.tagsProxy[indexFirst], this.tagsProxy[indexSecond]] = [this.tags[indexSecond], this.tags[indexFirst]];
                const keys = [...state.tagKeys];
                [keys[indexFirst], keys[indexSecond]] = [keys[indexSecond], keys[indexFirst]];
                return {tagKeys: keys};
            }
        );
    }
}

export default TagsForm;