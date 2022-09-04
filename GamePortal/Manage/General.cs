using Taiizor.Essentials.Maui.Enum;
using Taiizor.Essentials.Maui.Extension;

namespace GamePortal.Manage
{
    internal class General
    {
        public static bool First = true;

        public const int WindowWidth = 1460;

        public const int WindowHeight = 670;

        public static string Title = Project.Name;

        public static Dictionary<AppEnum, string> Keys = new()
        {
            { AppEnum.iOS, "0b201b30-eafa-4f3d-ae59-2ccc7d7cc92b" },
            { AppEnum.macOS, "b0773be2-479b-4202-8823-963fd4c5db4b" },
            { AppEnum.Android, "76c4609d-8ed0-4aad-a590-486b9cf7182f" },
            { AppEnum.Windows, "65c81568-44ec-46b4-9518-c431dd451f89" }
        };
    }
}