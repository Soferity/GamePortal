using GamePortal.Public.Enum;

namespace GamePortal.Public.Helper
{
    internal class HelperPlatform
    {
        public static PlatformEnum GetPlatform
        {
#if MACCATALYST
            get => PlatformEnum.MacCatalyst;
#elif ANDROID
            get => PlatformEnum.Android;
#elif IOS
            get => PlatformEnum.iOS;
#else
            get => PlatformEnum.WinUI;
#endif
        }
    }
}
