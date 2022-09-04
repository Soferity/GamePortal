using System.Collections.Generic;
using Taiizor.Essentials.Maui.Enum;
using Taiizor.Essentials.Maui.Extension;

namespace GamePortal.Winforms.Manage
{
    internal class General
    {
        public static bool First = true;

        public static string Title = Project.Name;

        public static Dictionary<AppEnum, string> Keys = new()
        {
            { AppEnum.Windows, "5ea3b714-973d-424c-bd76-b2ad3b4bd355" }
        };
    }
}