cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk sum_exchanges
./zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk SumExchanges.apk
