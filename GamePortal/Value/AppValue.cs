using GamePortal.Enum;
using GamePortal.Helper;

namespace GamePortal.Value
{
    internal class AppValue
    {
        public static PlatformEnum Platform = HelperPlatform.GetPlatform;

        public static BuildEnum Build = HelperBuild.GetBuild;
    }
}