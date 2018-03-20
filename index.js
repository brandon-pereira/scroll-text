class ScrollText {

    constructor(el, options) {
        this.el = el;
        this.options = Object.assign({}, {
            textAttribute: 'data-scroll-text', // What attribute to look for. ie data-scroll-text="hello|world|i'm|brandon"
            speed: 2000, // How often to switch slides
            scrollAmount: '20px', // how often to scroll
            delimiter: '|', // what to break on for textAttribute
            // text: [] // Text to use (rather than getting from attribute)
        }, options);

        this.init();
    }

    /**
     * Method to bootstrap the component.
     */
    init() {
        this.el.innerHTML = ''; // Clear the content (this is for if browser has js disabled)
        this.text = this.options.text || this.el.getAttribute(this.options.textAttribute).split(this.options.delimiter);
        this.children = this.text.map((el, i) => this._createTextElement(el, i === 0));
        this.index = 0;
        this.currentElement = this.children[this.index];
        this.timer = setInterval(this.next.bind(this), this.options.speed);
    }

    /**
     * Public method to switch to the next available slide.
     */
    next() {
        this.index += 1;
        if (this.index > this.text.length - 1) {
            this.index = 0;
        }
        this.setCurrentSlide(this.index);
    }

    /**
     * Method to switch slide, handles delegating animations and setting styles.
     * @private
     * @param {Element} curr currently visible element (pushes it off screen from center)
     * @param {*} next visible to transition to (pushes it up from bottom)
     */
    setCurrentSlide(index) {
        const prev = this.currentElement;
        const next = this.children[index];
        if (prev && next) {
            prev.style.position = 'absolute';
            next.style.position = 'relative';
            this._animate(next, [{ opacity: 0, top: this.options.scrollAmount }, { opacity: 1, top: '0px' }], { fill: "both", duration: 200 });
            this._animate(prev, [{ opacity: 1, top: '0px' }, { opacity: 0, top: `-${this.options.scrollAmount}` }], { fill: "both", duration: 200 }, () => {
                // on animation end OR unsupported browser
                prev.classList.remove('current');
                next.classList.add('current');

            });
            this.currentElement = next;
        } else {
            console.warn("Invalid index passed into scrollText!", index);
        }
    }

    /**
     * Method to call Element.animate if available.
     * @param {Element} el Element to animate
     * @param {Array} transition transition to pass
     * @param {Object} opts options to pass
     * @param {Function} Callback on complete (called immediately if not supported)
     */
    _animate(el, transition, opts, cb = () => { }) {
        if (el && 'animate' in el) {
            el.animate(transition, opts)
                .onfinish = cb;
        } else if (cb) {
            cb(); // dont animate just call callback
        }
    }

    /**
     * Creates and appends a text element to the root node. If index is 0 will make it visible, else will be hidden.
     * @param {String} text 
     * @param {Number} index 
     */
    _createTextElement(text, isCurrent) {
        const el = document.createElement('span');
        el.innerText = text;
        el.classList.toggle('current', isCurrent);
        return this.el.appendChild(el)
    }

    /**
     * Cleanup method. Call this if the component needs to unmount and be removed.
     */
    destroy() {
        clearInterval(this.timer);
        this.el.innerHTML = this.text[0] || '';
    }


}

module.exports = ScrollText;