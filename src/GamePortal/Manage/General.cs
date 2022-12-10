using GamePortal.Helper;
using System.Reflection;
using Taiizor.Essentials.Blazor.Enum;
using Taiizor.Essentials.Maui.AppCenter.Enum;
using Taiizor.Essentials.Maui.AppCenter.Struct;
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

        public const int WindowX = 230;

        public const int WindowY = 205;

        public const int WindowWidth = 1460;

        public const int WindowHeight = 670;

        public static Random Random = new();

        public static string Title = Project.Name;

        public static readonly string Config = "AppCenter.json";

        public static Assembly Assembly = Assembly.GetExecutingAssembly();

        public static WatchStruct Watch = new()
        {
            Format = "{1}{2}-{3}", //"{0}-{1}{2}-{3}-{4}"
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
            Name = "Trace" //Watch
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
            { ACEAE.iOS, HelperKey.GetKey(ACEAE.iOS) },
            { ACEAE.macOS, HelperKey.GetKey(ACEAE.macOS) },
            { ACEAE.Android, HelperKey.GetKey(ACEAE.Android) },
            { ACEAE.Windows, HelperKey.GetKey(ACEAE.Windows) }
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