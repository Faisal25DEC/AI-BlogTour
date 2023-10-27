/**
 * This image Uploader module is forked from https://github.com/NoelOConnell/quill-image-uploader
 * Added with Drag and drop functionality,
 * forked from https://github.com/kensnyder/quill-image-drop-module/blob/master/src/ImageDrop.js
 */

import "../blots/image";

class ImageUploader {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.range = null;

    if (typeof this.options.upload !== "function")
      console.warn(
        "[Missing config] upload function that returns a promise is required"
      );

    const toolbar = this.quill.getModule("toolbar");
    toolbar.addHandler("image", this.selectLocalImage.bind(this));

    this.handleDrop = this.handleDrop.bind(this);
    this.handlePaste = this.handlePaste.bind(this);

    if (this.options && this.options.drop) {
      this.quill.root.addEventListener("drop", this.handleDrop, false);
    }

    if (this.options && this.options.paste) {
      this.quill.root.addEventListener("paste", this.handlePaste, false);
    }
  }

  selectLocalImage() {
    this.range = this.quill.getSelection();
    this.fileHolder = document.createElement("input");
    this.fileHolder.setAttribute("type", "file");
    this.fileHolder.setAttribute("accept", "image/*");
    this.fileHolder.setAttribute("style", "visibility:hidden");

    this.fileHolder.onchange = this.fileChanged.bind(this);

    document.body.appendChild(this.fileHolder);

    this.fileHolder.click();

    window.requestAnimationFrame(() => {
      document.body.removeChild(this.fileHolder);
    });
  }

  handleDrop(evt) {
    evt.preventDefault();
    if (
      evt.dataTransfer &&
      evt.dataTransfer.files &&
      evt.dataTransfer.files.length
    ) {
      if (document.caretRangeFromPoint) {
        const selection = document.getSelection();
        const range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
        if (selection && range) {
          selection.setBaseAndExtent(
            range.startContainer,
            range.startOffset,
            range.startContainer,
            range.startOffset
          );
        }
      }
      this.readFiles(evt.dataTransfer.files, this.readFilesCallback.bind(this));
    }
  }

  handlePaste(evt) {
    if (
      evt.clipboardData &&
      evt.clipboardData.items &&
      evt.clipboardData.items.length
    ) {
      this.readFiles(
        evt.clipboardData.items,
        this.readFilesCallback.bind(this)
      );
    }
  }

  async readFilesCallback(localUrl) {
    this.range = this.quill.getSelection();
    if (this.options.upload) {
      try {
        this.insertBase64Image(localUrl);
        const fileUrl = await this.options.upload(localUrl);
        this.insertToEditor(fileUrl);
      } catch (error) {
        this.removeBase64Image();
        console.warn(error);
      }
    } else {
      this.insertBase64Image(localUrl);
    }
  }

  fileChanged() {
    let isUploadReject = false;
    const file = this.fileHolder.files[0];

    const fileReader = new FileReader();

    fileReader.addEventListener(
      "load",
      () => {
        if (!isUploadReject) {
          let base64ImageSrc = fileReader.result;
          this.insertBase64Image(base64ImageSrc);
        }
      },
      false
    );

    if (file) {
      fileReader.readAsDataURL(file);
    }

    this.options.upload(file).then(
      (imageUrl) => {
        this.insertToEditor(imageUrl);
      },
      (error) => {
        isUploadReject = true;
        this.removeBase64Image();
        console.warn(error);
      }
    );
  }

  readFiles(files, callback) {
    // check each file for an image
    [].forEach.call(files, (file) => {
      if (
        !file.type.match(
          /^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i
        )
      ) {
        // file is not an image
        // Note that some file formats such as psd start with image/* but are not readable
        return;
      }
      // set up file reader
      const reader = new FileReader();
      reader.onload = (evt) => {
        callback(evt.target.result);
      };
      // read the clipboard item or file
      const blob = file.getAsFile ? file.getAsFile() : file;
      if (blob instanceof Blob) {
        reader.readAsDataURL(blob);
      }
    });
  }

  insertBase64Image(url) {
    const range = this.range;
    this.quill.insertEmbed(range.index, "imageBlot", `${url}`);
  }

  insertToEditor(url) {
    const range = this.range;
    // Delete the placeholder image
    this.quill.deleteText(range.index, 3);
    // Insert the server saved image
    this.quill.insertEmbed(range.index, "image", `${url}`);

    range.index++;
    this.quill.setSelection(range, "api");
  }

  removeBase64Image() {
    const range = this.range;
    this.quill.deleteText(range.index, 3);
  }
}

export default ImageUploader;
