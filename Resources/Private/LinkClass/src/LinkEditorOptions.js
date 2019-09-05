import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { $get, $transform } from "plow-js";
import { neos } from "@neos-project/neos-ui-decorators";

import { SelectBox } from "@neos-project/react-ui-components";
import { executeCommand } from "@neos-project/neos-ui-ckeditor5-bindings";

import { selectors } from "@neos-project/neos-ui-redux-store";

@neos(globalRegistry => ({
  i18nRegistry: globalRegistry.get("i18n"),
  options: globalRegistry
    .get("frontendConfiguration")
    .get("Visol.Neos.LinkClass")
}))
@connect(
  $transform({
    formattingUnderCursor: selectors.UI.ContentCanvas.formattingUnderCursor
  })
)
export default class LinkEditorOptions extends PureComponent {
  static propTypes = {
    formattingUnderCursor: PropTypes.object,
    linkingOptions: PropTypes.object
  };

  render() {
    const linkClasses = $get("linkClasses", this.props.options);
    if (!linkClasses) {
      return null;
    }

    const selectBoxOptions = Object.keys(linkClasses).map(value => ({
      value,
      label: linkClasses[value]
    }));
    return $get("linkClass", this.props.linkingOptions) && selectBoxOptions ? (
      <div style={{ flexGrow: 1 }}>
        <div style={{ padding: 8 }}>
          {this.props.i18nRegistry.translate("Visol.Neos.LinkClass:Main:label")}
          <SelectBox
            options={selectBoxOptions}
            optionValueField="value"
            value={$get("linkClass", this.props.formattingUnderCursor)}
            onValueChange={value => {
              executeCommand("linkClass", value, false);
            }}
            placeholder={this.props.i18nRegistry.translate(
              "Visol.Neos.LinkClass:Main:placeholder"
            )}
            allowEmpty={true}
          />
        </div>
      </div>
    ) : null;
  }
}
