using Taiizor.Essentials.Maui.AppCenter.Enum;
using Taiizor.Essentials.Maui.AppCenter.Struct;
using Taiizor.Essentials.Maui.Extension;

namespace GamePortal.Manage
{
    internal class General
    {
        public static bool First = true;

        public static Random Random = new();

        public const int WindowWidth = 1460;

        public const int WindowHeight = 670;

        public static string Title = Project.Name;

        public static WatchStruct Watch = new()
        {
            Format = "{1}{2}-{3}",
            Event = WatchEnum.Open,
            Error = WatchEnum.Close,
            Prefix = "Prefix",
            Suffix = "Suffix",
            EventName = "Event",
            ErrorName = "Error",
            Name = "Watch"
        };

        public static Dictionary<AppEnum, string> Keys = new()
        {

#if DEBUG
            { AppEnum.iOS, "a5426920-4aa0-4975-9dd7-b392cd74c155" },
            { AppEnum.macOS, "20f56902-b6a6-4929-80c8-cdd7610b836f" },
            { AppEnum.Android, "31f534fe-751e-4a93-87b8-c3a5bd138f32" },
            { AppEnum.Windows, "10eb5ced-47bb-497c-b626-e34765c06641" }
#else
            { AppEnum.iOS, "ffc05807-63e2-4b61-bd43-778ad0e9754f" },
            { AppEnum.macOS, "debb9383-5378-46f1-870b-f5607f0a0bc5" },
            { AppEnum.Android, "0293e0cc-117d-43de-839e-8728cbaef553" },
            { AppEnum.Windows, "94e00ae3-353a-48dc-af80-f4e81be9f817" }
#endif

        };

    }
}