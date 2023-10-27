import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import MarkdownShortcuts from "quill-markdown-shortcuts";
import quillEmoji from "quill-emoji";
import MagicUrl from "quill-magic-url";
import BlotFormatter from "quill-blot-formatter";

import "quill-mention";
import "quill-emoji/dist/quill-emoji.css";
import "quill/dist/quill.bubble.css";
import "./quill-override.css";
import ImageUploader from "../../modules/imageUploader";
import Divider from "../../modules/divider";
import SecondaryToolbar from "../../modules/secodaryToolbar";

const VideoInstance = Quill.import("formats/video");
const baseVideoCreate = VideoInstance.create;

VideoInstance.create = function (value) {
  if (value && value.includes("https://www.loom.com/share/")) {
    value = value.replace("share", "embed");
  }
  return baseVideoCreate.call(this, value);
};

Quill.register("modules/secondaryToolbar", SecondaryToolbar);
Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register("modules/magicUrl", MagicUrl);
Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/divider", Divider);
Quill.register("modules/markdownShortcuts", MarkdownShortcuts);
Quill.register(
  {
    "formats/emoji": quillEmoji.EmojiBlot,
    "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
    "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
  },
  true
);

const Editor = (props) => {
  const [editor, setEditor] = useState(null);
  // const [editorContent, setEditorContent] = useState("");

  const editorRef = useRef(null);
  const setInitialContent = () => {
    if (editor) {
      editor.setContents(props.initialContent);
    }
  };

  const onChange = (delta, oldDelta, source) => {
    console.log("onchange");
    if (editor) {
      const text = editor.getText();
      console.log(text);
      props.setText(text);
      const htmlContent = editor.root.innerHTML; // Get the HTML content
      props.setEditorContent(htmlContent);
      console.log(htmlContent);

      // props.onContentChange({
      //   body: editor.getContents(),
      // });
    }
  };

  const onSelectionChange = (range) => {
    const { onBlur } = props;

    if (range && range.index === 0) {
    } else if (!range && typeof onBlur === "function") {
      onBlur();
    }
  };

  const onUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pulse-test");
    const res = await (
      await fetch("https://api.cloudinary.com/v1_1/depjh17m6/image/upload", {
        body: data,
        method: "POST",
      })
    ).json();
    props.setImage(res.url);

    return res.url;
  };

  const searchMembers = async (searchTerm, renderList) => {
    const res = await new Promise((res) => {
      const filtered = [
        { id: 1, value: "Fredrik Sundqvist" },
        { id: 2, value: "Patrik Sjölin" },
      ].filter((item) => item.value.toLocaleLowerCase().includes(searchTerm));
      res(filtered);
    });
    renderList(res);
  };
  const options = {
    bounds: "#quill-container",
    placeholder: "Write your story",
    readOnly: props.readOnly,
    scrollingContainer: props.scrollingContainer,
    theme: "bubble",
    modules: {
      toolbar: {
        container: "#toolbar",
      },
      secondaryToolbar: {
        container: "#secondary-toolbar",
      },
      blotFormatter: {},
      markdownShortcuts: {},
      magicUrl: true,
      "emoji-toolbar": true,
      "emoji-shortname": true,
      divider: true,
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@"],
        source: searchMembers,
      },
      imageUploader: {
        upload: onUpload,
        drop: true,
        paste: true,
      },
    },
  };

  useEffect(() => {
    setEditor(new Quill(editorRef.current, options));
    setInitialContent();

    return () => {
      if (editor) {
        editor.off("text-change", onChange);
        editor.off("selection-change", onSelectionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (editor) {
      editor.on("text-change", onChange);
      editor.on("selection-change", onSelectionChange);
    }
    if (props.forceEditorContent) {
      setInitialContent();
      props.contentForced();
    }

    if (props.isFocused && editor) {
      editor.focus();
    }
  }, [props.forceEditorContent, props.isFocused, editor]);
  console.log(editor);
  return (
    <>
      <div id="toolbar">
        <span className="ql-formats">
          <button className="ql-link" />
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
        </span>

        <span className="ql-formats">
          <button className="ql-header" value="1" />
          <button className="ql-header" value="2" />
        </span>

        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <select className="ql-align">
            <option selected />
            <option value="center" />
            <option value="right" />
            <option value="justify" />
          </select>
        </span>

        <span className="ql-formats">
          <button className="ql-script" value="sub" />
          <button className="ql-script" value="super" />
        </span>

        <span className="ql-formats">
          <button className="ql-hr">
            <span style={{ color: "white" }}>hr</span>
          </button>
          <button className="ql-video">Video</button>
          <button className="ql-image">Image</button>
          <button className="ql-emoji">Emoji </button>
        </span>
      </div>

      <div className="hide" id="secondary-toolbar">
        <button className="ql-mention"></button>
        <button className="ql-video"></button>
        <button className="ql-image"></button>
        <button className="ql-list" value="bullet"></button>
      </div>

      <div id="quill-container" ref={editorRef} />
    </>
  );
};

export default Editor;
