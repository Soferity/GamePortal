using Taiizor.Essentials.Blazor.Enum;
using Taiizor.Essentials.Maui.AppCenter.Enum;
using Taiizor.Essentials.Maui.AppCenter.Struct;
using Taiizor.Essentials.Maui.Extension;
using Taiizor.Essentials.Maui.Struct;
using Taiizor.Essentials.Maui.AppCenter.Helper;
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
        
#if DEBUG
            { ACEAE.iOS, Key.GetVariable(ACEAE.iOS, "GAMEPORTAL_DEBUG_{0}_TARGET_TOKEN") },
            { ACEAE.macOS, Key.GetVariable(ACEAE.macOS, "GAMEPORTAL_DEBUG_{0}_TARGET_TOKEN") },
            { ACEAE.Android, Key.GetVariable(ACEAE.Android, "GAMEPORTAL_DEBUG_{0}_TARGET_TOKEN") },
            { ACEAE.Windows, Key.GetVariable(ACEAE.Windows, "GAMEPORTAL_DEBUG_{0}_TARGET_TOKEN") }
#else
            { ACEAE.iOS, Key.GetVariable(ACEAE.iOS, "GAMEPORTAL_RELEASE_{0}_TARGET_TOKEN") },
            { ACEAE.macOS, Key.GetVariable(ACEAE.macOS, "GAMEPORTAL_RELEASE_{0}_TARGET_TOKEN") },
            { ACEAE.Android, Key.GetVariable(ACEAE.Android, "GAMEPORTAL_RELEASE_{0}_TARGET_TOKEN") },
            { ACEAE.Windows, Key.GetVariable(ACEAE.Windows, "GAMEPORTAL_RELEASE_{0}_TARGET_TOKEN") }
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