import Quill from "quill";

const Embed = Quill.import("blots/block/embed");

class Hr extends Embed {
  static create(value) {
    let node = super.create(value);
    node.setAttribute(
      "style",
      "height:0px; margin-top:10px; margin-bottom:10px; border: 1px solid rgb(228, 227, 226);"
    );
    return node;
  }
}

Hr.blotName = "hr"; //now you can use .ql-hr classname in your toolbar
Hr.className = "my-hr";
Hr.tagName = "hr";
Quill.register({ "formats/hr": Hr });
