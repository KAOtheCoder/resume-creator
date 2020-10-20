class Rect {
    constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    }

    getX() { return this.x; }
    getY() { return this.y; }
    getWidth() { return this.width; }
    getHeight() { return this.height; }
    getLeft() { return this.x; }
    getTop() { return this.y; }
    getRight() { return this.x + this.width; }
    getBottom() { return this.y + this.height; }

    setX(x) { this.x = x; }
    setY(y) { this.y = y; }
    setWidth(width) { this.width = width; }
    setHeight(height) { this.height = height; }
    setLeft(left) { this.x = left; }
    setTop(top) { this.y = top; }
    setRight(right) { this.width = right - this.x; }
    setBottom(bottom) { this.height = bottom - this.y; }

    translate(dx, dy) {

    }
}

export default Rect;