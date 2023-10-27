import Quill from "quill";

const Toolbar = Quill.import("modules/toolbar");
const Block = Quill.import("blots/block");

class SecondaryToolbar extends Toolbar {
  constructor(quill, options) {
    super(quill, options);
    this.options = options;
    this.quill = quill;

    /** Create toolbar element */
    this.toolbarHeight = 20;
    this.secondaryToolbar = document.querySelector(options.container);
    this.quill.addContainer(this.secondaryToolbar);
    this.quill.on("editor-change", this.onEditorChange);
  }

  onEditorChange = (eventType, range) => {
    if (eventType !== Quill.events.SELECTION_CHANGE) return;
    if (range == null) return;

    if (range.length === 0) {
      const [block] = this.quill.scroll.descendant(Block, range.index);
      if (block != null && block.domNode.firstChild instanceof HTMLBRElement) {
        const lineBounds = this.quill.getBounds(range.index);
        this.showToolbar();
        this.secondaryToolbar.style.top = `${lineBounds.top}px`;
      } else {
        this.hideToolbar();
      }
    } else {
      this.hideToolbar();
    }
  };

  hideToolbar = () => {
    this.secondaryToolbar.style.visibility = "hidden";
    this.secondaryToolbar.style.opacity = 0;
  };

  showToolbar = () => {
    this.secondaryToolbar.style.visibility = "visible";
    this.secondaryToolbar.style.opacity = 1;
  };
}

export default SecondaryToolbar;
