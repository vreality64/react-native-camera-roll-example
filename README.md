# react-native-camera-roll-example
React Native CameraRoll API Example. It was scaffolded by `react-native init`

The purpose of this repositoby is to notify performance issue of iOS Image component loaded from `assets-library://`.
The demo shows that CPU reach peak point when load image (almost 400% on Macbook).

### Demo

![cpu profiling with xcode](https://user-images.githubusercontent.com/886706/48934895-180daa80-ef49-11e8-9f3a-459c2a68042b.gif)

### environment

```text
  React Native Environment Info:
    System:
      OS: macOS High Sierra 10.13.6
      CPU: (4) x64 Intel(R) Core(TM) i5-6267U CPU @ 2.90GHz
      Memory: 275.75 MB / 16.00 GB
      Shell: 3.2.57 - /bin/bash
    Binaries:
      Node: 8.11.3 - ~/.nvm/versions/node/v8.11.3/bin/node
      Yarn: 1.12.3 - /usr/local/bin/yarn
    SDKs:
      iOS SDK:
        Platforms: iOS 12.1, macOS 10.14, tvOS 12.1, watchOS 5.1
    IDEs:
      Xcode: 10.1/10B61 - /usr/bin/xcodebuild
    npmPackages:
      react: 16.6.1 => 16.6.1
      react-native: 0.57.5 => 0.57.5
```

### License

MIT License