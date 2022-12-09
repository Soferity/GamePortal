using GamePortal.Manage;

namespace GamePortal.Helper
{
    internal class HelperPath
    {
        public static string Path
        {
            get => General.Path;
            set => General.Path = value;
        }
    }
}