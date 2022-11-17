using GamePortal.Helper;
using Taiizor.Essentials.Maui.Enum;
using Taiizor.Essentials.Blazor.Enum;
using EP = Taiizor.Essentials.Maui.Extension.Platform;

namespace GamePortal.Value
{
    internal class AppValue
    {
        public static PlatformEnum Platform = EP.Type;

        public static BuildEnum Build = HelperBuild.GetBuild;
    }
}