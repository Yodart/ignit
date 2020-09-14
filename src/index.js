const { Command, flags } = require("@oclif/command");
const { CLIError } = require("@oclif/errors");
const cli = require("cli-ux");
const inquirer = require("inquirer");
const notifier = require("node-notifier");
const execa = require("execa");
const Listr = require("listr");
const { Observable } = require("rxjs");
const fs = require("fs");
const { catchError } = require("rxjs/operators");
class Ignit extends Command {
  static description = `Flutter app projects with batteries included.
  ...
  
  `;

  static hidden = true;
  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h", description: " ignit help 🎨" }),
  };

  static args = [
    {
      name: "project",
      required: true,
      description: "The name of the flutter project to be created",
    },
  ];

  async run() {
    const { args, flags } = this.parse(ignit);
    inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));
    const packageName = await inquirer.prompt([
      {
        type: "input",
        message: "Package Name: ",
        name: "packagename",
        default: "com.mobileapp",
      },
    ]);

    const packageDescription = await inquirer.prompt([
      {
        type: "input",
        message: "Package Description: ",
        name: "packagedescription",
        default: "A flutter project initialized with ignit.",
      },
    ]);
    const font = await inquirer.prompt([
      {
        type: "confirm",
        message: "Enable GoogleFonts? ",
        name: "fonts",
        default: true,
      },
    ]);
    const stateManagement = await inquirer.prompt([
      {
        type: "checkbox",
        message: "State Management: ",
        name: "stateManagement",
        choices: ["Provider", "BLoC", "ScopedModel", "Redux", "RxDart"],
      },
    ]);
    const cachingLayer = await inquirer.prompt([
      {
        type: "checkbox",
        message: "Caching Layer: ",
        name: "cachingLayer",
        choices: [
          "Cached Network Image",
          "Hive",
          "SQLite",
          "Shared Preferences",
        ],
      },
    ]);
    const iconPath = await inquirer.prompt([
      {
        type: "fuzzypath",
        name: "iconPath",
        itemType: "file",
        rootPath: `/Users/${require("os").userInfo().username}/Downloads/`,
        message: "App Icon: ",
        default: `No Icon`,
        suggestOnly: false,
        depthLimit: 5,
      },
    ]);
    const androidFirebaseFile = await inquirer.prompt([
      {
        type: "fuzzypath",
        name: "android-path",
        itemType: "file",
        rootPath: `/Users/${require("os").userInfo().username}/Downloads/`,
        message: "[Android 🤖] google-services.json file path: ",
        default: `/Users/${require("os").userInfo().username}/Downloads/`,
        suggestOnly: false,
        depthLimit: 5,
      },
    ]);
    const iosFirebaseFile = await inquirer.prompt([
      {
        type: "fuzzypath",
        name: "ios-path",
        itemType: "file",
        rootPath: `/Users/${require("os").userInfo().username}/Downloads/`,
        message: "[iOS 🍎] GoogleService-Info.plist file path: ",
        default: `/Users/${require("os").userInfo().username}/Downloads/`,
        suggestOnly: false,
        depthLimit: 5,
      },
    ]);

    var pub = `
# Enhanced by [ignit] 🐐

name: ${args.project}
description: ${packageDescription["packageDescription"]}

version: 1.0.0

environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  ${font ? "google_fonts: ^1.1.0" : ""}
  ${
    stateManagement["stateManagement"].includes("Provider")
      ? "provider: ^4.1.3"
      : ""
  }
  ${
    stateManagement["stateManagement"].includes("BLoC")
      ? "flutter_bloc: ^4.0.1"
      : ""
  }
  ${
    stateManagement["stateManagement"].includes("ScopedModel")
      ? "scoped_model: ^1.0.1"
      : ""
  }
  ${stateManagement["stateManagement"].includes("Redux") ? "redux: ^4.0.0" : ""}
  ${
    stateManagement["stateManagement"].includes("RxDart")
      ? "rxdart: ^0.24.1"
      : ""
  }
  ${cachingLayer["cachingLayer"].includes("Hive") ? "hive: ^1.4.1+1" : ""}
  ${cachingLayer["cachingLayer"].includes("SQLite") ? "sqflite: ^1.3.1" : ""}
  ${
    cachingLayer["cachingLayer"].includes("Shared Preferences")
      ? "shared_preferences: ^0.5.7+3"
      : ""
  }
  ${
    cachingLayer["cachingLayer"].includes("Cached Network Image")
      ? "shared_preferences: ^0.5.7+3"
      : ""
  }

  flutter:
    sdk: flutter
  cupertino_icons: ^0.1.3

dev_dependencies:
  ${iconPath["iconPath"] != "No Icon" ? "flutter_launcher_icons: ^0.7.3" : ""}  
  flutter_test:
    sdk: flutter
${
  iconPath["iconPath"] != "No Icon"
    ? `
flutter_icons:
  android: "launcher_icon"
  ios: true
  image_path: "icons/icon.jpg"

`
    : ""
}


flutter:
  uses-material-design: true
  assets:
    - icons/
    
    `;

    const tasks = new Listr([
      {
        title: "🏁 Initializing Project",
        task: async () => {
          await execa("flutter", [
            "create",
            "--androidx",
            "-t",
            "app",
            "--org",
            `${packageName}`,
            "--description",
            `${packageDescription}`,
            `${args.project}`,
          ]);
          fs.writeFile(`${args.project}/pubspec.yaml`, pub, async function (
            err
          ) {
            await execa("cd", [`${args.project}`]);
            await execa("flutter", ["pub", "get"]);
          });
        },
      },
      iconPath["iconPath"] == "No Icon"
        ? {
            title: "🧙🏽‍♂️ Casting a no-bug spell ",
            task: () => {
              return new Observable((observer) => {
                setTimeout(() => {
                  observer.complete();
                }, 2500);
              });
            },
          }
        : {
            title: "Applying App Icon",
            task: () => {
              if (
                iconPath["iconPath"].endsWith(".jpg") ||
                iconPath["iconPath"].endsWith(".png") ||
                iconPath["iconPath"].endsWith(".jpeg")
              ) {
                fs.mkdir(`${args.project}/icons`, function (err) {
                  if (err) {
                    this.error(new Error(err));
                  } else {
                    fs.rename(
                      `${iconPath["iconPath"]}`,
                      `${args.project}/icons/icon.jpg`,
                      function (err) {}
                    );
                    execa("cd", [`${args.project}`]);
                    execa("flutter", [
                      "pub",
                      "run",
                      "flutter_launcher_icons:main",
                    ]);
                  }
                });
              } else {
                this.error(
                  new Error("🤡 Icons must be .jpg, .jpeg or .png files.")
                );
              }
            },
          },
    ]);

    tasks.run().catch((err) => {
      console.error(err);
    });
  }
}

module.exports = ignit;
