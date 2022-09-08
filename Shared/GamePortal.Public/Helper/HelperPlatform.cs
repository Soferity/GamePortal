using GamePortal.Public.Enum;

namespace GamePortal.Public.Helper
{
    internal class HelperPlatform
    {
        public static PlatformEnum GetPlatform
        {
#if WINUI || WINDOWS || WPF
            get => PlatformEnum.WinUI;
#elif MACCATALYST
            get => PlatformEnum.MacCatalyst;
#elif ANDROID
            get => PlatformEnum.Android;
#elif IOS
            get => PlatformEnum.iOS;
#endif
        }
    }
}
