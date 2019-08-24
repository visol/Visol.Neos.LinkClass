# Visol.Neos.LinkClass

Extends the Neos CKE5 linkeditor with additional class attribute

![image](https://user-images.githubusercontent.com/837032/63639108-904ffa80-c698-11e9-83ff-78c458549dc1.png)

## Installation

1. Install the package with composer

2. Enable additional linking options with such config:

```
"Neos.NodeTypes.BaseMixins:TextMixin":
  properties:
    text:
      ui:
        inline:
          editorOptions:
            linking:
              linkClass: true
```

3. Configure link classes in Settings.yaml with such config:

```
Neos:
  Neos:
    Ui:
      frontendConfiguration:
        "Visol.Neos.LinkClass":
          linkClasses:
            standard: "Plain Link"
            button: "Button"

```

## Development

If you need to adjust anything in this package, just do so and then rebuild the code like this:

```
cd Resources/Private/LinkClass
yarn && yarn build
```

And then commit changed files including Plugin.js
