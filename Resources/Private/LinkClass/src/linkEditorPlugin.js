import { Plugin } from "ckeditor5-exports";
import LinkAttributeCommand from "./linkAttributeCommand";
import RemoveAttributeCommand from "./removeAttributeCommand";

export default class LinkClassPlugin extends Plugin {
  static get pluginName() {
    return "LinkClass";
  }

  init() {
    const editor = this.editor;
    editor.model.schema.extend("$text", {
      allowAttributes: ["linkClass"]
    });

    this.editor.commands.get("unlink").on("execute", (evt, args) => {
      editor.execute("removeLinkClass");
    });

    editor.conversion.for("downcast").attributeToElement({
      model: "linkClass",
      view: (linkClass, writer) => {
        const linkElement = writer.createAttributeElement(
          "a",
          linkClass
            ? {
                class: linkClass
              }
            : {},
          { priority: 5 }
        );
        return linkElement;
      }
    });
    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "a",
        attributes: {
          class: true
        }
      },
      model: {
        key: "linkClass",
        value: viewElement => viewElement.getAttribute("class")
      }
    });

    editor.commands.add(
      "linkClass",
      new LinkAttributeCommand(this.editor, "linkClass")
    );
    editor.commands.add(
      "removeLinkClass",
      new RemoveAttributeCommand(this.editor, "linkClass")
    );
  }
}
