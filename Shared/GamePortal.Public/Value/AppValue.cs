using GamePortal.Public.Enum;
using GamePortal.Public.Helper;

namespace GamePortal.Public.Value
{
    internal class AppValue
    {
        public static PlatformEnum Platform = HelperPlatform.GetPlatform;

        public static BuildEnum Build = HelperBuild.GetBuild;
    }
}