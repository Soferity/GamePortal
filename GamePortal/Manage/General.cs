using Taiizor.Essentials.Maui.Enum;
using Taiizor.Essentials.Maui.Extension;

namespace GamePortal.Manage
{
    internal class General
    {
        public static bool First = true;

        public const int WindowWidth = 800;

        public const int WindowHeight = 600;

        public static string Title = Project.Name;

        public static Dictionary<AppEnum, string> Keys = new()
        {
            { AppEnum.iOS, "924e3dce-0595-4988-8a78-eb0e37c80a20" },
            { AppEnum.macOS, "3e6d36d5-3308-4ac0-aae2-e5d0d10cf7ac" },
            { AppEnum.Android, "0ac8b703-e673-4b3b-b30b-6cd6a06b948a" },
            { AppEnum.Windows, "5d1e2152-42b7-491c-9181-96d3e04cac0b" }
        };
    }
}