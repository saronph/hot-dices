jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-localization", () => ({
  locale: "en",
  locales: ["en"],
  timezone: "UTC",
  isRTL: false,
  getLocales: () => [
    {
      languageCode: "en",
      countryCode: "US",
      languageTag: "en-US",
      isRTL: false,
    },
  ],
}));

jest.mock("./src/lib/ads.ts", () => ({
  showInterstitialAd: jest.fn(),
}));
