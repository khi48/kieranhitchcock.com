class Letter {
    constructor(element) {
        this.element = element;
        this.rect = this.element.getBoundingClientRect();
        this.desiredTop = this.rect.top;
        this.desiredLeft = this.rect.left;
        this.oldTop = this.desiredTop;
        this.oldLeft = this.desiredLeft;
        this.speed = 0;

    }

    setOriginalPosition(){
        this.element.style.position = "absolute";
        this.updatePosition(this.desiredTop, this.desiredLeft);
    }

    setNewPosition(top, left){
        this.oldTop = this.desiredTop;
        this.oldLeft = this.desiredLeft;
        this.desiredTop = top;
        this.desiredLeft = left;
    }

    backToOldPosition(){
        this.rect = this.element.getBoundingClientRect();
        this.desiredTop = this.oldTop;
        this.desiredLeft = this.oldLeft;
        this.oldTop = this.rect.top;
        this.oldLeft = this.rect.left;
    }

    updatePosition() {
        this.element.style.top = this.desiredTop + 'px';
        this.element.style.left = this.desiredLeft + 'px';
    }

    
}