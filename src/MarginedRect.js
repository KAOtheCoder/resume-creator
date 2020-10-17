import Rect from "./Rect";

class MarginedRect{
    constructor(x, y, width, height, leftMargin = 0, topMargin = 0, rightMargin = 0, bottomMargin = 0) {
        this.outlineRect = new Rect(x, y, width, height);
        this.contentRect = new Rect(x + leftMargin, y + topMargin, width - (leftMargin + rightMargin), height - (topMargin + bottomMargin));
    }

    getOutlineRect() { return this.outlineRect; }
    getContentRect() { return this.contentRect; }

    getLeftMargin() { return this.contentRect.getLeft() - this.getLeftMargin(); }
    getRightMargin() { return this.getRight() - this.contentRect.getRight(); }
    getTopMargin() { return this.contentRect.getTop() - this.getTopMargin(); }
    getBottomMargin() { return this.getBottom() - this.contentRect.getBottomMargin(); }
}

export default MarginedRect;