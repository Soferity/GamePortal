using GamePortal.Helper;
using Taiizor.Essentials.Maui.Enum;
using HP = Taiizor.Essentials.Maui.Helper.Platform;

namespace GamePortal.Value
{
    internal class AppValue
    {
        public static PlatformEnum Platform = HP.GetPlatform;

        public static BuildEnum Build = HelperBuild.GetBuild;
    }
}