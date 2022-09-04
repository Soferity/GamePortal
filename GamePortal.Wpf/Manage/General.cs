using System.Collections.Generic;
using Taiizor.Essentials.Maui.Enum;
using Taiizor.Essentials.Maui.Extension;

namespace GamePortal.Wpf.Manage
{
    internal class General
    {
        public static bool First = true;

        public static string Title = Project.Name;

        public static Dictionary<AppEnum, string> Keys = new()
        {
            { AppEnum.Windows, "34cd1c21-6be8-4c86-b86c-2c36ed9a5fe6" }
        };
    }
}