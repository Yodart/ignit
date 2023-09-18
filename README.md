# Ignit

[![Status](https://img.shields.io/badge/Status-Discontinued-red)](https://img.shields.io/badge/Status-Discontinued-red)
[![npm version](https://badge.fury.io/js/ignit.svg)](https://badge.fury.io/js/ignit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

CLI tool to supercharge the build of @flutter apps. Includes options for cache and state management among other features. It's built on top of the standard Flutter CLI tooling. 🦜

## Installation

You can install `ignit` globally using npm:

```sh
npm install -g ignit
```

## Usage
ignit is a command-line tool for creating and configuring Flutter app projects with various features. It enhances the default Flutter CLI tooling to simplify project initialization and setup. Here's how to use it:
```sh
ignit create <my_flutter_app>
```
Running the above command will create a Flutter project named "my_flutter_app" with batteries included. You'll be prompted to configure various options, including package name, description, state management, caching, fonts, app icon, and Firebase integration.

## Options
- -h, --help: Show help message for the ignit command.
- -v, --version: Show the version of ignit.

## Features
- **Package Configuration:** Customize your Flutter project with package name and description.
- **Font Integration:** Easily enable Google Fonts in your project.
- **State Management:** Choose from popular state management solutions like Provider, BLoC, ScopedModel, Redux, and RxDart.
- **Caching Layer:** Select from various caching layers such as Cached Network Image, Hive, SQLite, and Shared Preferences.
- **App Icon:** Configure your app icon effortlessly.
- **Firebase Integration:** Set up Firebase for both Android and iOS platforms.



