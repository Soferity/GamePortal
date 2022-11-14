using Taiizor.Essentials.Maui.AppCenter.Enum;
using Taiizor.Essentials.Maui.AppCenter.Struct;
using Taiizor.Essentials.Maui.Enum;
using Taiizor.Essentials.Maui.Extension;
using Taiizor.Essentials.Maui.Struct;
using ACEAE = Taiizor.Essentials.Maui.AppCenter.Enum.AppEnum;
using EAE = Taiizor.Essentials.Maui.Enum.AppEnum;

namespace GamePortal.Manage
{
    internal class General
    {
        public static bool First = true;

        public static string Path = "/";

        public static Random Random = new();

        public const int WindowX = 230;

        public const int WindowY = 205;

        public const int WindowWidth = 1460;

        public const int WindowHeight = 670;

        public static string Title = Project.Name;

        public static WatchStruct Watch = new()
        {
            Format = "{1}{2}-{3}",
            Attachments = "Attachments",
            Properties = "Properties",
            PropertiesError = "Error",
            PropertiesEvent = "Name",
            Event = WatchEnum.Open,
            Error = WatchEnum.Close,
            Prefix = "Prefix",
            Suffix = "Suffix",
            EventName = "Event",
            ErrorName = "Error",
            Name = "Watch"
        };

        private static readonly PropertyStruct Property = new()
        {
            Resizable = true,
            Minimizable = true,
            Maximizable = true,
            AlwaysOnTop = false,

#if DEBUG
            MoveAndResize = new()
            {
                X = WindowX,
                Y = WindowY,
                Width = WindowWidth,
                Height = WindowHeight
            }
#endif

        };

        public static Dictionary<ACEAE, string> Keys = new()
        {
        
#if DEBUG
            { ACEAE.iOS, "a5426920-4aa0-4975-9dd7-b392cd74c155" },
            { ACEAE.macOS, "20f56902-b6a6-4929-80c8-cdd7610b836f" },
            { ACEAE.Android, "31f534fe-751e-4a93-87b8-c3a5bd138f32" },
            { ACEAE.Windows, "6fbf1f84-1894-4e38-a5e5-a9300de34ba4" }
#else
            { ACEAE.iOS, "ffc05807-63e2-4b61-bd43-778ad0e9754f" },
            { ACEAE.macOS, "debb9383-5378-46f1-870b-f5607f0a0bc5" },
            { ACEAE.Android, "0293e0cc-117d-43de-839e-8728cbaef553" },
            { ACEAE.Windows, "94e00ae3-353a-48dc-af80-f4e81be9f817" }
#endif

        };

        public static Dictionary<EAE, bool> Fullscreen = new()
        {
        
#if DEBUG
            { EAE.iOS, true },
            { EAE.macOS, true },
            { EAE.Android, true },
            { EAE.Windows, false }
#else
            { EAE.iOS, true },
            { EAE.macOS, true },
            { EAE.Android, true },
            { EAE.Windows, true }
#endif

        };

        public static Dictionary<EAE, PropertyStruct> Properties = new()
        {
            { EAE.iOS, Property },
            { EAE.macOS, Property },
            { EAE.Android, Property },
            { EAE.Windows, Property }
        };

        public static Dictionary<JavascriptEnum, bool> Javascript = new()
        {
            { JavascriptEnum.Custom, true },
            { JavascriptEnum.Taiizor, true },
            { JavascriptEnum.AppCenter, true },
            { JavascriptEnum.Conforyon, false }
        };
    }
}