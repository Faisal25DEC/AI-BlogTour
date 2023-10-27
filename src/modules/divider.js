import "../blots/hr";

class Divider {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;

    const toolbar = this.quill.getModule("toolbar");
    toolbar.addHandler("hr", this.insertDivider);
  }

  insertDivider() {
    // get the position of the cursor
    var range = this.quill.getSelection();
    if (range) {
      // insert the <hr> where the cursor is
      this.quill.insertEmbed(range.index, "hr", "null");
    }
  }
}

export default Divider;
