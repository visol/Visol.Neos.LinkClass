import manifest from "@neos-project/neos-ui-extensibility";
import linkEditorPlugin from "./linkEditorPlugin";
import LinkEditorOptions from "./LinkEditorOptions";
import { $add, $get } from "plow-js";

const addPlugin = (Plugin, isEnabled) => (ckEditorConfiguration, options) => {
  if (!isEnabled || isEnabled(options.editorOptions, options)) {
    ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
    return $add("plugins", Plugin, ckEditorConfiguration);
  }
  return ckEditorConfiguration;
};

manifest("Visol.Neos.LinkClass", {}, globalRegistry => {
  const config = globalRegistry.get("ckEditor5").get("config");
  config.set(
    "linkClass",
    addPlugin(linkEditorPlugin, $get("linking.linkClass"))
  );

  const containerRegistry = globalRegistry.get("containers");

  containerRegistry.set(
    "LinkInput/OptionsPanel/LinkEditorOptions",
    LinkEditorOptions
  );
});
